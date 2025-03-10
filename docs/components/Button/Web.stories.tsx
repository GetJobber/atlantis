import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import classnames from "classnames";
import {
  Button,
  ButtonType,
  ButtonVariation,
  useButtonStyles,
} from "@jobber/components/Button";
import { Form } from "@jobber/components/Form";
import { InputNumber } from "@jobber/components/InputNumber";
import { Content } from "@jobber/components/Content";
import { Grid } from "@jobber/components/Grid";
import { Heading } from "@jobber/components/Heading";

export default {
  title: "Components/Actions/Button/Web",
  component: Button,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
  decorators: [
    // Workaround Storybook's wrapping flex parent that make everything full width
    story => <div>{story()}</div>,
  ],
} as ComponentMeta<typeof Button>;

const BasicTemplate: ComponentStory<typeof Button> = args => (
  <Button {...args} />
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  label: "New Job",
  onClick: () => alert("👍"),
};

const RoutingTemplate: ComponentStory<typeof Button> = () => (
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

export const ClientSideRouting = RoutingTemplate.bind({});
ClientSideRouting.parameters = {
  previewTabs: {
    code: {
      hidden: false,
      extraImports: {
        "react-router-dom": [
          "Route",
          { name: "BrowserRouter", alias: "Router" },
          "Switch",
        ],
      },
    },
  },
};

const FormTemplate: ComponentStory<typeof Button> = () => (
  <Form onSubmit={() => alert("Wow, what a number")}>
    <Content>
      <InputNumber placeholder="Pick a number" />
      <Button label="Submit" submit={true} />
    </Content>
  </Form>
);

const ComparisonTemplate: ComponentStory<typeof Button> = () => {
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
          <Button.Icon icon="add" />
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
          <Button.Icon icon="arrowRight" />
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
          <Button.Icon icon="cog" />
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
          <Button.Icon icon="note" />
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
          <Button.Icon icon="note" />
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
          <Button.Icon icon="note" />
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
          <Button.Icon icon="note" />
        </Button>
      </Grid.Cell>
    </Grid>
  );
};

const ComposedLinksTemplate: ComponentStory<typeof Button> = () => {
  const { buttonWrapperStyles, buttonChildrenStyles } = useButtonStyles({});

  return (
    <Router basename="/components/composed-links">
      <Link
        to="/"
        className={classnames(buttonWrapperStyles, buttonChildrenStyles)}
      >
        <Button.Label>Home</Button.Label>
        <Button.Icon icon="home" />
      </Link>
      <Link
        to="/office"
        className={classnames(buttonWrapperStyles, buttonChildrenStyles)}
      >
        <Button.Label>Office</Button.Label>
        <Button.Icon icon="address" />
      </Link>
      <Link
        to="/dentist"
        className={classnames(buttonWrapperStyles, buttonChildrenStyles)}
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

export const ComposedLinks = ComposedLinksTemplate.bind({});
ComposedLinks.parameters = {
  previewTabs: {
    code: {
      hidden: false,
      extraImports: {
        "react-router-dom": [
          "Route",
          { name: "BrowserRouter", alias: "Router" },
          "Switch",
        ],
        "@jobber/components/Button": ["useButtonStyles"],
      },
    },
  },
};

export const Comparison = ComparisonTemplate.bind({});
Comparison.parameters = {
  docs: {
    description: {
      story:
        "Comparison between Button and ButtonComposed components with various props.",
    },
  },
};

export const FormSubmit = FormTemplate.bind({});
