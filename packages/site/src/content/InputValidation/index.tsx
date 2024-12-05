import Content from "@atlantis/docs/components/InputValidation/InputValidation.stories.mdx";
import Props from "./InputValidation.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `const [validationMessages, setValidationMessages] = useState("");

  return (
    <>
      <Text>
        My name is
        <InputText
          validations={{
            required: {
              value: true,
              message: "Please tell me your name",
            },
            pattern: {
              value: /Jeff/,
              message: "Have you considered a better name, like Jeff?",
            },
          }}
          onValidation={(message) => setValidationMessages(message)}
          size="small"
          inline={true}
          maxLength={4}
        />
      </Text>
      {validationMessages && <InputValidation message={validationMessages} />}
    </>
  );`,
    defaultProps: {},
  },
  title: "InputValidation",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-InputValidation-web--docs",
    },
  ],
} as const satisfies ContentExport;
