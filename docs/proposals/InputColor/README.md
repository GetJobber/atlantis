# InputColor

The `<InputColor>` component will ... _{Add a brief description of the
component}_

## Design Patterns

\_{The goal of the `InputColor` component is to allow a color be chosen to
reflect the brand of an SP

An SP can either pick a color from the color pick box or enter in the hex value
and both the color box and the hew value should reflect eachother }\_

## Wireframe

![mockup](https://user-images.githubusercontent.com/51097786/62891872-1b79d980-bd04-11e9-9c5e-a66955519674.png)

## Interface

```jsx
render() {
  const [colorName, setColor] = useState(color);
  const handleColorChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
      setColor(evt.currentTarget.value);
    };
  return(
   <div className="fieldAffix">
    <span className="fieldAffix-item">
      <input
        type="Color"
        value={colorName}
        onChange={handleColorChange}
      />
    </span>
    <placeholder-field
      class={"test"}
      label={"Button Color"}
      auto-size={false}
    >
      <input
        type="text"
        maxLength={7}
        value={colorName}
        onChange={handleColorChange}
      />
    </placeholder-field>
  </div>
  )
}
```

## Props Table

_{Provide a table in the following format of the component's public API}_

| name           | type     | default          | description                                                                |
| -------------- | -------- | ---------------- | -------------------------------------------------------------------------- |
| `color`        | `string` | `#7db00e`        | This will be the hex color that will be displayed                          |
| `colorContext` | `string` | `Choose a color` | This will be used to give context on where/what the color will be used for |

## Accessibility

_{Should be able to navigate to it with a keyboard but outside of that i'm not
sure it can be accsible.}_
