# Upcoming Breaking Changes

## `@jobber/components@4.91.0`

Moving forward, to import Atlantis Styles you will have to import
`@jobber/components/styles` or `@jobber/components/dist/styles.css` into your
project depending on if you're in an ESM or CJS environment respectively.

## `@jobber/components-native@1.x.x`

### Banner

Deprecating `text` and `details` props in favor of `children`. This aligns
implementation with the web version of the Banner component.

**Note:** This change to Banner is only available in the
`@jobber/components-native` package and you will need to update imports if
currently using `atlantis/Banner`.

Before:

```tsx
import { Banner } from "atlantis/Banner";

<Banner
  type="error"
  text="There was an error submitting your form"
  details={[
    "This client already exists",
    "This phone number doesn't receive SMS",
  ]}
/>;
```

```tsx
<Banner type="notice" text="Your import is in progress" />
```

After:

```tsx
import { Banner } from "@jobber/components-native";

const listItems = [
  "This client already exists",
  "This phone number doesn't receive SMS",
];
<Banner type="error">
  <Text level="textSupporting">There was an error submitting your form:</Text>
  <TextList level="textSupporting" items={listItems} />
</Banner>;
```

```tsx
<Banner type="notice">Your import is in progress</Banner>
```

## `@jobber/components@5.x.x`

### Autocomplete

Removing `inputRef` from `Autocomplete` component. Use `ref` instead.

Before:

```tsx
const inputRef = useRef(null);
<Autocomplete inputRef={inputRef} />;
```

After:

```tsx
const inputRef = useRef(null);
<Autocomplete ref={inputRef} />;
```

### showToast

Removing `action` and `actionLabel` from `showToast`.

Since Toasts are shown for a limited amount of time it doesn't make sense to
show an action that may disappear before the user has a chance to click it.
