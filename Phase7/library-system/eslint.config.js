const js = require("@eslint/js");
const tseslint = require("typescript-eslint");

module.exports = [
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      "no-console": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
];
