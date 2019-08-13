# InputColor

The `<InputColor>` should allow a user to choose a color. They can either pick a
color from the color picker or enter a value in the input. When either is
changed the other should also reflect that change.

## Design Patterns

\_{The goal of the `InputColor` component is to allow a color be chosen to
reflect the brand of an SP

An SP can either pick a color from the color pick box or enter in the hex value
and both the color box and the hew value should reflect eachother }\_

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

_{Provide a table in the following format of the component's public API}_

| name          | type                                  | default          | description                                                                |
| ------------- | ------------------------------------- | ---------------- | -------------------------------------------------------------------------- |
| `value`       | `string`                              | `#7db00e`        | This will be the hex color that will be displayed                          |
| `placeholder` | `string`                              | `Choose a color` | This will be used to give context on where/what the color will be used for |
| `onChange`    | `onChange(newValue: colorName): void` | none             | This will be used to give context on where/what the color will be used for |

## Accessibility

_{Should be able to navigate to it with a keyboard , something to consider is
contrast there are a lot of third party tools that handle this}_
