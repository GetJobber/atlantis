# Option List

The Option List component will allow SC's to choose from a list of provided
options.

## Design Patterns

There is a fundamental need for a component of this type that just does not
currently exist in Atlantis. This component will give Jobber the ability allow
SP's to choose from a list of options that is available at a glance. Rather than
having to dive into a dropdown.

The Option List component should be flexible in that it can be used anywhere and
be used for multiple purposes. To expand on this, rather than just text options,
it should be designed in a way that images or other formats could be represented
as choices as well.

OptionList component will have a sub-component called option, that will
represent each individual radio-button that is used.

## Accessibility

Tabbing should move focus to the radio control options as would be expected.
Arrow keys can then be used to navigate the different options. Tabbing again
should move you to the "submit" button and shift-tab should move you back to the
options.

Screen readers should automatically announce the label that is passed into the
component. This is due to each list option being an html radio button at the
lowest level.

## Responsiveness & Mobile

On mobile devices the interaction behaviour would be the same as a mouse with
touch/click. The component should adapt to different screen sizes the same as an
html radio group would.

## Wireframe

https://www.figma.com/file/zFuwik186mdu4kLmHrXrck/Modal-with-Radio-Buttons?node-id=0%3A1

## Interface

```
<OptionList
    name="contact_method"
    header="Please select your desired contact method:"
    options={[
        {label: 'Email', value: 'email'},
        {label: 'Phone', value: 'phone'},
        {label: 'mail', value: 'mail'},
      ]}
/>
```

## Props Table

| name                                                                           | type   | default | description                                                                                                           |
| ------------------------------------------------------------------------------ | ------ | ------- | --------------------------------------------------------------------------------------------------------------------- |
| name                                                                           | String | -       | A name for the option list that will be passed to the sub components to link them together                            |
| header                                                                         | String | -       | A short description for the option list that is explains what is being asked of the user.                             |
| options                                                                        | Array  | -       | An associative array that represents the labels and values that are to be associated with each option, and determines |
| the list order. The default selected item will be the first item in this hash. |
