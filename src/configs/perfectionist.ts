import perfectionst from "eslint-plugin-perfectionist";

import { FlatConfigItemStrict } from "../types";

export default [
  {
    name: "perfectionist/recommended-natural",
    ...perfectionst.configs["recommended-natural"],
  },
  {
    name: "lichthagel/perfectionist",
    rules: {
      "perfectionist/sort-object-types": "off",
      "perfectionist/sort-objects": [
        "off",
        {
          customGroups: {
            id: ["id", "name", "slug"],
          },
          groups: ["id", "unknown"],
          partitionByComment: true,
          partitionByNewLine: true,
        },
      ],
      "perfectionist/sort-union-types": [
        "error",
        {
          groups: [
            "named",
            ["intersection", "union"],
            "unknown",
            "nullish",
          ],
        },
      ],
    },
  },
] satisfies FlatConfigItemStrict[] as FlatConfigItemStrict[];
