module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier", // Prettier와 충돌하는 ESLint 규칙을 비활성화
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true, // JSX 파싱 허용
    },
  },
  plugins: [
    "react", // 리액트 규칙 사용
    "prettier",
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "no-unused-vars": "off",
    "react/jsx-no-target-blank": "off",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser", // TypeScript 파싱
      plugins: ["@typescript-eslint"], // TypeScript 규칙 사용
      extends: [
        "plugin:@typescript-eslint/recommended", // TypeScript 권장 규칙
      ],
      rules: {
        "no-unused-vars": "warn",
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/no-unused-vars": "off", // 변수가 할당되었지만 사용되지 않았다는 TypeScript 경고를 비활성화
        "@typescript-eslint/no-explicit-any": ["off"],
      },
    },
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
  settings: {
    react: {
      version: "detect", // React 버전 자동 감지
    },
  },
};
