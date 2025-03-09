import ts, { type TypeElement, type TypeNode } from "typescript";
import type { OpenAPIV3_1 as openapi } from "openapi-types";

const REF_PREFIX = "#/components/schemas/".length;

export class SchemaGenerator {
  private name!: string;
  private schemas!: Record<string, openapi.SchemaObject>;

  generate(
    name: string,
    obj: openapi.SchemaObject,
    schemas: Record<string, openapi.SchemaObject>
  ) {
    // if (name !== "ApplicationCommandUpdateRequest")
    //   return ts.factory.createTypeReferenceNode("any");
    if (name === "Int53Type") return null;
    // console.log(name, obj);
    this.name = name;
    this.schemas = schemas;
    if (
      obj.oneOf &&
      obj.oneOf.every(
        (obj: openapi.SchemaObject) => obj.const != null && obj.title != null
      )
    ) {
      return this.genEnum(obj);
    } else if (obj.type === "object") {
      return this.genInterface(obj);
    } else {
      return this.genType(obj);
    }
  }

  genObject(
    obj: openapi.SchemaObject | openapi.ReferenceObject,
    required = true
  ): TypeNode {
    return "$ref" in obj
      ? this.genReferenceObject(obj)
      : this.genSchemaObject(obj, required);
  }

  private genReferenceObject(obj: openapi.ReferenceObject): TypeNode {
    if (obj.$ref === "#/components/schemas/Int53Type") {
      return ts.factory.createTypeReferenceNode("number");
    } else {
      return ts.factory.createTypeReferenceNode(obj.$ref.slice(REF_PREFIX));
    }
  }

  private genSchemaObject(
    obj: openapi.SchemaObject,
    required = true
  ): TypeNode {
    if (Array.isArray(obj.type)) {
      return ts.factory.createUnionTypeNode(
        obj.type
          .map((t) => {
            if (!required && t === "null") {
              return null;
            } else {
              return this.genSchemaObjectByType(obj, t);
            }
          })
          .filter((t) => t != null)
      );
    } else if (obj.type) {
      return this.genSchemaObjectByType(obj, obj.type);
    } else {
      if (obj.oneOf) {
        return this.genUnion(obj.oneOf, required);
      } else if (obj.allOf) {
        return this.genUnion(obj.allOf, required);
      } else if (obj.anyOf) {
        return this.genUnion(obj.anyOf, required);
      } else {
        return ts.factory.createTypeReferenceNode("any");
      }
    }
  }

  private genSchemaObjectByType(
    obj: openapi.SchemaObject,
    type: "array" | openapi.NonArraySchemaObjectType
  ): TypeNode {
    if (type === "array") {
      return ts.factory.createArrayTypeNode(
        this.genObject((obj as openapi.ArraySchemaObject).items)
      );
    } else {
      return this.genNonArraySchemaObjectByType(
        obj as openapi.NonArraySchemaObject,
        type
      );
    }
  }

  private genNonArraySchemaObjectByType(
    obj: openapi.NonArraySchemaObject,
    type: openapi.NonArraySchemaObjectType
  ): TypeNode {
    if (obj.enum && obj.allOf?.length === 1 && "$ref" in obj.allOf?.[0]) {
      const refName = obj.allOf?.[0].$ref.slice(REF_PREFIX);
      const ref = this.schemas[refName];
      return ts.factory.createUnionTypeNode(
        obj.enum
          .map((e) => {
            const mem = ref.oneOf?.find((prop) => (prop as any).const === e);
            if (mem) {
              return ts.factory.createTypeReferenceNode(
                `${refName}.${(mem as any).title}`
              );
            }
          })
          .filter((mem) => !!mem)
      );
    }
    if (type === "object") {
      return ts.factory.createTypeLiteralNode(this.genMembers(obj));
    } else if (type === "integer" || type === "number") {
      return ts.factory.createTypeReferenceNode("number");
    } else if (type === "string") {
      return ts.factory.createTypeReferenceNode("string");
    } else if (type === "boolean") {
      return ts.factory.createTypeReferenceNode("boolean");
    } else if (type === "null") {
      return ts.factory.createTypeReferenceNode("null");
    } else {
      throw new Error("Cannot generate schema");
    }
  }

  private genUnion(
    objs: (openapi.SchemaObject | openapi.ReferenceObject)[],
    required = true
  ) {
    return ts.factory.createUnionTypeNode(
      objs
        .map((obj) => {
          if (!required && !("$ref" in obj) && obj.type === "null") {
            return null;
          } else {
            return this.genObject(obj);
          }
        })
        .filter((t) => t != null)
    );
  }

  private genLiteral(value: any): ts.LiteralExpression {
    if (typeof value === "number") {
      return ts.factory.createNumericLiteral(value);
    } else if (typeof value === "string") {
      return ts.factory.createStringLiteral(value);
    } else {
      throw new Error("Cannot generate schema");
    }
  }

  private genEnum(obj: openapi.SchemaObject) {
    const members = obj.oneOf!.map((mem: openapi.SchemaObject) => {
      if (!mem.title) throw new Error("Missing properties");
      const node = ts.factory.createEnumMember(
        mem.title.replaceAll("-", ""),
        this.genLiteral(mem.const)
      );
      if (mem.description) {
        ts.addSyntheticLeadingComment(
          node,
          ts.SyntaxKind.MultiLineCommentTrivia,
          `* ${mem.description} `,
          true
        );
      }
      return node;
    });
    return ts.factory.createEnumDeclaration(
      ts.factory.createModifiersFromModifierFlags(ts.ModifierFlags.Export),
      this.name,
      members
    );
  }

  private genInterface(obj: openapi.SchemaObject) {
    return ts.factory.createInterfaceDeclaration(
      ts.factory.createModifiersFromModifierFlags(ts.ModifierFlags.Export),
      this.name,
      undefined,
      undefined,
      this.genMembers(obj)
    );
  }

  private genType(obj: openapi.SchemaObject) {
    return ts.factory.createTypeAliasDeclaration(
      undefined,
      this.name,
      undefined,
      this.genObject(obj)
    );
  }

  private genMembers(obj: openapi.SchemaObject) {
    const members: TypeElement[] = [];
    const required = new Set(obj.required || []);
    if (obj.properties) {
      members.push(
        ...Object.entries(obj.properties).map(([name, mem]) => {
          const questionToken = !required.has(name)
            ? ts.factory.createToken(ts.SyntaxKind.QuestionToken)
            : undefined;
          return ts.factory.createPropertySignature(
            undefined,
            name,
            questionToken,
            this.genObject(mem, required.has(name))
          );
        })
      );
    }
    if (obj.additionalProperties) {
      const type =
        obj.additionalProperties === true
          ? ts.factory.createTypeReferenceNode("any")
          : this.genObject(obj.additionalProperties);
      members.push(
        ts.factory.createIndexSignature(
          undefined,
          [
            ts.factory.createParameterDeclaration(
              undefined,
              undefined,
              "index",
              undefined,
              ts.factory.createTypeReferenceNode("string")
            ),
          ],
          type
        )
      );
    }
    return members;
  }
}
