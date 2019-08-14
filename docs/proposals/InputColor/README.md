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

```jsx
render() {
return (
      <InputColor
    placeholder="Button Color"
    value="#aeab2e"
    onChange ={onChange}
    list="dataListId"
  />
  <datalist id={dataListID}>
      {dataList.map(function(color, index){
        return <option key={index} value={color}/>
      })}
    </datalist>
  );
}
```

## Props Table

_{Provide a table in the following format of the component's public API}_

| name          | type                                  | default          | description                                                                          |
| ------------- | ------------------------------------- | ---------------- | ------------------------------------------------------------------------------------ |
| `value`       | `string`                              | `#7db00e`        | This will be the hex color that will be displayed                                    |
| `placeholder` | `string`                              | `Choose a color` | This will be used to give context on where/what the color will be used for           |
| `onChange`    | `onChange(newValue: colorName): void` | none             | Callback that fires when the color is changed changed                                |
| `dataListId`  | `string?`                             | none             | This will allow us to link a datalist                                                |
| `dataList`    | `string[]?`                           | none             | This will allow us to pass in some default colors but allow them to change if wanted |

## Accessibility

_{Should be able to navigate to it with a keyboard , something to consider is
contrast there are a lot of third party tools that handle this}_
