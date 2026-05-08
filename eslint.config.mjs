import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      js,
      prettier
    },
    extends: ['js/recommended'],
    languageOptions: {
      globals: globals.node // ✅ changed to Node (important for your assignment)
    },
    rules: {
      'prettier/prettier': 'error'
    }
  }
]);
