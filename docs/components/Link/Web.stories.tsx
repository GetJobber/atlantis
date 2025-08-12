import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Link } from "@jobber/components/Link";
import { Content } from "@jobber/components/Content";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";

export default {
  title: "Components/Text and Typography/Link/Web",
  component: Link,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Link>;

const BasicTemplate: ComponentStory<typeof Link> = args => (
  <Link {...args}>What is a Link anyway?</Link>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  url: "https://en.wikipedia.org/wiki/Hyperlink",
  external: true,
};

const ButtonStyleTemplate: ComponentStory<typeof Link> = args => (
  <Content>
    <Heading level={3}>Link with Button Styling</Heading>
    <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
      <Link {...args} type="primary">
        Primary Link
      </Link>
      <Link {...args} type="secondary">
        Secondary Link
      </Link>
      <Link {...args} type="tertiary">
        Tertiary Link
      </Link>
    </div>
    
    <Heading level={3}>Variations</Heading>
    <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
      <Link {...args} variation="work">
        Work
      </Link>
      <Link {...args} variation="learning">
        Learning
      </Link>
      <Link {...args} variation="subtle">
        Subtle
      </Link>
      <Link {...args} variation="destructive">
        Destructive
      </Link>
    </div>
    
    <Heading level={3}>Sizes</Heading>
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Link {...args} size="small">
        Small
      </Link>
      <Link {...args} size="base">
        Base
      </Link>
      <Link {...args} size="large">
        Large
      </Link>
    </div>
  </Content>
);

export const ButtonStyled = ButtonStyleTemplate.bind({});
ButtonStyled.args = {
  url: "#",
  type: "primary",
  variation: "work",
  size: "base",
};

const WithIconsTemplate: ComponentStory<typeof Link> = () => (
  <Content>
    <Heading level={3}>Links with Icons</Heading>
    <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
      <Link url="#" icon="add" type="primary">
        Add Item
      </Link>
      <Link url="#" icon="edit" type="secondary">
        Edit
      </Link>
      <Link url="#" icon="trash" type="tertiary" variation="destructive">
        Delete
      </Link>
    </div>
    
    <Heading level={3}>Icon Positioning</Heading>
    <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
      <Link url="#" icon="arrowRight" iconOnRight type="primary">
        Next Page
      </Link>
      <Link url="#" icon="arrowLeft" type="primary">
        Previous Page
      </Link>
    </div>
    
    <Heading level={3}>Icon Only</Heading>
    <div style={{ display: "flex", gap: "1rem" }}>
      <Link url="#" icon="dashboard" type="primary" ariaLabel="Dashboard" />
      <Link url="#" icon="settings" type="secondary" ariaLabel="Settings" />
      <Link url="#" icon="help" type="tertiary" ariaLabel="Help" />
    </div>
  </Content>
);

export const WithIcons = WithIconsTemplate.bind({});

const StatesTemplate: ComponentStory<typeof Link> = () => (
  <Content>
    <Heading level={3}>Link States</Heading>
    <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
      <Link url="#" type="primary">
        Normal
      </Link>
      <Link url="#" type="primary" disabled>
        Disabled
      </Link>
      <Link url="#" type="primary" loading>
        Loading
      </Link>
    </div>
    
    <Heading level={3}>Full Width</Heading>
    <div style={{ width: "300px" }}>
      <Link url="#" type="primary" fullWidth>
        Full Width Link
      </Link>
    </div>
  </Content>
);

export const States = StatesTemplate.bind({});

const ClientSideRoutingTemplate: ComponentStory<typeof Link> = () => (
  <Router basename="/components/link">
    <Content>
      <Heading level={3}>Navigation Links</Heading>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <Link url="/" type="primary">
          Home
        </Link>
        <Link url="/office" type="secondary">
          Office
        </Link>
        <Link url="/dentist" type="tertiary" variation="destructive">
          Dentist
        </Link>
      </div>
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
    </Content>
  </Router>
);

export const ClientSideRouting = ClientSideRoutingTemplate.bind({});
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

const MigrationGuideTemplate: ComponentStory<typeof Link> = () => (
  <Content>
    <Heading level={2}>Migration Guide: Button to Link</Heading>
    <Text>
      If you were previously using Button with the 'to' prop for navigation,
      you should now use the enhanced Link component with button styling.
    </Text>
    
    <Heading level={3}>Before (Deprecated)</Heading>
    <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px" }}>
      {`<Button label="Go to Dashboard" to="/dashboard" />`}
    </pre>
    
    <Heading level={3}>After (Recommended)</Heading>
    <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px" }}>
      {`<Link url="/dashboard" type="primary">
  Go to Dashboard
</Link>`}
    </pre>
    
    <Heading level={3}>Examples</Heading>
    <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
      <Link url="/dashboard" type="primary">
        Primary Navigation
      </Link>
      <Link url="/settings" type="secondary" icon="settings">
        Settings
      </Link>
      <Link url="/logout" type="tertiary" variation="destructive">
        Logout
      </Link>
    </div>
  </Content>
);

export const MigrationGuide = MigrationGuideTemplate.bind({});