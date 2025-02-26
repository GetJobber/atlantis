import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Button } from "@jobber/components/Button";
import { Form } from "@jobber/components/Form";
import { InputNumber } from "@jobber/components/InputNumber";
import { Content } from "@jobber/components/Content";
import { ButtonComposed } from "@jobber/components/ButtonComposed";

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

const ComparisonTemplate: ComponentStory<typeof Button> = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "16px",
      maxWidth: "800px",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        alignItems: "center",
      }}
    >
      <h3>Button</h3>
      <Button label="DefaultDefaultDefaultDefaultDefaultDefaultDefaultDefaultDefault" />
      <Button label="Primary" variation="work" />
      <Button label="Secondary" variation="learning" />
      <Button label="Destructive" variation="destructive" />
      <Button label="Subtle" variation="subtle" />
      <Button icon="add" ariaLabel="Add" />
      {/* @ts-expect-error asfdsa */}
      <ButtonComposed>
        <ButtonComposed.Icon icon="add" size="base" />
      </ButtonComposed>
      <Button label="With Icon" icon="add" />
      {/* @ts-expect-error asfdsa */}
      <ButtonComposed>
        <ButtonComposed.Icon icon="add" size="base" />
        <ButtonComposed.Label>With Icon</ButtonComposed.Label>
        <ButtonComposed.Icon icon="alert" size="base" />
      </ButtonComposed>
      <Button label="With Icon" icon="add" iconOnRight={true} />
      {/* @ts-expect-error asfdsa */}
      <ButtonComposed>
        <ButtonComposed.Label>With Icon</ButtonComposed.Label>
        <ButtonComposed.Icon icon="add" size="base" />
      </ButtonComposed>
      <Button label="Loading" loading={true} />
      <Button label="Disabled" disabled={true} />
      <Button label="SmallSmallSmallSmallSmallSmallSmall" size="small" />
      <Button label="LargeLargeLargeLargeLarge" size="large" />
      <Button label="Full Width" fullWidth={true} icon="add" />
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        alignItems: "center",
      }}
    >
      <h3>ButtonComposed</h3>
      <ButtonComposed label="DefaultDefaultDefaultDefaultDefaultDefaultDefaultDefaultDefault" />
      <ButtonComposed label="Primary" variation="work" />
      <ButtonComposed label="Secondary" variation="learning" />
      <ButtonComposed label="Destructive" variation="destructive" />
      <ButtonComposed label="Subtle" variation="subtle" />
      <ButtonComposed icon="add" ariaLabel="Add" />

      <ButtonComposed label="Loading" loading={true} />
      <ButtonComposed label="Disabled" disabled={true} />
      <ButtonComposed
        label="SmallSmallSmallSmallSmallSmallSmall"
        size="small"
      />
      <ButtonComposed label="LargeLargeLargeLargeLarge" size="large" />
      <ButtonComposed label="Full Width" fullWidth={true} icon="add" />
    </div>
  </div>
);

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
