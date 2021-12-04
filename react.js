module.exports = {
    extends: ["./index.js", "plugin:react/recommended", "plugin:react-hooks/recommended"],
    env: {
        browser: true
    },
    plugins: ["react", "react-hooks"],
    rules: {
        "react/destructuring-assignment": "warn",
        "react/function-component-definition": ["warn", { namedComponents: "arrow-function" }],
        "react/jsx-boolean-value": "warn",
        "react/jsx-filename-extension": [1, { extensions: [".jsx", ".tsx"] }],
        "react/jsx-max-props-per-line": ["error", { maximum: { single: 3, multi: 1 } }],
        "react/jsx-tag-spacing": ["error", { closingSlash: "never", beforeSelfClosing: "always", afterOpening: "never", beforeClosing: "allow" }],
        "react/no-array-index-key": "warn",
        "react/no-typos": "warn",
        "react/no-unsafe": "warn",
        // "react/no-unused-prop-types": "warn",
        "react/no-unused-state": "warn",
        "react/prefer-exact-props": "warn",
        "react/react-in-jsx-scope": "off",
        "react/sort-prop-types": "error",
        "react/style-prop-object": "warn"
    },
    settings: {
        react: {
            version: "detect"
        }
    }
};