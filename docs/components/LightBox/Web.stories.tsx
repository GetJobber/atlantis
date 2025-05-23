import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button } from "@jobber/components/Button";
import { LightBox } from "@jobber/components/LightBox";

export default {
  title: "Components/Images and Icons/LightBox/Web",
  component: LightBox,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof LightBox>;

const images = [
  {
    title: "Victoria, BC, Canada",
    url: "https://images.unsplash.com/photo-1597201278257-3687be27d954?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    caption:
      "This was the view of Bushart Gardens in Victoria, BC, Canada in July from a hill.",
    alt: "Vibrant garden with colorful flowers, green bushes, and trees, arranged in neat patterns with black garden lights on lush green grass.",
  },
  {
    title: "A house",
    url: "https://images.unsplash.com/photo-1592595896616-c37162298647?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    caption: "House with a garden.",
    alt: "White brick house with dark gray roof, brown shutters, a small porch with a lantern, and a green lawn with flower beds and young trees.",
  },
  {
    url: "https://images.unsplash.com/photo-1532302780319-95689ab9d79a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
];

const BasicTemplate: ComponentStory<typeof LightBox> = args => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button label="Click me!" onClick={() => setIsOpen(true)} />
      <LightBox
        {...args}
        open={isOpen}
        onRequestClose={() => setIsOpen(false)}
      />
    </>
  );
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  images,
};
