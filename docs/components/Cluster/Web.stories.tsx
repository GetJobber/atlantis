import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Cluster } from "@jobber/components/Cluster";
import { Button } from "@jobber/components/Button";
import { Chip } from "@jobber/components/Chip";
import { InputText } from "@jobber/components/InputText";
import { FormFieldTypes } from "@jobber/components/FormField";
import { ResponsiveSwitcher } from "@jobber/components/ResponsiveSwitcher";
import { SideKick } from "@jobber/components/SideKick";
import { Stack } from "@jobber/components/Stack";
import { Icon } from "@jobber/components/Icon";
import { Box } from "@jobber/components/Box";
import { Card } from "@jobber/components/Card";

export default {
  title: "Components/Layouts and Structure/Cluster/Web",
  component: Cluster,
  parameters: {
    layout: "centered",
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Cluster>;

const BasicTemplate: ComponentStory<typeof Cluster> = args => (
  <Cluster {...args} />
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  children: (
    <>
      <Button label="Save" />
      <Button label="Cancel" type="secondary" />
      <Button label="Delete" variation="destructive" type="secondary" />
    </>
  ),
};

export const WithChips = BasicTemplate.bind({});
WithChips.args = {
  children: (
    <>
      <Chip label="Active" />
      <Chip label="High Priority" />
      <Chip label="In Progress" />
      <Chip label="Needs Review" />
    </>
  ),
};

export const CustomSpacing = BasicTemplate.bind({});
CustomSpacing.args = {
  space: "large",
  children: (
    <>
      <Chip label="Large" />
      <Chip label="Spacing" />
      <Chip label="Between" />
      <Chip label="Items" />
    </>
  ),
};

export const CustomAlignment = BasicTemplate.bind({});
CustomAlignment.args = {
  justify: "center",
  align: "center",
  children: (
    <>
      <Button label="Centered" />
      <Button label="Items" type="secondary" />
      <Button label="In Cluster" type="secondary" />
    </>
  ),
};

export const WithInputs = BasicTemplate.bind({});
WithInputs.args = {
  space: "base",
  children: (
    <ResponsiveSwitcher threshold="40rem" space="base">
      <InputText type={"text" as FormFieldTypes} placeholder="Name" />
      <InputText type={"number" as FormFieldTypes} placeholder="Quantity" />
      <InputText type={"number" as FormFieldTypes} placeholder="Unit Cost" />
      <InputText type={"number" as FormFieldTypes} placeholder="Unit Price" />
      <InputText
        type={"number" as FormFieldTypes}
        placeholder="Total"
        disabled
      />
      <Button
        icon="trash"
        ariaLabel="Delete"
        type="secondary"
        variation="subtle"
      />
    </ResponsiveSwitcher>
  ),
};

export const LineItemForm = () => (
  <Card>
    <SideKick sideWidth="200px" contentMinWidth="60%">
      <Stack space="base">
        <Cluster space="base">
          <InputText
            type={"text" as FormFieldTypes}
            placeholder="Name"
            style={{ flex: 2 }}
          />
          <InputText
            type={"number" as FormFieldTypes}
            placeholder="Quantity"
            style={{ width: "100px" }}
          />
          <InputText
            type={"number" as FormFieldTypes}
            placeholder="Unit Cost"
            style={{ width: "100px" }}
          />
          <InputText
            type={"number" as FormFieldTypes}
            placeholder="Unit Price"
            style={{ width: "100px" }}
          />
          <InputText
            type={"number" as FormFieldTypes}
            placeholder="Total"
            disabled
            style={{ width: "100px" }}
          />
          <Button
            icon="trash"
            ariaLabel="Delete line item"
            type="secondary"
            variation="subtle"
          />
        </Cluster>
        <InputText
          type={"textarea" as FormFieldTypes}
          placeholder="Description"
          multiline
          rows={4}
        />
      </Stack>
      <Box
        padding="large"
        background="surface--background--subtle"
        border="base"
        radius="base"
        height={200}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Icon name="image" size="large" color="interactive" />
      </Box>
    </SideKick>
  </Card>
);
