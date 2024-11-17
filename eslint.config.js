import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	...tseslint.configs.strict,
	...tseslint.configs.stylistic,
	{
		languageOptions: {
			parserOptions: {
				ecmaVersion: "latest",
			},
		},
		ignores: [
			"./Logs",
			"./node_modules",
			".git",
			".vscode",
			".env",
			".eslintignore",
			".gitignore",
			".prettierignore",
			".prettierrc",
			"bun.lockb",
			"eslint.config.js",
			"package.json",
			"tsconfig.json",
		],
		rules: {
			"@typescript-eslint/no-extraneous-class": "off",
			"@typescript-eslint/consistent-type-definitions": ["error", "type"],
			"@typescript-eslint/naming-convention": [
				"error",
				{
					selector: "default",
					format: ["camelCase", "PascalCase"],
					leadingUnderscore: "forbid",
					trailingUnderscore: "forbid",
				},
				{
					selector: ["class"],
					format: ["PascalCase"],
					leadingUnderscore: "forbid",
					trailingUnderscore: "forbid",
				},
				{
					selector: [
						"classicAccessor",
						"autoAccessor",
						"classMethod",
						"classProperty",
						"function",
						"objectLiteralMethod",
						"objectLiteralProperty",
						"parameter",
						"parameterProperty",
						"variable",
					],
					format: ["camelCase", "PascalCase"],
					leadingUnderscore: "forbid",
					trailingUnderscore: "forbid",
				},
				{
					selector: [
						"classicAccessor",
						"autoAccessor",
						"classMethod",
						"classProperty",
					],
					modifiers: ["private"],
					format: ["PascalCase", "camelCase"],
					leadingUnderscore: "requireDouble",
					trailingUnderscore: "forbid",
				},
				{
					selector: ["enum"],
					format: ["PascalCase"],
					suffix: ["Enum"],
					leadingUnderscore: "forbid",
					trailingUnderscore: "forbid",
				},
				{
					selector: ["enumMember"],
					format: ["UPPER_CASE"],
					leadingUnderscore: "forbid",
					trailingUnderscore: "forbid",
				},
				{
					selector: ["interface"],
					format: ["PascalCase"],
					prefix: ["I"],
					leadingUnderscore: "forbid",
					trailingUnderscore: "forbid",
				},
				{
					selector: ["typeAlias"],
					format: ["PascalCase"],
					prefix: ["T"],
					leadingUnderscore: "forbid",
					trailingUnderscore: "forbid",
				},
			],
		},
	},
);
