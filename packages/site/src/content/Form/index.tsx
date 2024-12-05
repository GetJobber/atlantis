import Content from "@atlantis/docs/components/Form/Form.stories.mdx";
import Props from "./Form.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `const [{ isDirty, isValid }, setFormState] = useFormState();
  const [first, setFirst] = useState("");

  return (
    <Form
      onSubmit={() => alert("Submitted 🎉🎉🎉")}
      onStateChange={setFormState}
    >
      <Content>
        <InputText
          placeholder="First Name"
          name="firstName"
          value={first}
          onChange={(value) => setFirst(value)}
          validations={{
            required: {
              value: true,
              message: "Tell us your name",
            },
            minLength: {
              value: 3,
              message: "Your name is too short.",
            },
          }}
        />
        <InputText
          placeholder="Last Name"
          name="lastName"
          validations={{
            required: {
              value: true,
              message: "Tell us your last name.",
            },
          }}
        />
        <Button
          label="Submit Form"
          submit={true}
          disabled={!isDirty || !isValid}
        />
      </Content>
    </Form>
)`,
    defaultProps: {},
  },
  title: "Form",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Form-web--docs",
    },
  ],
} as const satisfies ContentExport;
