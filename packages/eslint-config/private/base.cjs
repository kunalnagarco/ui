const { FlatCompat } = require("@eslint/eslintrc");
const path = require("path");
const { fileURLToPath } = require("url");
const eslintConfigPrettier = require("eslint-config-prettier");
const eslintPluginImport = require("eslint-plugin-import");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  eslintPluginImport.flatConfigs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      "import/order": [
        "error",
        {
          pathGroupsExcludedImportTypes: ["builtin"],
          groups: [
            "builtin",
            ["external", "internal"],
            "parent",
            ["sibling", "index"],
          ],
          "newlines-between": "always",
        },
      ],
    },
  },
];
