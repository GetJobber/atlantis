# Banner

# Banner

## Summary

Banners are persistent messages used to communicate important changes, ongoing
conditions, or system errors. They appear at the top of a screen or near related
content and remain visible until dismissed or the condition is resolved.

At Jobber, Banners help service providers (SPs) stay informed about updates that
impact their business, without unnecessarily interrupting their flow.

## Anatomy

A Banner typically includes:

<ul>
  <li> Icon: Adds visual context, usually for warning or error types </li>
  <li> Message text: 1–2 clear, concise sentences </li>
  <li> CTA or link (optional): For related action </li>
  <li> Dismiss button (optional): For SP-controlled removal </li>
</ul>

## Behaviour

- Alignment: Banner should align with the left and right of the content it
  relates to. In a modal or page layout, this means aligning with text, inputs,
  or other components beneath it. Use the [Content](/components/Content) to
  ensure consistent vertical spacing between the Banner and adjacent elements.

- Dismissal: Banners remain visible until they are dismissed or the condition
  resolves. Include a dismiss button only when no further user action is
  required.

#### Global Banner (Web and Mobile)

Use Global banner for system-wide messages that need to persist beyond a
specific view or layout.

<ul>
 <li>It should be positioned above the top navigation bar</li>
 <li>It should be full-width, flush with the screen edges</li>
</ul>

Note that Global Banner is a separate component (there's a version of it in
Jobber and Jobber Online repos).

## Variants

Banners come in four types; `success`, `notice`, `warning` and `error`. Each
type has guidelines for usage:

### Success (Web only)

<Canvas>
  <Banner type="success">You've connected your bank account and can start receiving payouts.</Banner>
</Canvas>

Success banners are appropriate when:

<ul>
  <li>A meaningful user action is complete and feedback is delayed or needs to persist</li>
  <li>It’s important for SPs to understand that a key change has been applied</li>
</ul>

Otherwise, use [Toast](/components/Toast) as the default for success messages.
Do not use the term "Success" when writing a success banner.

### Success (Mobile)

On mobile, use [Toast](/components/Toast) for a success message.

### Notice (Info)

<Canvas>
  <Banner type="notice">Your visits are being scheduled</Banner>
</Canvas>

Use notice (info) banners to provide information about:

<ul>
  <li>Informing SPs of background operations such as visits being scheduled</li>
  <li>Communicating new features or non-blocking advice</li>
  <li>Maintenance windows or known system states</li>
</ul>

Notices should get to the point and inform the user about why the functionality
or change is important, especially if the impact isn't obvious.

### Warning

<Canvas>
  <Banner type="warning">
    Your subscription will be automatically upgraded in 8 days
  </Banner>
</Canvas>

Use warning banners when:

<ul>
  <li>An SPs action may cause unintended effects or a system state change</li>
  <li>Additional action has to be taken by the SP</li>
</ul>

Warning messages should be one to two short sentences that describe the possibly
unknown impact changes or actions will have.

They should not use "alarmist" language such as start with "Warning" and should
avoid exclamation points. Additionally, they should not be used as a way of
blocking or redirecting a workflow.

#### Warning banner vs. Confirmation modal

On web, you should use [ConfirmationModal](/components/ConfirmationModal) when
you need to get explicit confirmation from the SP before they complete an action
that is difficult to reverse.

| Use a **Warning Banner** when...                    | Use a **Confirmation Modal** when...                |
| --------------------------------------------------- | --------------------------------------------------- |
| You’re communicating a persistent or upcoming state | You need to confirm intent before proceeding        |
| The SP needs to act, but isn’t initiating the risk  | The SP is triggering a high-impact change           |
| The risk persists until resolved (e.g. paused plan) | The action could disrupt billing, payments, or data |
| You want the message visible across sessions        | You want to keep context to current action          |
| The SP may need time to decide or follow up         | The SP must make a choice before continuing         |

### Error message

<Canvas>
  <Banner type="error" icon="alert">
   Your changes couldn't be saved. Check your connection and try again.
  </Banner>
</Canvas>

Use error banners when:

<ul>
  <li>an issue requires immediate attention</li>
  <li>an issue is blocking the SP</li>
  <li>inline validation can not be used</li>
</ul>

Errors should explain what happened, and how to address the issue in a concise
manner.

System errors should avoid technical or intimidating language, and provide ways
to resolve or troubleshoot the issue if possible. Don't use error codes.

Using an `icon` prop is optional, but can be used to provide additional visual
context to the user.

#### Errors in forms (Web)

If an error is directly related to an input, don't use a banner. Use the
[InputText validation message](../?path=/docs/components-forms-and-inputs-inputtext--docs#validation-message)
component or, if unavailable, [InputValidation](/components/InputValidation).
Scroll to the first affected field on submission.

#### Errors in forms (Mobile)

In forms, use the error Banner when the response from submitting the form has
returned errors. See
[Error Details](../?path=/story/components-status-and-feedback-banner-mobile--error-details)
as an example.

In conjunction, each impacted input should display its own inline error
messaging to aid in "recognition over recall" as the user scrolls down through
the form to rectify the issues.

If an input can be validated client-side (immediately, before the form is
submitted to the server), you don't need to provide a Banner that duplicates the
error messages. Use inline validation on the inputs to prevent the user from
submitting invalid data. If the user ignores client-side error messages and
submits anyways, show them the error Banner along with the errors on the
individual input(s).

## Content guidelines

Banner messages should be concise, clear, and actionable. They inform users of
system states, requirements, or follow-ups—especially ones that persist until
resolved.

This guidance helps ensure Banners are useful for all users, and particularly
for SPs who may be multitasking, working on mobile, or managing their business
on the go.

#### General guidance

<ul>
 <li>Use plain, direct language.</li>
 <li>Limit to 1–2 short sentences (ideally under 200 characters).</li>
 <li>Start with what’s happening, then what’s needed (if anything).</li>
 <li>Be specific—avoid vague phrases like “something went wrong.”</li>
 <li>You can reuse key terms from the message in the CTA, especially to reinforce the action.</li>
 <li>Use full sentences for clarity. Avoid fragments or trailing thoughts.</li>
</ul>

#### SP specific tips

<ul>
 <li>Prioritize clarity over cleverness. SPs need fast, scannable guidance.</li>
 <li>Avoid backend or system terms (e.g. “system error,” “processing failed”).</li>
 <li>Frame language around outcomes: payouts, scheduling, client experience.</li>
 <li>Keep urgency proportional to actual impact.</li>
</ul>

#### Language Rules

<ul>
 <li>Avoid exclamation points. They add unnecessary emotion and visual noise.</li>
 <li>Don’t use “Heads up,” “FYI,” or “Just so you know.” These take space but say nothing.</li>
 <li>Get to the point as quickly as possible. Start with the action required if there is one.</li>
 <li>Avoid apologizing in system messages. Focus on clarity and resolution rather than sentiment.</li>
</ul>

#### Language examples

| Type    | ✅ Better phrasing                                                                         | ❌ Less clear phrasing                          |
| ------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------- |
| Success | “You've connected your bank account and can start recieving payouts.”                      | “Bank connection successful!”                   |
|         | “Your logo has been added to your invoices.”                                               | “Update saved successfully.”                    |
| Notice  | “Client reminders now include a booking link.”                                             | “We’ve made updates to reminders.”              |
|         | “You can now double-book visits on your calendar.”                                         | “New scheduling feature added.”                 |
| Warning | “To receive payouts, you need to add your bank account details.” CTA: “Add bank account”   | “Missing payout details!”                       |
|         | “Your trial ends in 2 days. Select a plan to keep your account active.” CTA: “Select plan” | “Trial ending—don’t forget to upgrade!”         |
| Error   | “We couldn’t sync your calendar. Try reconnecting your account.”                           | “Calendar sync failed: error 503.”              |
|         | “We couldn’t save your changes. Check your connection and try again.”                      | “Something went wrong. Please try again later.” |

Use these examples as starting points. Focus on clarity, relevance, and next
steps. For actions that must be taken, make the language outcome-focused, rather
than technical or emotional.

## Dos and Don'ts

In summary, here are some general rules to follow when working with the banner
component:

#### Do:

<ul>
  <li> ✅ Use for persistent and important messages </li>
  <li> ✅ Try to keep the content to under 200 characters </li>
  <li> ✅ Align messaging with SP context and workflows </li>
  <li> ✅ Provide a CTA if user action is needed </li>
  <li> ✅ Use inline validation for field-level form errors </li>
</ul>

#### Don't:

<ul>
  <li> ❌ Use Banners for short-lived success feedback (use the Toast component instead) </li>
  <li> ❌ Stack multiple Banners without clear visual hierarchy </li>
  <li> ❌ Add filler intros like “Heads up” or “FYI" </li>
  <li> ❌ Over-explain or apologize; stay focused and practical </li>
</ul>

## Accessibility notes

 <ul>
  <li>Banners should be announced to screen readers when rendered</li>
  <li>Ensure high contrast between background and text—especially for error and warning states</li>
  <li>Avoid positioning mobile Banners over navigation or actionable UI</li>
</ul>

## Related components

- To provide low-priority, temporary feedback on the outcome of a user action,
  use [Toast](/components/Toast) instead.
- Use [ConfirmationModal](/components/ConfirmationModal) when you need to get
  explicit confirmation from the user before they complete an action.
- As stated in the Behaviour section, Global Banner is a a separate component
  (shared component, a version exists in both the Jobber and Jobber Online
  repos).

## Web Component Code

```tsx
Banner Flash Alert Notification Hero Web React import React, { type PropsWithChildren, useState } from "react";
import classnames from "classnames";
import { useResizeObserver } from "@jobber/hooks/useResizeObserver";
import type {
  BannerActionProps,
  BannerContentProps,
  BannerDismissButtonProps,
  BannerIconProps,
  BannerProps,
  BannerProviderProps,
  BannerType,
} from "./Banner.types";
import styles from "./Banner.module.css";
import { BannerContextProvider, useBanner } from "./BannerContext";
import { Icon, type IconNames } from "../Icon";
import { ButtonDismiss } from "../ButtonDismiss";
import { Button, type ButtonProps } from "../Button";
import { Text } from "../Text";

export function Banner({
  children,
  type,
  primaryAction,
  dismissible = true,
  icon,
  onDismiss,
  controlledVisiblity,
}: BannerProps) {
  if (primaryAction != undefined) {
    primaryAction = Object.assign(
      {
        size: "small",
        type: "primary",
        variation: "subtle",
      },
      primaryAction,
    );
  }

  return (
    <Banner.Provider
      type={type}
      visible={controlledVisiblity}
      onDismiss={onDismiss}
      icon={<Banner.Icon name={icon} />}
      dismissButton={dismissible && <Banner.DismissButton />}
    >
      <Banner.Content>{children}</Banner.Content>

      {primaryAction && <Banner.Action {...primaryAction} />}
    </Banner.Provider>
  );
}

Banner.Provider = function BannerProvider({
  children,
  visible,
  type,
  onDismiss,
  icon,
  dismissButton,
  UNSAFE_className,
  UNSAFE_style,
}: BannerProviderProps) {
  const [isVisible, _setIsVisible] = useState(true);
  const showBanner = visible ?? isVisible;

  const setIsVisible = (newValue: boolean) => {
    // Only update internal visibility if it's not controlled by the parent.
    if (typeof visible === "undefined") {
      _setIsVisible(newValue);
    }
    onDismiss?.();
  };

  return (
    <BannerContextProvider
      value={{
        type,
        isVisible: showBanner,
        setIsVisible,
      }}
    >
      <InternalWrapper
        icon={icon}
        dismissButton={dismissButton}
        UNSAFE_className={UNSAFE_className}
        UNSAFE_style={UNSAFE_style}
      >
        {children}
      </InternalWrapper>
    </BannerContextProvider>
  );
};

function InternalWrapper({
  children,
  icon,
  dismissButton,
  UNSAFE_className,
  UNSAFE_style,
}: PropsWithChildren &
  Pick<
    BannerProviderProps,
    "icon" | "dismissButton" | "UNSAFE_className" | "UNSAFE_style"
  >) {
  const { isVisible, type } = useBanner();

  const bannerWidths = {
    small: 320,
    medium: 480,
  };

  const [bannerRef, { width: bannerWidth = bannerWidths.small }] =
    useResizeObserver<HTMLDivElement>({
      widths: bannerWidths,
    });

  const bannerClassNames = classnames(
    styles.banner,
    [styles[type]],
    {
      [styles.medium]: bannerWidth >= bannerWidths.medium,
    },
    UNSAFE_className?.container,
  );

  if (!isVisible) return null;

  return (
    <div
      ref={bannerRef}
      className={bannerClassNames}
      style={UNSAFE_style?.container}
      role={type === "error" ? "alert" : "status"}
    >
      <div className={styles.bannerContent}>
        {icon ?? <Banner.Icon />}
        {children}
      </div>
      {dismissButton ?? <Banner.DismissButton />}
    </div>
  );
}

Banner.Icon = function BannerIcon({
  backgroundColor,
  UNSAFE_className,
  UNSAFE_style,
  ...iconProps
}: BannerIconProps) {
  const { type } = useBanner();
  const name = iconProps.name || getBannerIcon(type);
  const color = iconProps.customColor ? undefined : "surface";
  const size = "small";

  if (!name) return null;

  const overrideStyles: React.CSSProperties = {};

  if (backgroundColor) {
    overrideStyles.backgroundColor = `var(--color-${backgroundColor})`;
  }

  const classNames = classnames(
    styles.iconWrapper,
    styles[`${type}Icon`],
    UNSAFE_className?.container,
  );

  return (
    <span
      className={classNames}
      style={{
        ...overrideStyles,
        ...UNSAFE_style?.container,
      }}
    >
      <Icon
        color={color}
        size={size}
        UNSAFE_className={UNSAFE_className?.icon}
        UNSAFE_style={UNSAFE_style?.icon}
        {...iconProps}
        name={name}
      />
    </span>
  );
};

Banner.Content = function BannerContent(props: BannerContentProps) {
  let children = props.children;

  if (children && typeof children === "string") {
    children = <Text>{children}</Text>;
  }

  return (
    <div
      className={classnames(
        styles.bannerChildren,
        props.UNSAFE_className?.container,
      )}
      style={props.UNSAFE_style?.container}
    >
      {children}
    </div>
  );
};

Banner.DismissButton = function DismissButton(props: BannerDismissButtonProps) {
  const { setIsVisible } = useBanner();
  const ariaLabel = props.ariaLabel ?? "Dismiss notification";
  const onClick =
    props.onClick ??
    (() => {
      setIsVisible(false);
    });

  return (
    <div
      className={classnames(
        styles.closeButton,
        props.UNSAFE_className?.container,
      )}
      style={props.UNSAFE_style?.container}
    >
      <ButtonDismiss onClick={onClick} ariaLabel={ariaLabel} />
    </div>
  );
};

Banner.Action = function Action({
  UNSAFE_className,
  UNSAFE_style,
  ...buttonProps
}: BannerActionProps) {
  const classNames = classnames(
    styles.bannerAction,
    UNSAFE_className?.container,
  );

  return (
    <div className={classNames} style={UNSAFE_style?.container}>
      <Button
        size="small"
        type="primary"
        variation="subtle"
        UNSAFE_className={UNSAFE_className?.button}
        UNSAFE_style={UNSAFE_style?.button}
        {...(buttonProps as ButtonProps)}
      />
    </div>
  );
};

function getBannerIcon(type: BannerType): IconNames | undefined {
  switch (type) {
    case "notice":
      return "info";
    case "success":
      return "checkmark";
    case "warning":
      return "warning";
    case "error":
      return "alert";
  }
}

```

## Props

### Web Props

| Prop                  | Type                                                                                                                                                                                                                                                                                | Required        | Default     | Description                                                    |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ----------- | -------------------------------------------------------------- | -------- | --------------------------------------------------------------- |
| `type`                | `BannerType`                                                                                                                                                                                                                                                                        | ✅              | `_none_`    | Sets the status-based theme of the Banner                      |
| `primaryAction`       | `{ external?: never; onClick?: never; readonly name?: string; submit: never; readonly type?: ButtonType; readonly value?: string; readonly UNSAFE_className?: { container?: string; buttonLabel?: { ...; }; buttonIcon?: { ...; }; }; ... 18 more ...; readonly children?: never; } | ... 34 more ... | { ...; }`   | ❌                                                             | `_none_` | Accepts props for Button. Default action uses a 'subtle' Button |
| `dismissible`         | `boolean`                                                                                                                                                                                                                                                                           | ❌              | `true`      | Set to false to hide the dismiss button                        |
| `icon`                | `IconNames`                                                                                                                                                                                                                                                                         | ❌              | `_none_`    | Use to override the default status Icon                        |
| `onDismiss`           | `() => void`                                                                                                                                                                                                                                                                        | ❌              | `_none_`    | Callback to be called when the Banner is dismissed.            |
| `controlledVisiblity` | `boolean`                                                                                                                                                                                                                                                                           | ❌              | `undefined` | When provided, Banner's visibility is controlled by this value |

### Mobile Props

| Prop        | Type          | Required                 | Default                     | Description                                                                    |
| ----------- | ------------- | ------------------------ | --------------------------- | ------------------------------------------------------------------------------ | ------------------------------ | --- | -------- | -------------------------------------------- |
| `action`    | `ActionProps` | ❌                       | `_none_`                    | The function that should be performed when the Banner is pressed               |
| `children`  | `string       | ReactElement<any, string | JSXElementConstructor<any>> | ReactElement<any, string                                                       | JSXElementConstructor<any>>[]` | ❌  | `_none_` | Custom content to be displayed in the banner |
| `details`   | `string[]`    | ❌                       | `_none_`                    | **Deprecated**: Use `children` with a `<TextList level="text" />` instead      |
| @deprecated |
| `text`      | `string`      | ❌                       | `_none_`                    | **Deprecated**: Use `children` with a `<Text level="text" />`                  |
| @deprecated |
| `type`      | `BannerTypes` | ✅                       | `_none_`                    | The primary theme of the banner, controls the things like the background color |
| `icon`      | `IconNames`   | ❌                       | `_none_`                    | Adds an icon to the left of the banner content                                 |

## Categories

- Status & Feedback

## Web Test Code

```typescript
Banner Flash Alert Notification Hero Web React Test Testing Jest import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Banner } from ".";

it("renders a success banner", () => {
  const { container } = render(<Banner type="success">Success</Banner>);
  expect(container).toMatchSnapshot();
});

it("renders an error banner", () => {
  const { container } = render(
    <Banner type="error">Something went wrong</Banner>,
  );
  expect(container).toMatchSnapshot();
});

it("renders a notice banner", () => {
  const { container } = render(<Banner type="notice">Notice me</Banner>);
  expect(container).toMatchSnapshot();
});

it("renders a warning banner", () => {
  const { container } = render(<Banner type="warning">Warn</Banner>);
  expect(container).toMatchSnapshot();
});

it("renders without close button", () => {
  const { queryByLabelText } = render(
    <Banner type="warning" dismissible={false}>
      Foo
    </Banner>,
  );
  expect(queryByLabelText("Dismiss notification")).toBeNull();
});

it("renders with close button", () => {
  const { queryByLabelText } = render(
    <Banner type="warning" dismissible={true}>
      Foo
    </Banner>,
  );
  expect(queryByLabelText("Dismiss notification")).toBeTruthy();
});

test("should call the handler with a number value", () => {
  const changeHandler = jest.fn();

  const { getByLabelText } = render(
    <Banner type="success" onDismiss={changeHandler}>
      Close me
    </Banner>,
  );

  fireEvent.click(getByLabelText("Dismiss notification"));
  expect(changeHandler).toHaveBeenCalledTimes(1);
});

it("renders a banner with a primary action", () => {
  const { container } = render(
    <Banner
      type="success"
      primaryAction={{
        label: "smash me",
      }}
    >
      Bruce
    </Banner>,
  );

  expect(container).toMatchSnapshot();
});

it("renders a banner with a primary 'learning' action when the type is 'notice'", () => {
  const { container } = render(
    <Banner
      type="notice"
      primaryAction={{
        label: "smash me",
      }}
    >
      Bruce
    </Banner>,
  );

  expect(container).toMatchSnapshot();
});

it("wraps its children in text if the children are a simple string", () => {
  render(
    <Banner
      type="notice"
      primaryAction={{
        label: "smash me",
      }}
    >
      Bruce
    </Banner>,
  );
  expect(screen.getByText("Bruce")).toBeInstanceOf(HTMLParagraphElement);
});

it("does not wrap the its children in text if the children are not a simple string", () => {
  render(
    <Banner
      type="notice"
      primaryAction={{
        label: "smash me",
      }}
    >
      <h3>Bruce</h3>
    </Banner>,
  );
  const bruceHeading = screen.getByText("Bruce");
  expect(bruceHeading).toBeInstanceOf(HTMLHeadingElement);
  expect(bruceHeading.parentElement).toBeInstanceOf(HTMLDivElement);
});

it("should call the onClick when primaryAction is present", () => {
  const onClick = jest.fn();

  const { getByText } = render(
    <Banner
      type="success"
      primaryAction={{
        label: "Hello World",
        onClick: () => onClick(),
      }}
    >
      Bruce
    </Banner>,
  );

  fireEvent.click(getByText("Hello World"));
  expect(onClick).toHaveBeenCalledTimes(1);
});

it("adds a role of status by default", () => {
  const { getByRole } = render(<Banner type="notice">Bruce</Banner>);
  expect(getByRole("status")).toBeInstanceOf(HTMLDivElement);
});

it("adds a role of alert for error banners", () => {
  const { getByRole } = render(<Banner type="error">Bruce</Banner>);
  expect(getByRole("alert")).toBeInstanceOf(HTMLDivElement);
});

it("doesn't hide the banner when controlledVisibility is true", () => {
  const onDismissMock = jest.fn();
  const { getByLabelText, getByText } = render(
    <Banner
      type="warning"
      dismissible={true}
      controlledVisiblity={true}
      onDismiss={onDismissMock}
    >
      Foo
    </Banner>,
  );

  fireEvent.click(getByLabelText("Dismiss notification"));
  expect(onDismissMock).toHaveBeenCalledTimes(1);
  expect(getByText("Foo")).toBeVisible();
});

describe("Banner.Provider", () => {
  it("renders the banner content as is", () => {
    render(
      <Banner.Provider type="success">
        <Banner.Content>
          <div>custom content goes here</div>
        </Banner.Content>
      </Banner.Provider>,
    );
    const content = screen.getByText("custom content goes here");
    expect(content).toBeVisible();
    expect(content).toBeInstanceOf(HTMLDivElement);
  });

  it("renders the banner content into <Text> if it's a string", () => {
    render(
      <Banner.Provider type="success">
        <Banner.Content>custom content goes here</Banner.Content>
      </Banner.Provider>,
    );
    const content = screen.getByText("custom content goes here");
    expect(content).toBeVisible();
    expect(content).toBeInstanceOf(HTMLParagraphElement);
    expect(content.classList).toContain("text");
  });

  describe("banner icon", () => {
    it("renders the banner icon by default", () => {
      render(
        <Banner.Provider type="warning">
          <Banner.Content>...</Banner.Content>
        </Banner.Provider>,
      );
      expect(screen.getByTestId("warning")).toBeVisible();
    });

    it("does not render the banner icon when icon is false", () => {
      render(
        <Banner.Provider type="warning" icon={false}>
          <Banner.Content>...</Banner.Content>
        </Banner.Provider>,
      );
      expect(screen.queryByTestId("warning")).not.toBeInTheDocument();
    });

    it("allows a custom icon to be rendered", () => {
      render(
        <Banner.Provider type="warning" icon={<div>custom icon</div>}>
          <Banner.Content>...</Banner.Content>
        </Banner.Provider>,
      );
      expect(screen.queryByTestId("warning")).not.toBeInTheDocument();
      expect(screen.getByText("custom icon")).toBeVisible();
    });

    it("allows customizing the Banner.Icon", () => {
      render(
        <Banner.Provider type="warning" icon={<Banner.Icon name="info" />}>
          <Banner.Content>...</Banner.Content>
        </Banner.Provider>,
      );
      expect(screen.queryByTestId("info")).toBeVisible();
    });
  });

  describe("banner dismiss button", () => {
    it("renders the banner dismiss button by default", () => {
      render(
        <Banner.Provider type="warning">
          <Banner.Content>...</Banner.Content>
        </Banner.Provider>,
      );
      expect(screen.getByLabelText("Dismiss notification")).toBeVisible();
    });

    it("does not render the banner dismiss button when dismissButton is false", () => {
      render(
        <Banner.Provider type="warning" dismissButton={false}>
          <Banner.Content>...</Banner.Content>
        </Banner.Provider>,
      );
      expect(
        screen.queryByLabelText("Dismiss notification"),
      ).not.toBeInTheDocument();
    });

    it("on click it dismisses the banner and calls the onDismiss handler", async () => {
      const onDismissMock = jest.fn();

      render(
        <Banner.Provider type="warning" onDismiss={onDismissMock}>
          <Banner.Content>...</Banner.Content>
        </Banner.Provider>,
      );

      await userEvent.click(screen.getByLabelText("Dismiss notification"));
      expect(onDismissMock).toHaveBeenCalledTimes(1);
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });

    it("allows a custom dismiss button to be rendered", () => {
      render(
        <Banner.Provider
          type="error"
          dismissButton={<div>custom dismiss button</div>}
        >
          <Banner.Content>...</Banner.Content>
        </Banner.Provider>,
      );
      expect(
        screen.queryByLabelText("Dismiss notification"),
      ).not.toBeInTheDocument();
      expect(screen.getByText("custom dismiss button")).toBeVisible();
    });

    it("allows customizing the Banner.DismissButton", () => {
      render(
        <Banner.Provider
          type="warning"
          dismissButton={<Banner.DismissButton ariaLabel="custom label" />}
        >
          <Banner.Content>...</Banner.Content>
        </Banner.Provider>,
      );
      expect(screen.queryByLabelText("custom label")).toBeVisible();
    });

    it("allows onClick to override the default dismiss behavior", async () => {
      const onClickMock = jest.fn();
      render(
        <Banner.Provider
          type="error"
          dismissButton={<Banner.DismissButton onClick={onClickMock} />}
        >
          <Banner.Content>...</Banner.Content>
        </Banner.Provider>,
      );
      await userEvent.click(screen.getByLabelText("Dismiss notification"));
      expect(screen.queryByText("...")).toBeVisible();
      expect(onClickMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("when visibility is controlled", () => {
    it("dismiss button calls the onDismiss handler but does not dismiss the banner", async () => {
      const onDismissMock = jest.fn();
      render(
        <Banner.Provider type="error" visible={true} onDismiss={onDismissMock}>
          <Banner.Content>...</Banner.Content>
        </Banner.Provider>,
      );

      await userEvent.click(screen.getByLabelText("Dismiss notification"));
      expect(screen.getByRole("alert")).toBeVisible();
      expect(onDismissMock).toHaveBeenCalledTimes(1);
    });

    it("responds to visibility state changes", () => {
      const { rerender } = render(
        <Banner.Provider type="error" visible={false}>
          <Banner.Content>...</Banner.Content>
        </Banner.Provider>,
      );
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();

      rerender(
        <Banner.Provider type="error" visible={true}>
          <Banner.Content>...</Banner.Content>
        </Banner.Provider>,
      );
      expect(screen.getByRole("alert")).toBeVisible();

      rerender(
        <Banner.Provider type="error" visible={false}>
          <Banner.Content>...</Banner.Content>
        </Banner.Provider>,
      );
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });
});

```

## Component Path

`/components/Banner`

---

_Generated on 2025-08-21T17:35:16.353Z_
