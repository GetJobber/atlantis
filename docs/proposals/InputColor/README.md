# InputColor

The `<InputColor>` should allow a user to specify a color, either through a
color picker or by specifying an RGB hex value.

## Design Patterns

The goal of the `InputColor` component is to allow a color to be chosen. A user
can either pick a color by triggering the native browser color input, or by
entering a hex value. Both the text input and the color input should stay
consistent with what is entered in the other input.

## Wireframe

![InputColorWireframe](https://user-images.githubusercontent.com/51097786/62896803-0191c400-bd0f-11e9-9c12-96fbd1c32696.png)

## Interface

```jsx
render() {
  return (
    <InputColor
      placeholder="Button Color"
      value="#aeab2e"
      onChange ={onChange}
    />
  );
}
```

## Props Table

| name          | type                                  | default        | description                                                                                                                      |
| ------------- | ------------------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `value`       | `string`                              | `#aeab2e`      | An RGB hex color value, preceeded by a number sign.                                                                              |
| `placeholder` | `string`                              | `Button Color` | The input label that acts as a placeholder when the value is empty, and a label above the input field when `value` is not blank. |
| `onChange`    | `onChange(newValue: colorName): void` | none           | Callback that fires when the color is changed by either input.                                                                   |

## Accessibility

Should be able to navigate to it with a keyboard , something to consider is
contrast there are a lot of third party tools that handle this.
