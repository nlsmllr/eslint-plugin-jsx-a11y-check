# ESLint Plugin: JSX Accessibility Check

## Overview

`eslint-plugin-jsx-a11y-check` is an ESLint plugin designed to help developers ensure their JSX elements comply with accessibility standards. This plugin enforces adherence to the Web Content Accessibility Guidelines (WCAG) by providing custom ESLint rules that detect potential accessibility violations in JSX code.

## Installation

To install the plugin, run:

```sh
npm install --save-dev eslint-plugin-jsx-a11y-check
```

or using Yarn:

```sh
yarn add --dev eslint-plugin-jsx-a11y-check
```

## Usage

To enable the plugin, add it to your ESLint configuration:

```json
{
  "plugins": ["jsx-a11y-check"],
  "extends": ["plugin:jsx-a11y-check/recommended"]
}
```

For stricter enforcement, use:

```json
{
  "extends": ["plugin:jsx-a11y-check/strict"]
}
```

## Configuration Options

This plugin offers multiple configurations tailored to different accessibility enforcement levels:

- **Recommended** (`recommended`): Implements basic accessibility rules.
- **Recommended Legacy** (`recommended-legacy`): A backward-compatible version of `recommended`.
- **Strict** (`strict`): Enforces stricter WCAG compliance.
- **Strict Legacy** (`strict-legacy`): A backward-compatible version of `strict`.

## Repository Structure

The repository follows a structured organization:

- `src/`: Contains the core ESLint plugin code.
  - `configs/`: Defines accessibility rule configurations.
  - `rules/`: Implements individual accessibility rules.
  - `utils/`: Provides helper functions for rule evaluations.
  - `constants.ts`: Stores centralized constants used across rules.
  - `index.ts`: Serves as the main entry point, exporting rules and configurations.

## Available Rules

### Enforce Alt Tags (`enforce-alt-tags`)
**Description**: Ensures that `alt` attributes are present on image elements to improve accessibility.

**Error Messages:**
- Missing `alt` attribute: "Provide an `alt` attribute to satisfy accessibility requirements."
- Empty `alt` attribute: "`alt` attributes cannot be empty."

**Example:**

**Incorrect:**
```jsx
<img src="example.jpg" />
```

**Correct:**
```jsx
<img src="example.jpg" alt="Description of the image" />
```

### No Generic Alt Values (`no-generic-alt-values`)
**Description**: Prevents the use of generic `alt` values such as `image`, `photo`, or `picture` to ensure meaningful descriptions.

**Error Message:** "Avoid using generic `alt` values such as 'image', 'photo', or 'picture'."

**Example:**

**Incorrect:**
```jsx
<img src="example.jpg" alt="image" />
```

**Correct:**
```jsx
<img src="example.jpg" alt="A scenic view of a sunset" />
```

## Development

### Adding Your Own Rules

To add a new custom ESLint rule, follow these steps:

1. Navigate to the `rules/` directory and create a new file, e.g., `newRule.ts`.
2. Implement the rule following the ESLint rule structure:
   ```ts
   import { Rule } from "eslint";
   import { Node } from "estree-jsx";

   const newRule: Rule.RuleModule = {
     meta: {
       type: "problem",
       docs: {
         description: "Describe your rule here."
       },
       messages: {
         violation: "Custom accessibility rule violation message."
       }
     },
     create(context) {
       return {
         JSXOpeningElement(node: Node) {
           // Rule logic here
           context.report({
             node,
             messageId: "violation"
           });
         }
       };
     }
   };

   export default newRule;
   ```
3. Register the rule in `rules/index.ts`:
   ```ts
   import newRule from "./newRule";

   const rules = {
     "new-rule": newRule,
     // other rules
   };

   export default rules;
   ```
4. Add test cases for the new rule in the `tests/` directory.
5. Update the documentation to include the new rule.

### Running Tests

To run tests for the plugin:

```sh
npm test
```

## Contributing

Contributions are welcome! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch (`feature/new-rule` or `fix/bug-name`).
3. Implement your changes and add corresponding tests.
4. Submit a pull request.

## License

This project is licensed under the MIT License.

