import type { Linter } from "eslint";

import type { RuleOptions } from "./typegen";

/**
 * A ESLint flat config item with rules defined as obtained from type generation. Allows for rules not defined by one of the used plugins.
 */
export type FlatConfigItem = Linter.Config<Linter.RulesRecord & Rules>;

/**
 * A stricter version of {@linkcode FlatConfigItem} that requires rules to be defined as obtained from type generation.
 */
export type FlatConfigItemStrict = Omit<Linter.Config, "rules"> & {
  /**
   * An object containing the configured rules. When files or ignores are specified,
   * these rule configurations are only available to the matching files.
   */
  rules?: Partial<Rules>;
};

/**
 * Configuration options for this config's factory function.
 */
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

export type Rules = RuleOptions;
