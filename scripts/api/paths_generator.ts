import ts, { type TypeElement, type TypeNode } from "typescript";
import type { OpenAPIV3_1 as openapi } from "openapi-types";
import { createReference, questionToken } from "./utils/ts_factory_helpers";
import { inject } from "./utils/inject";
import { SchemaGenerator } from "./schema_generator";

export class PathGenerator {
  private schemaGenerator = inject(SchemaGenerator);

  generate(path: string, pathItem: openapi.PathItemObject) {
    const pathItemParams =
      pathItem.parameters?.map((param) => this.genParameter(param)) || [];
    return [
      pathItem.delete,
      pathItem.get,
      pathItem.head,
      pathItem.options,
      pathItem.patch,
      pathItem.post,
      pathItem.put,
    ]
      .map((operation) => {
        if (!operation || !operation.operationId) return;
        operation.requestBody;
        const parameters = [
          ...(pathItem.parameters || []),
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
        const body = this.genBody(path, pathItem, operation, parameters);
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
      })
      .filter((obj) => !!obj);
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
    path: string,
    pathItem: openapi.PathItemObject,
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
    const url = ts.factory.createCallExpression(
      ts.factory.createIdentifier("h.createUrl"),
      undefined,
      [this.genUrl(path), queryParams]
    );
    return ts.factory.createExpressionStatement(
      ts.factory.createAwaitExpression(
        ts.factory.createCallExpression(
          ts.factory.createIdentifier("fetch"),
          undefined,
          [url]
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
