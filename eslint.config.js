import { dirname } from "path";
import { fileURLToPath } from "url";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";

export default tseslint.config(
	{ ignores: ["dist/**/*"] },
	eslint.configs.recommended,
	tseslint.configs.strict,
	tseslint.configs.strictTypeChecked,
	eslintConfigPrettier,
	{
		languageOptions: {
			globals: globals.node,
			parserOptions: {
				projectService: true,
				tsconfigRootDir: dirname(fileURLToPath(import.meta.url))
			}
		},
		rules: {
			"no-undef": "error",
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": "warn",
			"@typescript-eslint/no-unnecessary-condition": "warn"
		}
	}
);
