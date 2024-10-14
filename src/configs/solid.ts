import { Linter } from "eslint";

import { FlatConfigItemStrict } from "../types";

type SolidOptions = {
  withTypescript?: boolean;
};

const solid = async (options: SolidOptions = {}): Promise<FlatConfigItemStrict[]> => {
  const {
    withTypescript = false,
  } = options;

  const configSolid = await import("eslint-plugin-solid/configs/recommended").then((mod) => mod.default as unknown as Linter.Config);

  return [
    {
      name: "solid/recommended",
      files: ["**/*.jsx", ...(withTypescript ? ["**/*.tsx"] : [])],
      ...configSolid,
    },
  ];
};

export default solid;
