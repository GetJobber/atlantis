import React, { CSSProperties, useEffect, useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button } from "@jobber/components/Button";
import { LightBox } from "@jobber/components/LightBox";
import { Box } from "@jobber/components/Box";

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
  const [boxSizing, setBoxSizing] = useState<CSSProperties["boxSizing"]>();

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--public-lightbox-box-sizing",
      boxSizing ?? "inherit",
    );
  }, [boxSizing]);

  return (
    <Box direction="column" gap="base">
      <Button label="Click me!" onClick={() => setIsOpen(true)} />
      <Button
        label="Set Box Sizing to Border Box"
        onClick={() => setBoxSizing("border-box")}
      />
      <Button
        label="Set Box Sizing to Content Box"
        onClick={() => setBoxSizing("content-box")}
      />
      <Button
        label="Set Box Sizing to Inherit"
        onClick={() => setBoxSizing("inherit")}
      />
      <Button
        label="Set Box Sizing to Initial"
        onClick={() => setBoxSizing("initial")}
      />
      <Button
        label="Set Box Sizing to Unset"
        onClick={() => setBoxSizing("unset")}
      />
      <LightBox
        {...args}
        open={isOpen}
        onRequestClose={() => setIsOpen(false)}
      />
    </Box>
  );
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  images,
};
