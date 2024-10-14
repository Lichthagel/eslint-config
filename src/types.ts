import type { Linter } from "eslint";

import type { RuleOptions } from "./typegen";

export type Rules = RuleOptions;

export type FlatConfigItem = Linter.Config<Linter.RulesRecord & Rules>;

export type FlatConfigItemStrict = {
  /**
   * An object containing the configured rules. When files or ignores are specified,
   * these rule configurations are only available to the matching files.
   */
  rules?: Partial<Rules>;
} & Omit<Linter.Config, "rules">;

export type OptionsConfig = {
  /**
   * Enable browser-specific rules.
   *
   * @default false
   */
  browser?: boolean;

  /**
   * Enable Node.js-specific rules.
   *
   * @default false
   */
  node?: boolean;

  /**
   * Enable solid-specific rules.
   *
   * @default false
   */
  solid?: boolean;

  /**
   * Enable stylistic rules.
   *
   * @default true
   */
  stylistic?: boolean;

  /**
   * Enable Svelte-specific rules.
   *
   * @default false
   */
  svelte?: boolean;

  /**
   * Enable TailwindCSS-specific rules.
   *
   * @default false
   */
  tailwindcss?: boolean;

  /**
   * Enable TypeScript-specific rules.
   *
   * @default true
   */
  typescript?: boolean;
};
