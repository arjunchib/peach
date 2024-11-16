import { OpenApiGenerator } from "./openapi_generator";
import openApiDocRaw from "./discord_openapi.json";
import { writeFileSync } from "fs";
import type { OpenAPIV3_1 as openapi } from "openapi-types";
import { format } from "prettier";

const openApiDoc = openApiDocRaw as unknown as openapi.Document;
const openApiGenerator = new OpenApiGenerator(openApiDoc);

writeFileSync(
  "lib/schema.ts",
  await format(
    "import * as h from './schema_helpers'" +
      "\n\n" +
      openApiGenerator.generateService() +
      `\n\n` +
      openApiGenerator.generateSchema(),
    { parser: "typescript" }
  )
);
