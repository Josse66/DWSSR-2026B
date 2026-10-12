import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  //1) ignora los build del front
  {
    ignores:[
      "dist/**", //ignora la carpeta dist
      "node_modules/**" //ignora la carpeta node_modules
    ]
  },

  //2) Conding del Back-end

  { 
    files: ["server/**/*.{js,mjs}"],
    plugins: { js },
   extends: ["js/recommended"],
    languageOptions: { 
      globals: { 
        ecmaVersion: "latest",
        sourceType: "module",
        ...globals.node 
      } 
    } 
  },

  //2.1) Config de  vite

  { 
    files: ["vite.config.js"],
    plugins: { js },
   extends: ["js/recommended"],
    languageOptions: { 
      globals: { 
        ecmaVersion: "latest",
        sourceType: "module",
        ...globals.node 
      } 
    } 
  },
  
  //3) Coding del font-end
  { 
    files: ["src/**/*.{js,mjs}"],
    plugins: { js },
   extends: ["js/recommended"],
    languageOptions: { 
      globals: { 
        ecmaVersion: "latest",
        sourceType: "module",
        ...globals.browser,
      } 
    } 
  },

  //4) Si hay JS en public
  { 
    files: ["public/**/*.{js,mjs}"],
    plugins: { js },
   extends: ["js/recommended"],
    languageOptions: { 
      globals: { 
        ecmaVersion: "latest",
        sourceType: "module",
        ...globals.browser,
      } 
    } 
  },
]);
