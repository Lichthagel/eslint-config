declare module "eslint-plugin-unicorn";
declare module "eslint-plugin-import";
declare module "eslint-plugin-react";
declare module "eslint-plugin-react-hooks";
declare module "eslint-plugin-perfectionist" {
  export default import("eslint").ESLint.Plugin;
}
declare module "eslint-plugin-perfectionist/configs/recommended-natural" {
  export default import("eslint").Linter.FlatConfig;
}
