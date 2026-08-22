import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const customRulesPlugin = {
  meta: {
    name: "custom-naming-rules",
    version: "1.0.0",
  },
  rules: {
    "hook-filename": {
      meta: {
        type: "problem",
        docs: {
          description: "Enforce hook files start with 'use' followed by PascalCase naming",
        },
        messages: {
          invalidHookName:
            "Hook filename '{{filename}}' must start with 'use' and follow PascalCase naming (e.g., 'useProximityHover.js').",
        },
        schema: [],
      },
      create(context) {
        return {
          Program(node) {
            const rawFilename =
              context.filename ??
              (typeof context.getFilename === "function" ? context.getFilename() : "");
            if (!rawFilename) return;

            const normalized = rawFilename.replace(/\\/g, "/");
            if (!normalized.includes("/src/hooks/")) return;

            const basename = normalized.split("/").pop();
            if (!basename) return;

            const stem = basename.replace(/(\.(test|spec|stories|d))?\.[a-zA-Z0-9]+$/, "");
            const hookNameRegex = /^use[A-Z][a-zA-Z0-9]*$/;

            if (!hookNameRegex.test(stem)) {
              context.report({
                node,
                messageId: "invalidHookName",
                data: {
                  filename: basename,
                },
              });
            }
          },
        };
      },
    },
    "component-filename": {
      meta: {
        type: "problem",
        docs: {
          description:
            "Enforce component files follow kebab-case, CamelCase/PascalCase, or lowercase naming",
        },
        messages: {
          invalidComponentName:
            "Component filename '{{filename}}' must be in kebab-case, CamelCase/PascalCase, or lowercase (e.g., 'button.jsx', 'menu-item.jsx', 'NavbarNextjs.jsx').",
        },
        schema: [],
      },
      create(context) {
        return {
          Program(node) {
            const rawFilename =
              context.filename ??
              (typeof context.getFilename === "function" ? context.getFilename() : "");
            if (!rawFilename) return;

            const normalized = rawFilename.replace(/\\/g, "/");
            if (!normalized.includes("/components/")) return;

            const basename = normalized.split("/").pop();
            if (!basename) return;

            const stem = basename.replace(/(\.(test|spec|stories|d))?\.[a-zA-Z0-9]+$/, "");
            const kebabCaseRegex = /^[a-z0-9]+(-[a-z0-9]+)*$/;
            const camelOrPascalCaseRegex = /^[A-Za-z][a-zA-Z0-9]*$/;

            const isValid = kebabCaseRegex.test(stem) || camelOrPascalCaseRegex.test(stem);

            if (!isValid) {
              context.report({
                node,
                messageId: "invalidComponentName",
                data: {
                  filename: basename,
                },
              });
            }
          },
        };
      },
    },
  },
};

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    plugins: {
      custom: customRulesPlugin,
    },
    rules: {
      // 1. console.log / console calls show warning
      "no-console": "warn",
      // 2. Files inside src/hooks must start with use and have PascalCase naming
      "custom/hook-filename": "error",
      // 3. Component filenames can only be in kebab-case, CamelCase/PascalCase, or lowercase
      "custom/component-filename": "error",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;

