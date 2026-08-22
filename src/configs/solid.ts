import type { Linter } from "eslint";

import type { FlatConfigItemStrict } from "../types";

type SolidOptions = {
  version?: 2;
  withTypescript?: boolean;
};

const solid = async (options: SolidOptions = {}): Promise<FlatConfigItemStrict[]> => {
  const {
    version,
    withTypescript = false,
  } = options;

  const configModule = version === 2
    ? await import("eslint-plugin-solid/configs/v2")
    : await import("eslint-plugin-solid/configs/recommended");
  const { default: configSolid } = configModule as unknown as { default: Linter.Config };

  return [
    {
      name: version === 2 ? "solid/v2" : "solid/recommended",
      files: ["**/*.jsx", ...(withTypescript ? ["**/*.tsx"] : [])],
      ...configSolid,
    },
  ];
};

export default solid;
