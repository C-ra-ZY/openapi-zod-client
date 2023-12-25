import type { OpenAPIObject } from "openapi3-ts/dist/oas30";
import { generateZodClientFromOpenAPI } from "./lib/src/index";

import SwaggerParser from "@apidevtools/swagger-parser";

(async () => {
    const input = "./test-spec.yaml";
    console.log("Retrieving OpenAPI document from", input);
    const openApiDoc = (await SwaggerParser.bundle(input)) as OpenAPIObject;
    /*     const prettierConfig = await resolveConfig(options.prettier || "./");
    const distPath = options.output || input + ".client.ts";
    const withAlias = toBoolean(options.withAlias, true);
    const additionalPropertiesDefaultValue = toBoolean(options.additionalPropsDefaultValue, true);
 */

    /* node ./lib/cli/dist/openapi-zod-client-cli.cjs.js ./self-study-v2-alpha.yaml -o ./test.client.ts --export-types --implicit-required --export-schemas
    Retrieving OpenAPI document from ./self-study-v2-alpha.yaml */
    await generateZodClientFromOpenAPI({
        openApiDoc,
        distPath: "./test.client.ts",
        options: {
            withDefaultValues: false,
            shouldExportAllSchemas: true,
            shouldExportAllTypes: true,
            withImplicitRequiredProps: true,
        },
    });
    console.log(`Dondde generating <${"./test.client.ts"}> !`);
})();
