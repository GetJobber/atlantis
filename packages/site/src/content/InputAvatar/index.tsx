import Content from "@atlantis/docs/components/InputAvatar/InputAvatar.stories.mdx";
import Props from "./InputAvatar.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `const [avatarUrl, setAvatarUrl] = useState("https://picsum.photos/250");

return (
    <InputAvatar
      imageUrl={"https://picsum.photos/250"}
      getUploadParams={function getUploadParams() {
        return Promise.resolve({ url: "https://httpbin.org/post" });
      }}
      imageUrl={avatarUrl}
      onChange={handleChange}
    />
)

async function handleChange(newAvatar: unknown) {
    if (newAvatar) {
      setAvatarUrl(await newAvatar.src());
    } else {
      setAvatarUrl(undefined);
    }
}`,
    defaultProps: {},
  },
  title: "InputAvatar",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-forms-and-inputs-inputavatar--docs`,
      ),
    },
  ],
} as const satisfies ContentExport;
