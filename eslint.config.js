import js from "@eslint/js";
import globals from "globals";

export default [
  // 1.- Ignorar builds y dependencias
  {
    ignores: ["node_modules/**", "dist/**"]
  },

  // 2.- Backend: server/**
  {
    files: ["server/**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node, // Solo los globales de Node para el back
      }
    },
    rules: {
      ...js.configs.recommended.rules,
    }
  },

  // 3.- Frontend: src/**
  {
    files: ["src/**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser, // Solo los globales del navegador para el front
      }
    },
    rules: {
      ...js.configs.recommended.rules,
    }
  },
];