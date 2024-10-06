# @lichthagel/eslint-config

Collection of eslint configs I use for my projects.

## Installation

`npm|yarn|pnpm i -D eslint lichthagel/eslint-config`

## Configuration

```js
// @ts-check

import lichthagel from "@lichthagel/eslint-config";

/** @type {import("@lichthagel/eslint-config").FlatConfigItem[]} */
export default [
  ...await lichthagel({
    ...options
  }),
  ...otherSettings
];
```
