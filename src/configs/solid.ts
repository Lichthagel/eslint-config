import type { Linter } from "eslint";

import type { FlatConfigItemStrict } from "../types";

type SolidOptions = {
  withTypescript?: boolean;
};

const solid = async (options: SolidOptions = {}): Promise<FlatConfigItemStrict[]> => {
  const {
    withTypescript = false,
  } = options;

  const { default: configSolid } = await import("eslint-plugin-solid/configs/recommended") as unknown as { default: Linter.Config };

  return [
    {
      name: "solid/recommended",
      files: ["**/*.jsx", ...(withTypescript ? ["**/*.tsx"] : [])],
      ...configSolid,
    },
  ];
};

export default solid;
