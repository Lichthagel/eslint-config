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
          "custom-groups": {
            id: ["id", "name", "slug"],
          },
          "groups": ["id", "unknown"],
          "partition-by-comment": true,
          "partition-by-new-line": true,
        },
      ],
      "perfectionist/sort-union-types": [
        "error",
        {
          "nullable-last": true,
        },
      ],
    },
  },
] satisfies FlatConfigItemStrict[] as FlatConfigItemStrict[];
