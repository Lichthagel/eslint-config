# @lichthagel/eslint-config

Collection of eslint configs I use for my projects.

## Installation

`npm|yarn|pnpm|bun install -D eslint @lichthagel/eslint-config`

`npx|yarn dlx|pnpm dlx|bunx jsr add @licht/eslint-config` or `deno add jsr:@licht/eslint-config`

## Configuration

Using `eslint.config.js`:

```js
// @ts-check

import lichthagel from "@lichthagel/eslint-config";

/** @type {import("@lichthagel/eslint-config").FlatConfigItem[]} */
export default [
  ...await lichthagel({
    ...options
  }),
  ...otherConfigs
];
```

Or using `eslint.config.ts` (see <https://eslint.org/docs/latest/use/configure/configuration-files#typescript-configuration-files>):

```ts
import lichthagel, { FlatConfigItem } from "./dist/index.js";

export default [
  ...(await lichthagel({
    ...options
  })),
  ...otherConfigs
] satisfies FlatConfigItem[];
```
