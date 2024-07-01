module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react"],
  rules: {
    "react/react-in-jsx-scope": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "import/no-unresolved": "error",
    "react/jsx-no-undef": "error",
    "react-hooks/rules-of-hooks": "error", // Hooks 규칙
    "react-hooks/exhaustive-deps": "warn", // Dependencies 규칙
  },
};
