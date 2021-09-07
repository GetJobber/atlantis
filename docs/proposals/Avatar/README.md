# Avatar

An `<Avatar />` component will be used to display an identifier (image or
initials) for a user.

Rebecca Li has done some
[great research](https://jobber.atlassian.net/browse/JOB-19028) on the usage of
avatars in Jobber, as well as the potential usage of colors within avatars.

## Interface

```
<Avatar
    image="ImageUrl"
    name="Eddy Sims"
    initials="ES"
    color="#8f2d56" | color="var(--color-red)"
    size="large" | size={32}
/>
```

## Props Table

| name     | type   | default  | description                                              |
| -------- | ------ | -------- | -------------------------------------------------------- | ------- |
| image    | String | -        | The avatar image to be use                               |
| name     | String | -        | A users name to be used for accessibility                |
| initials | String | -        | Initials to show if the image is null                    |
| color    | String | greyBlue | The background and border color that represents the user |
| size     | String | small    | Size of the avatar - 'small'                             | 'large' |

## Display

An `<Avatar />` component would have a heiarchy of display options

1. Display the image used in the `image` prop.
2. If `image` is null, display the `initials` prop.
   - Initials should fit within the avatar and scale with the size.
   - If initials contain 3 letters, the font size should scale to proplerly fit
     this
3. If `image` and `initials` are null. Display a fallback icon
   - We could use `person` from https://atlantis.getjobber.com/components/icon

## Color

Can be used to represent the border color of the avatar if an image is set, or
the background color of the avatar if the image is not set.

One thing to note is that for accessibility purposes, color selection could
cause issues with color contrast.

## Size

- `String`: `size` prop would take a string that represents the size of the
  component
  - Example: `<Avatar size="large" />`
  - This would box us into limited sizes as once the standard XS,S,M,L,XL are
    used we would need to rethink the component

## Accessibility

Assistive technology should be able to see the avatar and know the users name
based on the `name` prop.

Color contrast must be acceptable.

## Similar components in other design systems for inspiration:

- https://material-ui.com/components/avatars/
- https://polaris.shopify.com/components/images-and-icons/avatar/
- https://ant.design/components/avatar/
