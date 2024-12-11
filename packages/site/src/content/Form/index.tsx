import Content from "@atlantis/docs/components/Form/Form.stories.mdx";
import Props from "./Form.props.json";
import MobileProps from "./Form.props-mobile.json";
import Notes from "./FormNotes.mdx";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  mobileProps: MobileProps,
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
    mobileElement: `<Form
      initialValues={{ firstName: "Greatest", lastName: "Ever", nickName: "" }}
      onSubmit={(value) => {
        return new Promise(function (resolve) {
          setTimeout(() => {
            resolve(alert(JSON.stringify(value, void 0)));
          }, 100);
        });
      }}
    >
      <Content>
        <InputText
          name="firstName"
          placeholder="First name"
          validations={{ required: "Please add a first name" }}
        />
        <InputText
          name="lastName"
          placeholder="Last name"
          validations={{ required: "Please add a last name" }}
        />
        <InputText
          name="nickName"
          placeholder="Nick name"
          validations={{ required: "Please add a nick name" }}
        />
      </Content>
    </Form>`,
  },
  title: "Form",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Form-web--docs",
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
