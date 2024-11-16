import type { OpenAPIV3_1 } from "openapi-types";
import ts from "typescript";
import { inject } from "./utils/inject";
import { SchemaGenerator } from "./schema_generator";
import { PathGenerator } from "./paths_generator";

export class OpenApiGenerator {
  private resultFile = ts.createSourceFile(
    "someFileName.ts",
    "",
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TS
  );
  private printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  private schemaGenerator = inject(SchemaGenerator);
  private pathGenerator = inject(PathGenerator);

  constructor(private doc: OpenAPIV3_1.Document) {}

  generateSchema(): string {
    const nodes = [];
    for (const name in this.doc.components?.schemas) {
      const obj = this.doc.components?.schemas[name];
      const node = this.schemaGenerator.generate(
        name,
        obj,
        this.doc.components?.schemas
      );
      if (node) {
        nodes.push(
          this.printer.printNode(ts.EmitHint.Unspecified, node, this.resultFile)
        );
      }
    }
    return nodes.join("\n\n");
  }

  generateService(): string {
    const members = Object.entries(this.doc.paths!).flatMap(([path, obj]) => {
      return this.pathGenerator.generate(path, obj!);
    });

    const classNode = ts.factory.createClassDeclaration(
      ts.factory.createModifiersFromModifierFlags(ts.ModifierFlags.Export),
      "DiscordRestService",
      undefined,
      undefined,
      members
    );

    return this.printer.printNode(
      ts.EmitHint.Unspecified,
      classNode,
      this.resultFile
    );
  }
}
