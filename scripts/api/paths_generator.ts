import ts, { type TypeElement, type TypeNode } from "typescript";
import type { OpenAPIV3_1 as openapi } from "openapi-types";
import { createReference, questionToken } from "./utils/ts_factory_helpers";
import { inject } from "./utils/inject";
import { SchemaGenerator } from "./schema_generator";

export class PathGenerator {
  private schemaGenerator = inject(SchemaGenerator);

  private path!: string;
  private pathItem!: openapi.PathItemObject;

  generate(
    path: string,
    pathItem: openapi.PathItemObject
  ): ts.MethodDeclaration[] {
    this.path = path;
    this.pathItem = pathItem;
    const methods = [];
    if (pathItem.delete) {
      methods.push(this.genOperation("delete", pathItem.delete));
    }
    if (pathItem.get) {
      methods.push(this.genOperation("get", pathItem.get));
    }
    if (pathItem.head) {
      methods.push(this.genOperation("head", pathItem.head));
    }
    if (pathItem.options) {
      methods.push(this.genOperation("options", pathItem.options));
    }
    if (pathItem.patch) {
      methods.push(this.genOperation("patch", pathItem.patch));
    }
    if (pathItem.post) {
      methods.push(this.genOperation("post", pathItem.post));
    }
    if (pathItem.put) {
      methods.push(this.genOperation("put", pathItem.put));
    }
    return methods.filter((obj) => !!obj);
  }

  private genOperation(method: string, operation: openapi.OperationObject) {
    if (!operation || !operation.operationId) return;
    operation.requestBody;
    const parameters = [
      ...(this.pathItem.parameters || []),
      ...(operation.parameters || []),
    ];
    const paramDeclaration = ts.factory.createParameterDeclaration(
      undefined,
      undefined,
      "params",
      undefined,
      ts.factory.createTypeLiteralNode(
        [
          ...parameters?.map((p) => this.genParameter(p)),
          operation.requestBody
            ? this.genParameter(operation.requestBody)
            : undefined,
        ].filter((p) => !!p)
      )
    );
    const body = this.genBody(method, operation, parameters);
    return ts.factory.createMethodDeclaration(
      ts.factory.createModifiersFromModifierFlags(ts.ModifierFlags.Async),
      undefined,
      operation.operationId,
      undefined,
      undefined,
      parameters.length > 0 ? [paramDeclaration] : [],
      createReference("Promise<any>"),
      ts.factory.createBlock([body])
    );
  }

  private genUrl(url: string) {
    const parts = url.split(/{|}/);
    if (parts.length === 1) {
      return ts.factory.createStringLiteral(url);
    }
    const head = ts.factory.createTemplateHead(parts[0]);
    const spans: ts.TemplateSpan[] = [];
    for (let i = 1; i < parts.length - 2; i += 2) {
      spans.push(
        ts.factory.createTemplateSpan(
          ts.factory.createIdentifier("params." + parts[i]),
          ts.factory.createTemplateMiddle(parts[i + 1])
        )
      );
    }
    const hasTail = parts.length % 2 === 1;
    spans.push(
      ts.factory.createTemplateSpan(
        ts.factory.createIdentifier(
          "params." + (hasTail ? parts.at(-2)! : parts.at(-1)!)
        ),
        ts.factory.createTemplateTail(hasTail ? parts.at(-1)! : "")
      )
    );
    return ts.factory.createTemplateExpression(head, spans);
  }

  private genBody(
    method: string,
    operation: openapi.OperationObject,
    params: (openapi.ParameterObject | openapi.ReferenceObject)[]
  ) {
    const queryParams = ts.factory.createObjectLiteralExpression(
      params
        .map((p) => {
          if (!("$ref" in p) && p.in === "query") {
            return ts.factory.createPropertyAssignment(
              p.name,
              ts.factory.createIdentifier(`params.${p.name}`)
            );
          }
        })
        .filter((p) => !!p)
    );
    return ts.factory.createExpressionStatement(
      ts.factory.createAwaitExpression(
        ts.factory.createCallExpression(
          ts.factory.createIdentifier("h.fetchDiscord"),
          undefined,
          [
            ts.factory.createStringLiteral(method),
            this.genUrl(this.path),
            queryParams,
            ts.factory.createStringLiteral(operation.requestBody),
          ]
        )
      )
    );
  }

  private genParameter(
    parameter:
      | openapi.ParameterObject
      | openapi.RequestBodyObject
      | openapi.ReferenceObject
  ) {
    if ("$ref" in parameter) {
      return ts.factory.createPropertySignature(
        undefined,
        "reference",
        undefined,
        createReference("any")
      );
    } else if ("content" in parameter) {
      const typeNode = parameter.content?.["application/json"]?.schema
        ? this.schemaGenerator.genObject(
            parameter.content["application/json"].schema
          )
        : createReference("any");
      return ts.factory.createPropertySignature(
        undefined,
        "body",
        questionToken(parameter.required),
        typeNode
      );
    } else {
      const typeNode = parameter.schema
        ? this.schemaGenerator.genObject(parameter.schema)
        : createReference("any");
      return ts.factory.createPropertySignature(
        undefined,
        parameter.name,
        questionToken(parameter.required),
        typeNode
      );
    }
  }
}
