import { InputPhoneNumber as InputPhoneNumberRoot } from "@jobber/components";
import InputPhoneNumberContent from "@atlantis/docs/components/InputPhoneNumber/InputPhoneNumber.stories.mdx";
import { useState } from "react";
import Props from "./InputPhoneNumber.props.json";
import { ContentExport } from "../../types/content";

export const InputPhoneNumber = () => {
  const [value, setValue] = useState(undefined);

  return (
    <InputPhoneNumberRoot
      placeholder={"Enter your phone number"}
      value={value}
      onChange={setValue}
    />
  );
};

export default {
  content: () => <InputPhoneNumberContent />,
  props: Props,
  component: {
    element: InputPhoneNumber,
    defaultProps: {},
  },
  title: "InputPhoneNumber",
  code: InputPhoneNumber,
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-InputPhoneNumber-web--docs",
    },
  ],
} as const satisfies ContentExport;
