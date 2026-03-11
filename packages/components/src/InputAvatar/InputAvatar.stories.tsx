import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputAvatar } from "@jobber/components/InputAvatar";
import type { FileUpload } from "@jobber/components/InputFile";

const meta = {
  title: "Components/Forms and Inputs/InputAvatar",
  component: InputAvatar,
} satisfies Meta<typeof InputAvatar>;
export default meta;
type InputAvatarStoryArgs = Pick<
  React.ComponentProps<typeof InputAvatar>,
  "imageUrl" | "getUploadParams"
>;
type Story = StoryObj<InputAvatarStoryArgs>;

const BasicTemplate = (args: Story["args"]) => {
  const [avatarUrl, setAvatarUrl] = useState(args?.imageUrl);

  return (
    <InputAvatar
      imageUrl={avatarUrl}
      getUploadParams={
        args?.getUploadParams ??
        (() => Promise.resolve({ url: "https://httpbin.org/post" }))
      }
      onChange={handleChange}
    />
  );

  async function handleChange(newAvatar?: FileUpload) {
    if (newAvatar) {
      setAvatarUrl(await newAvatar.src());
    } else {
      setAvatarUrl(undefined);
    }
  }
};

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    imageUrl: "https://picsum.photos/250",
    getUploadParams: () => Promise.resolve({ url: "https://httpbin.org/post" }),
  },
};
