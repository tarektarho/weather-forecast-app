import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import react from "eslint-plugin-react"
import prettier from "eslint-plugin-prettier"
import testingLibrary from "eslint-plugin-testing-library"

export default [
  {
    ignores: ["dist", "build", "node_modules", "coverage/**"],
  },
  // Configuration for source files
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@typescript-eslint": tseslint,
      prettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      "prettier/prettier": "error",
      "react/jsx-no-target-blank": "off",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  // Configuration for test files
  {
    files: [
      "src/**/*.test.{ts,tsx}",
      "src/**/__test__/**/*.{ts,tsx}",
      "src/**/__tests__/**/*.{ts,tsx}",
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
        vi: "readonly",
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        fetchMock: "readonly",
      },
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "@typescript-eslint": tseslint,
      "testing-library": testingLibrary,
      prettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      "prettier/prettier": "error",
      "react/jsx-no-target-blank": "off",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "no-undef": "off", // vitest globals are handled differently
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  // Configuration for config files (without TypeScript project checking)
  {
    files: ["*.config.{ts,js}", "*.config.*.{ts,js}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
      parser: tsParser,
      parserOptions: {
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      prettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      "prettier/prettier": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
]
