# Modify `Text` to include new props

Currently the `Text` component has one prop: `variation`. This prop is used to
handle the style (size and color) of the text that is rendered. The issue that
we are finding is that there is currently no way to combine styles.

**Example:**

We want to have small feedback text, and base sized feedback text. This
currently isn't possible with the current `Text` component.

## Current Props

| prop      | type   | options                                                           |
| --------- | ------ | ----------------------------------------------------------------- |
| variation | string | "success", "error", "default", "subdued", "intro", "warn", "info" |

## Proposed Solutions

I think that there are 2 ways to handle this.

### Variation takes an array

The variation prop could be changed to take an array of strings. This would
allow for us to do things like `<Text variation={['intro', 'info']}>`.

I do see a concern with this method of something like
`<Text variation={['error', 'info']}>` happening. In this case we would be
styling with the `error` styles and then over riding them with the `info`
styles.

### Multiple Props

Text could take 2 props instead of one. `size` and `variation`. This would allow
for us to do things like `<Text size="small" variation="info">`.

My concern with this is that it may result as a breaking change. The reason
being is that the `intro` variation would need to be moved into the `size` prop.

In this case the new props could look like this:

| prop      | type   | options                                       |
| --------- | ------ | --------------------------------------------- |
| size      | string | "small", "base", "large"                      |
| variation | string | "success", "error", "subdued", "warn", "info" |

## Opinion

In my opinion, the `Multiple Props` is the way to go. I think that the breaking
change would have a small impact and we would be able to handle it faster then
the problems that could arise from the `Variation takes an array` option.
