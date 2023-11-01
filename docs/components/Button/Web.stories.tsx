import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Button } from "@jobber/components/Button";
import { Form } from "@jobber/components/Form";
import { InputNumber } from "@jobber/components/InputNumber";
import { Content } from "@jobber/components/Content";

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

const AnimatedTemplate: ComponentStory<typeof Button> = () => {
  const [switchedArrows, setSwitchedArrows] = useState(false);
  const [switchedChecked, setSwitchedChecked] = useState(false);
  const [switchedShow, setSwitchedShow] = useState(false);
  const [switchedMenu, setSwitchedMenu] = useState(false);

  return (
    <Content>
      <div>
        <Button
          label={switchedArrows ? "Expand" : "Collapse"}
          icon={switchedArrows ? "arrowDown" : "arrowUp"}
          type="secondary"
          onClick={() => setSwitchedArrows(!switchedArrows)}
        />
      </div>
      <div>
        <Button
          label={switchedChecked ? "Added" : "Add"}
          icon={switchedChecked ? "checkmark" : "add"}
          type="secondary"
          onClick={() => setSwitchedChecked(!switchedChecked)}
        />
      </div>
      <div>
        <Button
          icon={switchedMenu ? "backArrow" : "menu"}
          ariaLabel="Menu"
          type="secondary"
          onClick={() => setSwitchedMenu(!switchedMenu)}
        />{" "}
        <Button
          label={switchedShow ? "Show" : "Hide"}
          type="secondary"
          onClick={() => setSwitchedShow(!switchedShow)}
        />
      </div>
    </Content>
  );
};

export const Animated = AnimatedTemplate.bind({});

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

export const FormSubmit = FormTemplate.bind({});
