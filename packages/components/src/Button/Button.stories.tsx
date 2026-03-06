import type { CSSProperties, ComponentPropsWithoutRef } from "react";
import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import classnames from "classnames";
import { fn } from "storybook/test";
import type {
  ButtonFoundationProps,
  ButtonProps,
  ButtonType,
  ButtonVariation,
  ButtonWithChildrenProps,
} from "@jobber/components/Button";
import { Button, useButtonStyles } from "@jobber/components/Button";
import type { InlineLabelColors } from "@jobber/components/InlineLabel";
import { InlineLabel } from "@jobber/components/InlineLabel";
import { StatusLabel } from "@jobber/components/StatusLabel";
import type { StatusIndicatorType } from "@jobber/components/StatusIndicator";
import { Form } from "@jobber/components/Form";
import { InputNumber } from "@jobber/components/InputNumber";
import { Content } from "@jobber/components/Content";
import { Grid } from "@jobber/components/Grid";
import { Heading } from "@jobber/components/Heading";
import styles from "./ButtonStories.module.css";
import { Stack } from "../Stack";

const meta = {
  title: "Components/Actions/Button",
  component: Button,
  args: {
    label: "New Job",
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    type: "primary",
  },
};

const RoutingTemplate = () => (
  <Router basename="/components/button">
    <Button label="Home" to="/" />
    <Button label="Office" to="/office" />
    <Button label="Dentist" to="/dentist" />
    <hr />
    <Switch>
      <Route exact path="/">
        This is my home, time to get cozy.
      </Route>
      <Route exact path="/office">
        This is my office, time to get to work.
      </Route>
      <Route exact path="/dentist">
        This is the dentist, time to get my teeth fixed.
      </Route>
    </Switch>
  </Router>
);

export const ClientSideRouting: Story = {
  render: RoutingTemplate,
};

const FormTemplate = () => (
  <Form onSubmit={() => alert("Wow, what a number")}>
    <Content>
      <InputNumber placeholder="Pick a number" />
      <Button label="Submit" submit={true} />
    </Content>
  </Form>
);

const ComparisonTemplate = () => {
  const [type, setType] = useState<ButtonType>("primary");
  const [variation, setVariation] = useState<ButtonVariation>("work");

  return (
    <Grid>
      <Grid.Cell size={{ xs: 3 }}>
        <Button label="Set type primary" onClick={() => setType("primary")} />
      </Grid.Cell>
      <Grid.Cell size={{ xs: 3 }}>
        <Button
          label="Set type secondary"
          onClick={() => setType("secondary")}
        />
      </Grid.Cell>
      <Grid.Cell size={{ xs: 3 }}>
        <Button label="Set type tertiary" onClick={() => setType("tertiary")} />
      </Grid.Cell>
      <Grid.Cell size={{ xs: 3 }}></Grid.Cell>
      <Grid.Cell size={{ xs: 3 }}>
        <Button
          label="Set variation work"
          onClick={() => setVariation("work")}
        />
      </Grid.Cell>
      <Grid.Cell size={{ xs: 3 }}>
        <Button
          label="Set variation learning"
          onClick={() => setVariation("learning")}
        />
      </Grid.Cell>
      <Grid.Cell size={{ xs: 3 }}>
        <Button
          label="Set variation subtle"
          onClick={() => setVariation("subtle")}
        />
      </Grid.Cell>
      <Grid.Cell size={{ xs: 3 }}>
        <Button
          label="Set variation destructive"
          onClick={() => setVariation("destructive")}
        />
      </Grid.Cell>
      <Grid.Cell size={{ xs: 6 }}>
        <Heading level={3}>Non-composed</Heading>
      </Grid.Cell>
      <Grid.Cell size={{ xs: 6 }}>
        <Heading level={3}>Composed</Heading>
      </Grid.Cell>
      <Grid.Cell size={{ xs: 6 }}>
        <Button
          label={`${type} ${variation} Button`}
          type={type}
          variation={variation}
        />
      </Grid.Cell>
      <Grid.Cell size={{ xs: 6 }}>
        <Button type={type} variation={variation}>
          <Button.Label>{`${type} ${variation} Button`}</Button.Label>
        </Button>
      </Grid.Cell>
      <Grid.Cell size={{ xs: 6 }}>
        <Button
          label={`${type} ${variation} with Icon`}
          type={type}
          variation={variation}
          icon="add"
        />
      </Grid.Cell>
      <Grid.Cell size={{ xs: 6 }}>
        <Button type={type} variation={variation}>
          <Button.Icon name="add" />
          <Button.Label>{`${type} ${variation} with Icon`}</Button.Label>
        </Button>
      </Grid.Cell>
      <Grid.Cell size={{ xs: 6 }}>
        <Button
          label={`${type} ${variation} with Right Icon`}
          type={type}
          variation={variation}
          icon="arrowRight"
          iconOnRight={true}
        />
      </Grid.Cell>
      <Grid.Cell size={{ xs: 6 }}>
        <Button type={type} variation={variation}>
          <Button.Label>{`${type} ${variation} with Right Icon`}</Button.Label>
          <Button.Icon name="arrowRight" />
        </Button>
      </Grid.Cell>
      <Grid.Cell size={{ xs: 6 }}>
        <Button
          icon="cog"
          ariaLabel="Settings"
          type={type}
          variation={variation}
        />
      </Grid.Cell>
      <Grid.Cell size={{ xs: 6 }}>
        <Button type={type} variation={variation}>
          <Button.Icon name="cog" />
        </Button>
      </Grid.Cell>
      <Grid.Cell size={{ xs: 6 }}>
        <Button
          label={`${type} ${variation} Small Button`}
          type={type}
          variation={variation}
          size="small"
        />
      </Grid.Cell>
      <Grid.Cell size={{ xs: 6 }}>
        <Button type={type} variation={variation} size="small">
          <Button.Label>{`${type} ${variation} Small Button`}</Button.Label>
        </Button>
      </Grid.Cell>
      <Grid.Cell size={{ xs: 6 }}>
        <Button
          label={`${type} ${variation} Base Button`}
          type={type}
          variation={variation}
          size="base"
        />
      </Grid.Cell>
      <Grid.Cell size={{ xs: 6 }}>
        <Button type={type} variation={variation} size="base">
          <Button.Label>{`${type} ${variation} Base Button`}</Button.Label>
        </Button>
      </Grid.Cell>
      <Grid.Cell size={{ xs: 6 }}>
        <Button
          label={`${type} ${variation} Large Button`}
          type={type}
          variation={variation}
          size="large"
        />
      </Grid.Cell>

      <Grid.Cell size={{ xs: 6 }}>
        <Button type={type} variation={variation} size="large">
          <Button.Label>{`${type} ${variation} Large Button`}</Button.Label>
        </Button>
      </Grid.Cell>
      <Grid.Cell size={{ xs: 6 }}>
        <Button
          label={`${type} ${variation} Loading Button`}
          type={type}
          variation={variation}
          loading={true}
        />
      </Grid.Cell>
      <Grid.Cell size={{ xs: 6 }}>
        <Button type={type} variation={variation} loading={true}>
          <Button.Label>{`${type} ${variation} Loading Button`}</Button.Label>
        </Button>
      </Grid.Cell>
      <Grid.Cell size={{ xs: 6 }}>
        <Button
          label={`${type} ${variation} Disabled Button`}
          type={type}
          variation={variation}
          disabled={true}
        />
      </Grid.Cell>
      <Grid.Cell size={{ xs: 6 }}>
        <Button type={type} variation={variation} disabled={true}>
          <Button.Label>{`${type} ${variation} Disabled Button`}</Button.Label>
        </Button>
      </Grid.Cell>
      <Grid.Cell size={{ xs: 6 }}>
        <Button
          label={`${type} ${variation} Combined Small Props`}
          type={type}
          variation={variation}
          icon="note"
          size="small"
        />
      </Grid.Cell>
      <Grid.Cell size={{ xs: 6 }}>
        <Button type={type} variation={variation} size="small">
          <Button.Icon name="note" />
          <Button.Label>{`${type} ${variation} Combined Small Props`}</Button.Label>
        </Button>
      </Grid.Cell>
      <Grid.Cell size={{ xs: 6 }}>
        <Button
          label={`${type} ${variation} Combined Small Props on Right`}
          type={type}
          iconOnRight={true}
          variation={variation}
          icon="note"
          size="small"
        />
      </Grid.Cell>
      <Grid.Cell size={{ xs: 6 }}>
        <Button type={type} variation={variation} size="small">
          <Button.Label>{`${type} ${variation} Combined Small Props on Right`}</Button.Label>
          <Button.Icon name="note" />
        </Button>
      </Grid.Cell>
      <Grid.Cell size={{ xs: 6 }}>
        <Button
          label={`${type} ${variation} Combined Large Props`}
          type={type}
          variation={variation}
          icon="note"
          size="large"
        />
      </Grid.Cell>
      <Grid.Cell size={{ xs: 6 }}>
        <Button type={type} variation={variation} size="large">
          <Button.Icon name="note" />
          <Button.Label>{`${type} ${variation} Combined Large Props`}</Button.Label>
        </Button>
      </Grid.Cell>
      <Grid.Cell size={{ xs: 6 }}>
        <Button
          label={`${type} ${variation} Combined Large Props on Right`}
          type={type}
          variation={variation}
          icon="note"
          size="large"
          iconOnRight={true}
        />
      </Grid.Cell>
      <Grid.Cell size={{ xs: 6 }}>
        <Button type={type} variation={variation} size="large">
          <Button.Label>{`${type} ${variation} Combined Large Props on Right`}</Button.Label>
          <Button.Icon name="note" />
        </Button>
      </Grid.Cell>
    </Grid>
  );
};

const ComposedLinksTemplate = () => {
  const buttonStyles = useButtonStyles({});

  return (
    <Router basename="/components/composed-links">
      <Link
        to="/"
        className={classnames(buttonStyles.wrapper, buttonStyles.children)}
      >
        <Button.Label>Home</Button.Label>
        <Button.Icon name="home" />
      </Link>
      <Link
        to="/office"
        className={classnames(buttonStyles.wrapper, buttonStyles.children)}
      >
        <Button.Label>Office</Button.Label>
        <Button.Icon name="address" />
      </Link>
      <Link
        to="/dentist"
        className={classnames(buttonStyles.wrapper, buttonStyles.children)}
      >
        <Button.Label>Dentist</Button.Label>
      </Link>
      <hr />
      <Switch>
        <Route exact path="/">
          This is my home, time to get cozy.
        </Route>
        <Route exact path="/office">
          This is my office, time to get to work.
        </Route>
        <Route exact path="/dentist">
          This is the dentist, time to get my teeth fixed.
        </Route>
      </Switch>
    </Router>
  );
};

export const ComposedLinks: Story = {
  render: ComposedLinksTemplate,
};

export const Comparison: Story = {
  render: ComparisonTemplate,
};

export const FormSubmit: Story = {
  render: FormTemplate,
};

/**
 * Factory function to create a styled button
 */
function createStyledButton<TVariation extends string | ButtonVariation>({
  colors,
  className,
}: {
  colors?: ButtonColors;
  className?: string;
}) {
  const StyledButton = ({
    variation,
    ...props
  }: StyledButtonProps<TVariation>) => {
    if (isButtonVariation(variation)) {
      return <Button {...(props as ButtonProps)} />;
    } else {
      return (
        <Button
          {...(props as ButtonProps)}
          UNSAFE_style={{
            container: {
              backgroundColor: colors?.surface,
            },
          }}
          UNSAFE_className={{
            container: className,
          }}
        />
      );
    }
  };
  StyledButton.Label = Button.Label;
  StyledButton.Icon = Button.Icon;

  return StyledButton;
}

/**
 * The button colors needed for custom styled buttons
 */
interface ButtonColors {
  surface: string;
  surfaceHover: string;
  primaryLabel: string;
  variationColor: string;
  variationColorHover: string;
}

/**
 * The props for a styled button
 */
interface StyledButtonProps<TVariation extends string | ButtonVariation>
  extends Omit<ButtonWithChildrenProps, "variation"> {
  readonly variation: TVariation;
}

function isButtonVariation(variation: string): variation is ButtonVariation {
  return ["work", "learning", "subtle", "destructive"].includes(variation);
}

const TestStyledButton = createStyledButton<"franchise">({
  className: styles.franchiseStyledButton,
});

const StyledButtonTemplate = () => {
  return (
    <Stack gap="large">
      <TestStyledButton variation="franchise">
        <TestStyledButton.Label>Test</TestStyledButton.Label>
        <TestStyledButton.Icon name="add" />
      </TestStyledButton>
      <TestStyledButton variation="franchise" type="secondary">
        <TestStyledButton.Label>Test</TestStyledButton.Label>
        <TestStyledButton.Icon name="add" />
      </TestStyledButton>
      <TestStyledButton variation="franchise" type="tertiary">
        <TestStyledButton.Label>Test</TestStyledButton.Label>
        <TestStyledButton.Icon name="add" />
      </TestStyledButton>
    </Stack>
  );
};

export const StyledButton: Story = {
  render: StyledButtonTemplate,
};

/**
 * Factory function to create a styled status label (e.g. for franchise status)
 */
function createStyledStatusLabel<TStatus extends string | StatusIndicatorType>({
  className,
}: {
  className: string;
}) {
  const StyledStatusLabel = ({
    status,
    ...props
  }: Omit<ComponentPropsWithoutRef<typeof StatusLabel>, "status"> & {
    readonly status: TStatus;
  }) => {
    if (isStatusIndicatorType(status)) {
      return <StatusLabel {...props} status={status} />;
    }

    return (
      <div className={className}>
        <StatusLabel {...props} status="informative" />
      </div>
    );
  };

  return StyledStatusLabel;
}

function isStatusIndicatorType(status: string): status is StatusIndicatorType {
  return ["success", "warning", "critical", "inactive", "informative"].includes(
    status,
  );
}

const StyledStatusLabel = createStyledStatusLabel<
  "franchise" | StatusIndicatorType
>({
  className: styles.franchiseStatusLabel,
});

const StyledStatusLabelTemplate = () => (
  <Stack gap="large">
    <StyledStatusLabel label="Franchise location" status="franchise" />
    <StyledStatusLabel label="Regular status" status="success" />
  </Stack>
);

export const StyledStatusLabelStory: Story = {
  render: StyledStatusLabelTemplate,
};

/**
 * Factory function to create a styled inline label (e.g. for franchise)
 */
function createStyledInlineLabel<TColor extends string | InlineLabelColors>({
  className,
}: {
  className: string;
}) {
  const StyledInlineLabel = ({
    color,
    ...props
  }: Omit<ComponentPropsWithoutRef<typeof InlineLabel>, "color"> & {
    readonly color?: TColor;
  }) => {
    if (color === undefined || isInlineLabelColor(color)) {
      return <InlineLabel {...props} color={color} />;
    }

    return (
      <span className={className}>
        <InlineLabel {...props} color="purple" />
      </span>
    );
  };

  return StyledInlineLabel;
}

function isInlineLabelColor(color: string): color is InlineLabelColors {
  return [
    "greyBlue",
    "red",
    "orange",
    "green",
    "blue",
    "yellow",
    "lime",
    "purple",
    "pink",
    "teal",
    "yellowGreen",
    "blueDark",
    "lightBlue",
    "indigo",
  ].includes(color);
}

const StyledInlineLabel = createStyledInlineLabel<
  "franchise" | InlineLabelColors
>({
  className: styles.franchiseInlineLabel,
});

const StyledInlineLabelTemplate = () => (
  <Stack gap="large">
    <StyledInlineLabel color="franchise">Franchise</StyledInlineLabel>
    <StyledInlineLabel color="green">Regular green</StyledInlineLabel>
  </Stack>
);

export const StyledInlineLabelStory: Story = {
  render: StyledInlineLabelTemplate,
};
