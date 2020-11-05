# Account Banner

The `<Account Banner />` component will be used to display messages that relate
to a user's account, and will appear at the top of the screen.

## Design Patterns

The goal of this component is to have a single unified way of displaying account
information to a user. Where banners that appear on pages like rails flash
banners display information related to an object on the page or an action the
user has taken on a previous page, the account banner will be consistently
displayed at the highest level of the page.

This is also related to the Object Banner proposal, as with both the Account
Banner and Object banner, we can lock down the implementation of banners in
Jobber; at the time of writing this proposal, there are currently 7 different
individual banner components accomplishing the same task.

## Accessibility

For accessibility, the [x] button and the cta button, if they exist, should be
tab-navigatable and have aria labels.

## Responsiveness & Mobile

No special behaviour should be needed on mobile devices or smaller screen sizes.
No special touch behaviours should be needed.\_

## Wireframe

![AccountBannerWireframe](https://user-images.githubusercontent.com/34727471/98292935-c2cad800-1f6a-11eb-94b8-8b51690949b7.png)
![AccountBannerVariations](https://user-images.githubusercontent.com/34727471/98292947-c6f6f580-1f6a-11eb-82ff-4b59321daab6.png)

## Interface

```tsx
render() {
  return (
    <AccountBanner
      headline="You are at your plan's user limit"
      subline="We have plans that can help you grow"
      variation="warning"
      dismissable={true}
      ctaUrl="https://getjobber.com/plans"
    />
  );
}
```

## Props Table

_{Provide a table in the following format of the component's public API}_

| name     | type   | default | description                                                            |
| -------- | ------ | ------- | ---------------------------------------------------------------------- |
| headline | String | -       | Primary bolded text to be displayed                                    |
| subline  | String | -       | Secondary unbolded text to be displayed underneath of the primary text |
