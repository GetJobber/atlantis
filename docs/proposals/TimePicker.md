# Component Name

The `<TimePicker>` component will allow the selection of an hour and minute of
the day. The input can use the 12 hour or 24 hour clock.

## Design Patterns

_{Describe the design goal of this component. What is the design purpose of this
component? How do its responsibilities relate to other components? Is there
anything else that is important to describe?}_

## Wireframe

```
----------------
| 12 | 34 | AM |
----------------
```

## Interface

https://github.com/tc39/proposal-temporal

```
let time = new CivilTime(12, 34);
let f = x => console.log(x);
<TimeInput defaultTime={time} format={"twelve"} onChange={f}>
```

## Props Table

_{Provide a table in the following format of the component's public API}_

| name        | type       | default  | description                              |
| ----------- | ---------- | -------- | ---------------------------------------- |
| defaultTime | CivilTime? | none     | Intial time                              |
| format      | string?    | "twelve" | Time format. `["twelve" | "twentyfour"]` |
| onChange    | function?  | none     | Callback that fires when the is changed  |

## Accessibility

User should be able to change the time parts using the keyboard and navigate
between the parts with tab/shift+tab.

The mobile version should use native time pickers.

A screen reader should read the full component value in a normal way.

_{Describe the accessibility concerns for the component. Should it be keyboard
navigatable? Should it capture input, what should a screen reader see when it's
focused?}_
