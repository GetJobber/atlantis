# Account Banner

The `<Account Banner />` component will be used to display messages that relate
to a user's account, and will appear at the top of the screen.

## Design Patterns

The goal of this component is to have a single unified way of displaying account
information to a user. Where banners that appear on pages like rails flash
banners display information related to an object on the page or an action the
user has taken on a previous page, the account banner will be consistently
displayed at the highest level of the page.

## Accessibility

For accessibility, the [x] button and the cta button, if they exist, should be
tab-navigatable and have aria labels.

## Responsiveness & Mobile

No special behaviour should be needed on mobile devices or smaller screen sizes.
No special touch behaviours should be needed.

## Wireframe

![AccountBannerWireframe](https://user-images.githubusercontent.com/34727471/98292935-c2cad800-1f6a-11eb-94b8-8b51690949b7.png)
![AccountBannerVariations](https://user-images.githubusercontent.com/34727471/98292947-c6f6f580-1f6a-11eb-82ff-4b59321daab6.png)

## Interface

```tsx
render() {
  return (
    <AccountBanner
      headline="You are at your plan's user limit"
      variation="warning"
      dismissable={true}
      ctaUrl="https://getjobber.com/plans"
    />
  );
}
```

## Props Table

| name        | type    | default | description                                                                                                  |
| ----------- | ------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| headline    | String  | -       | Primary bolded text to be displayed                                                                          |
| variation   | String  | -       | Sets the background of the banner to reflect the type of information being shown                             |
| dismissable | Boolean | -       | Whether or not an x button appears on the banner that allows the user to make the banner disappear           |
| ctaUrl      | String  | ""      | The url for which a cta on the banner will send you. If this prop is not set, the cta button will not appear |
