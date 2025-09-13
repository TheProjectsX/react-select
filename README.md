# React Select

A simple and customizable React dropdown select component supporting single, multi, and grouped options.

## 🌐 Demo

Checkout [Demo of react-select](https://modasser.is-a.dev/react-select/)

## Version 0.1.1 Changelog:

-   Fixed not opening bug when disabled
-   Added `name` property so that if the `ReactSelect` is inside a form, it can be accessed.
    -   The input has `value` as the value of the selected option
    -   Also has a dataset data `raw`, containing `JSON.stringify`-ed of the full data of the selected option
-   Used Buttons instead of Div in 2 places
-   Avoided the `controlled to uncontrolled input` problem by using state. Not new state, already used state

## Features

-   Single & multi select
-   Grouped options
-   Clearable & searchable
-   Disabled state support
-   TypeScript ready
-   Using `name` in form

## Installation

```bash
# using npm
npm install @theprojectsx/react-select

# using yarn
yarn add @theprojectsx/react-select
```

## Usage

```tsx
import React, { useState } from "react";
import ReactSelect, { Option, GroupedOption } from "@theprojectsx/react-select";

const options: Option[] = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
];

export default function App() {
    const [selected, setSelected] = useState<Option | Option[] | null>(null);

    return (
        <ReactSelect
            options={options}
            placeholder="Select an option"
            isClearable
            onChange={setSelected}
        />
    );
}
```

## Props

| Prop                  | Type                                         | Default       | Description                           |
| --------------------- | -------------------------------------------- | ------------- | ------------------------------------- |
| `options`             | `Option[] \| GroupedOption[]`                | -             | Items to display in the dropdown      |
| `defaultValue`?       | `Option \| Option[] \| null`                 | `null`        | Initial selected value                |
| `placeholder`?        | `string`                                     | `"Select..."` | Placeholder text                      |
| `name`?               | `string`                                     | `select`      | Input `name` attribute to use in form |
| `isClearable`?        | `boolean`                                    | `false`       | Whether selection can be cleared      |
| `isSearchable`?       | `boolean`                                    | `true`        | Enable search in the dropdown         |
| `isDisabled`?         | `boolean`                                    | `false`       | Disable the select                    |
| `isGrouped`?          | `boolean`                                    | `false`       | Enable grouped options                |
| `isMulti`?            | `boolean`                                    | `false`       | Enable multi-select                   |
| `parentStyle`?        | `React.CSSProperties`                        | -             | Inline style for parent container     |
| `menuStyle`?          | `React.CSSProperties`                        | -             | Inline style for dropdown menu        |
| `onChange`?           | `(item: Option \| Option[] \| null) => void` | -             | Callback triggered on value change    |
| `onMenuStatusChange`? | `(status: boolean) => void`                  | -             | Callback when menu opens/closes       |
| `onSearch`?           | `(value: string) => void`                    | -             | Callback for search input             |

## License

MIT License @TheProjectsX
