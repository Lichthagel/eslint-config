import { FlatConfigItemStrict } from "../types";

type SvelteOptions = {
  disableStylistic?: boolean;
  withTypescript?: boolean;
};

const SVELTE_FILES = ["**/*.svelte"];

const svelte = async (options: SvelteOptions = {}): Promise<FlatConfigItemStrict[]> => {
  const {
    disableStylistic = false,
    withTypescript = false,
  } = options;

  const pluginSvelte = await import("eslint-plugin-svelte").then((mod) => mod.default);

  const configs: FlatConfigItemStrict[] = [
    ...(pluginSvelte.configs["flat/recommended"] as FlatConfigItemStrict[]).map((configItem) => ({
      name: "svelte/recommended",
      ...configItem,
    })),
    {
      name: "lichthagel/svelte",
      files: SVELTE_FILES,
      languageOptions: {
        parserOptions: {
          extraFileExtensions: [".svelte"],
          parser: withTypescript ? "@typescript-eslint/parser" : null,
          project: true,
        },
      },
      rules: {
        "svelte/block-lang": [
          "error",
          {
            enforceScriptPresent: false,
            enforceStylePresent: false,
            script: [withTypescript ? "ts" : null],
          },
        ],
        "svelte/first-attribute-linebreak": [
          "error",
          {
            multiline: "below",
            singleline: "beside",
          },
        ],
        "svelte/html-closing-bracket-spacing": [
          "error",
          {
            endTag: "never",
            selfClosingTag: "always",
            startTag: "never",
          },
        ],
        "svelte/html-quotes": [
          "error",
          {
            prefer: "double",
          },
        ],
        "svelte/indent": [
          "error",
          {
            alignAttributesVertically: true,
            indent: 2,
          },
        ],
        "svelte/infinite-reactive-loop": "error",
        "svelte/max-attributes-per-line": [
          "error",
          {
            multiline: 1,
            singleline: 3,
          },
        ],
        "svelte/mustache-spacing": "error",
        "svelte/no-dupe-on-directives": "error",
        "svelte/no-dupe-use-directives": "error",
        "svelte/no-export-load-in-svelte-module-in-kit-pages": "error",
        "svelte/no-goto-without-base": "error",
        "svelte/no-ignored-unsubscribe": "error",
        "svelte/no-immutable-reactive-statements": "error",
        "svelte/no-reactive-functions": "error",
        "svelte/no-reactive-literals": "error",
        "svelte/no-spaces-around-equal-signs-in-attribute": "error",
        "svelte/no-target-blank": "error",
        "svelte/no-trailing-spaces": "error",
        "svelte/no-useless-mustaches": "error",
        "svelte/require-store-callbacks-use-set-param": "error",
        "svelte/spaced-html-comment": ["error", "always"],
        "svelte/valid-each-key": "error",
        ...(
          disableStylistic
            ? {
                "@stylistic/indent": "off", // superseded by svelte/indent
                "@stylistic/indent-binary-ops": "off", // superseded by svelte/indent
                "@stylistic/no-trailing-spaces": "off", // superseded by svelte/no-trailing-spaces
              }
            : {}
        ),
      },
    },
  ];

  return configs;
};

export default svelte;
