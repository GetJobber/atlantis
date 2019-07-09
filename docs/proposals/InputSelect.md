# InputSelect

The `<InputSelect>` component will show a dropdown list of options when clicked
and will show the currently selected option in a text box.

## Design Patterns

Used to present the user with a limited set of options in a form.

## Interface

```jsx
<InputSelect>
  <Option value="grapefruit">Foo</Option>
  <Option value="pomegranate">Bar</Option>
  <Option value="pomello">Baz</Option>
</InputSelect>
```

```jsx
let options = [
    {value: "grapefruit", text: "Foo"}
    {value: "pomegranate", text: "Bar"}
    {value: "pomello", text: "Baz"}
].map( x => <Option value={x.value}>{x.text}</Option> )
<InputSelect>
    {options}
</InputSelect>
```

```jsx
// Maybe future option for just dumping a list of options into
// the input without expanding the list.
<InputSelect values={[
    {value: "grapefruit", text: "Foo"}
    {value: "pomegranate", text: "Bar"}
    {value: "pomello", text: "Baz"}
]} />
```

## Props Table

| name       | type      | default  | description                                                  |
| ---------- | --------- | -------- | ------------------------------------------------------------ |
| `size`     | `string`  | `normal` | Text size. ['small', 'normal', 'large']                      |
| `disabled` | `boolean` | `false`  | Input is disabled or not. Greys out text, disallows editing. |
| `invalid`  | `boolean` | `false`  | Indicates the selected value is invalid. Add red border.     |

## Accessibility

Should be able to tab to the component and move through the options with the
keyboard. Enter should select the current option.

Screen readers should see a name for the needed value. And read the options as
they're selected.

# Option

Provides an option to a select input. Just a wrapper around the native input in
case we want to style the native input.

## Props Table

| name       | type       | default | description                                                                                                                                                     |
| ---------- | ---------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `disabled` | `boolean`  | `false` | If this Boolean attribute is set, this option is not checkable.                                                                                                 |
| `label`    | `string?`  | none    | This attribute is text for the label indicating the meaning of the option. If the label attribute isn't defined, its value is that of the element text content. |
| `selected` | `boolean?` | none    | If present, this Boolean attribute indicates that the option is initially selected.                                                                             |
| `value`    | `string?`  | none    | The content of this attribute represents the value to be submitted with the form, should this option be selected.                                               |
