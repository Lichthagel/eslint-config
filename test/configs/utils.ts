import { ESLint, Linter } from "eslint";
import { assert, expect, test } from "vitest";

import lichthagel, { OptionsConfig } from "../../src";

export const processConfig = async (options: OptionsConfig, file: string) => {
  const cfg = await lichthagel(options);

  const eslint = new ESLint({
    baseConfig: {},
    overrideConfig: cfg,
    overrideConfigFile: true,
  });

  return eslint.calculateConfigForFile(file) as Linter.Config | undefined;
};

export const testHasGlobal = (res: Linter.Config, global: string, readonly = false) => {
  if (readonly) {
    test(`has readonly "${global}" global`, () => {
      const globals = res.languageOptions?.globals ?? {};
      expect(globals[global]).toBe("readonly");
    });
  } else {
    test(`has "${global}" global`, () => {
      const globals = res.languageOptions?.globals ?? {};
      expect(globals[global]).toBeDefined();
    });
  }
};

export const testNotHasGlobal = (res: Linter.Config, global: string) => {
  test(`does not have "${global}" global`, () => {
    const globals = res.languageOptions?.globals ?? {};
    expect(globals[global]).toBeUndefined();
  });
};

export const testEnablesPlugin = (res: Linter.Config, plugin: string) => {
  test(`enables plugin "${plugin}"`, () => {
    const plugins = res.plugins ?? {};
    expect(plugins[plugin]).toBeDefined();
  });
};

export const testNotEnablesPlugin = (res: Linter.Config, plugin: string) => {
  test(`does not enable plugin "${plugin}"`, () => {
    const plugins = res.plugins ?? {};
    expect(plugins[plugin]).toBeUndefined();
  });
};

export const testRule = (res: Linter.Config, rule: string, ruleOpt: unknown[] | undefined = [2]) => {
  test(`has rule "${rule}" that is set to ${JSON.stringify(ruleOpt)}`, () => {
    const rules = res.rules ?? {};
    expect(rules[rule]).toEqual(ruleOpt);
  });
};

export const testRuleEnabled = (res: Linter.Config, rule: string) => {
  test(`has rule "${rule}" that is enabled`, () => {
    const rules = res.rules ?? {};
    const r = rules[rule];
    assert(r);
    const severity = Array.isArray(r) ? r[0] : r;

    expect(severity).toSatisfy((s: Linter.RuleSeverity) => s !== 0 && s !== "off");
  });
};

export const testRuleDisabled = (res: Linter.Config, rule: string) => {
  test(`has rule "${rule}" that is disabled`, () => {
    const rules = res.rules ?? {};
    const r = rules[rule];
    assert(r);
    const severity = Array.isArray(r) ? r[0] : r;

    expect(severity).toSatisfy((s: Linter.RuleSeverity) => s === 0 || s === "off");
  });
};

export const testRuleUndefined = (res: Linter.Config, rule: string) => {
  test(`does not have rule "${rule}"`, () => {
    const rules = res.rules ?? {};
    expect(rules[rule]).toBeUndefined();
  });
};

export const testHandlesFile = (opts: OptionsConfig, file: string) => {
  test(`handles file "${file}"`, async () => {
    const res = await processConfig(opts, file);

    expect(res).toBeDefined();
  });
};

export const testNotHandlesFile = (opts: OptionsConfig, file: string) => {
  test(`does not handle file "${file}"`, async () => {
    const res = await processConfig(opts, file);

    expect(res).toBeUndefined();
  });
};
