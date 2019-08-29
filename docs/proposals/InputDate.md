# `InputDate`

## Design Patterns

The `InputDate` component allows a user to select a date.

## Wireframe

![](https://d.pr/i/Eiq4KZ.png)

## Interface

```ts
import { InputTime } "@jobber/components/InputTime";
```

```tsx
<Playground>
  <InputTime defaultValue={new CivilDate(2019, 01, 30)} size="small" />
  <InputTime defaultValue={new CivilDate(2019, 01, 30)} />
  <InputTime defaultValue={new CivilDate(2019, 01, 30)} size="large" />
</Playground>
```

```tsx
<Playground>
  {() => {
    const [date, setDate] = useState(new CivilDate(2019, 01, 30));
    const resetDate = () => {
      setDate(new CivilTime(3, 52));
    };
    const handleChange = newTime => {
      setTime(newTime);
    };
    return (
      <>
        <InputTime value={date} onChange={handleChange} />
        <pre>{date && date.toString()}</pre>
        <Button label="Reset" onClick={resetDate} />
      </>
    );
  }}
</Playground>
```

## Props Table

_{Provide a table in the following format of the component's public API}_

| name           | type                     | default   | description                                                                                       |
| -------------- | ------------------------ | --------- | ------------------------------------------------------------------------------------------------- |
| `defaultValue` | `CivilDate?`             | undefined | Value for an [uncontrolled input](https://reactjs.org/docs/uncontrolled-components.html).         |
| `value`        | `CivilDate?`             | undefined | Value for an [controlled input](https://reactjs.org/docs/forms.html#controlled-components).       |
| `onChange?`    | `(newValue?: CivilDate)` | undefined | Callback function for value change. If the input date is not valid this should return `undefined` |

This component will also inherit props from `FormField`. You can see examples of
interaction with `FormField` in our other input components.

## References:

This component will use CivilDate as per the
[Temporal Proposal Spec](https://github.com/tc39/proposal-temporal/blob/master/objects.md#civildate-).
