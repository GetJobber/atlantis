import React, { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { InputAvatar } from "@jobber/components/InputAvatar";

export default {
  title: "Components/Forms and Inputs/InputAvatar/Web",
  component: InputAvatar,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as Meta<typeof InputAvatar>;

const BasicTemplate: StoryFn<typeof InputAvatar> = args => {
  const [avatarUrl, setAvatarUrl] = useState(args.imageUrl);

  return <InputAvatar {...args} imageUrl={avatarUrl} onChange={handleChange} />;

  async function handleChange(newAvatar: unknown) {
    if (newAvatar) {
      setAvatarUrl(await newAvatar.src());
    } else {
      setAvatarUrl(undefined);
    }
  }
};

export const Basic = {
  render: BasicTemplate,
  args: {
    imageUrl: "https://picsum.photos/250",
    getUploadParams: () => Promise.resolve({ url: "https://httpbin.org/post" }),
  },
};
