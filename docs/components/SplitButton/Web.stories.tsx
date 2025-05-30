import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SplitButton } from "@jobber/components/SplitButton";
import { Button } from "@jobber/components/Button";
import { Menu } from "@jobber/components/Menu";

export default {
  title: "Components/Actions/SplitButton/Web",
  component: SplitButton,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof SplitButton>;

const Template: ComponentStory<typeof SplitButton> = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-base)",
    }}
  >
    <SplitButton>
      <Button
        label="Save"
        onClick={() => alert("Save clicked")}
        type="primary"
        variation="work"
      />
      <Button
        label="Secondary"
        onClick={() => alert("Secondary clicked")}
        type="primary"
        variation="work"
      />
      <Menu
        activator={
          <Button
            icon="arrowUp"
            ariaLabel="More options"
            type="primary"
            variation="work"
          />
        }
        items={[
          {
            header: "Save Options",
            actions: [
              {
                label: "Save as Draft",
                icon: "note",
                onClick: () => alert("Saved as draft!"),
              },
              {
                label: "Save and Exit",
                icon: "arrowRight",
                onClick: () => alert("Saved and exited!"),
              },
              {
                label: "Save and New",
                icon: "add",
                onClick: () => alert("Saved and started new!"),
              },
            ],
          },
        ]}
      />
    </SplitButton>

    <SplitButton>
      <Button
        label="One"
        onClick={() => alert("One clicked")}
        type="primary"
        variation="work"
      />
      <Button
        label="Two"
        onClick={() => alert("Two clicked")}
        type="primary"
        variation="work"
      />
      <Button
        label="Three"
        onClick={() => alert("Three clicked")}
        type="primary"
        variation="work"
      />
    </SplitButton>

    <SplitButton>
      <Menu
        activator={
          <Button
            icon="arrowUp"
            ariaLabel="More options"
            type="primary"
            variation="work"
          />
        }
        items={[
          {
            header: "Save Options",
            actions: [
              {
                label: "Save as Draft",
                icon: "note",
                onClick: () => alert("Saved as draft!"),
              },
              {
                label: "Save and Exit",
                icon: "arrowRight",
                onClick: () => alert("Saved and exited!"),
              },
              {
                label: "Save and New",
                icon: "add",
                onClick: () => alert("Saved and started new!"),
              },
            ],
          },
        ]}
      />
      <Button
        label="Save"
        onClick={() => alert("Save clicked")}
        type="primary"
        variation="work"
      />
      <Button
        label="Secondary"
        onClick={() => alert("Secondary clicked")}
        type="primary"
        variation="work"
      />
    </SplitButton>
  </div>
);

export const Basic = Template.bind({});
Basic.args = {};
