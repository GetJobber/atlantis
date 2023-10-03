import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputAvatar } from "@jobber/components/InputAvatar";

export default {
  title: "Components/Forms and Inputs/InputAvatar/Web",
  component: InputAvatar,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof InputAvatar>;

const BasicTemplate: ComponentStory<typeof InputAvatar> = args => {
  const [avatarUrl, setAvatarUrl] = useState(args.imageUrl);
  return <InputAvatar {...args} imageUrl={avatarUrl} onChange={handleChange} />;
  async function handleChange(newAvatar: any) {
    if (newAvatar) {
      setAvatarUrl(await newAvatar.src());
    } else {
      setAvatarUrl(undefined);
    }
  }
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  imageUrl: "https://picsum.photos/250",
  getUploadParams: () => Promise.resolve({ url: "https://httpbin.org/post" }),
};
