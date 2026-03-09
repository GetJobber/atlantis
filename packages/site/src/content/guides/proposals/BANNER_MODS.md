# Modify `Banner` to include actions

The `<Banner>` component displays a message, and will include optional action
and dismiss buttons. This proposal basically recommends the addition of an
action button prop like we have on `<Modal>`.

This is intentionally scoped to the concept of a "Page Banner" - a message that
relates to the scope or action on a page (or at an "object" level, e.g. Quote).
There is a need for a Site Banner as well, and current designs make that not
dismissable. Consideration

Open Questions:

1. These appear at the top of the layout but aren't visible for long scrolling
   pages. How do we want to handle that? For now, we can implement these
   functionally and then move them into place as we address the vertical slice
   layout.
2. What happens when we have two banners for a placement on a page or for the
   site? Eventually we may need a singleton "manager" for page banners and
   sitewide banners. This would include navigation to step through multiple, or
   view a list of the messages. For now, we can develop with that need in mind
   and try to keep that option open.

## Design Patterns

Display a message to a user, with a tone and some options for action or dismiss
behaviors. This is simply adding an action button to the existing banner, as an
iteration from where designs are currently heading.

## Accessibility

The content should be accessible to screen readers, and the actions properly
accessible (button and dismiss).

## Responsiveness & Mobile

As this message usually appears at the top of the page layout, we need to either
stick it to the top of the view port or scroll the user to the top. These
questions will be deferred and handled as part of layout considerations in
separate work.

## Wireframe

The design work includes a Site Banner as well as this "Page Banner" (which is
dismissable).
https://www.figma.com/file/AZFSe2T7FID7d5DP52NTkX/Design-System-Contribution-%5B-Account-Banner-%5D?node-id=26%3A1

## Interface

```jsx
<Banner
  primaryAction={{ label: "Learn More", onClick: handlePrimaryAction }}
  onDismiss={{ handleDismiss }}
>
  There is important information we need to tell you!
</Banner>
```

## New Props Table

The following props will be added to the `<Banner>` component.

| name          | type             | default                                                                                         | description                                                                                                                                                                                                              |
| ------------- | ---------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| primaryAction | Button props     | An action and button message. The button will be styled by default to match the type of banner. |
| placement     | `[ page, site ]` | "page"                                                                                          | Determines the presentation style and some options for the banner. A site banner is not dismissable and appears at the top of the site layout. A page banner can be dismissed and appears inline at the top of the page. |
