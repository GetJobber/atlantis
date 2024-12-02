import InputAvatarContent from "@atlantis/docs/components/InputAvatar/InputAvatar.stories.mdx";
import Props from "./InputAvatar.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <InputAvatarContent />,
  props: Props,
  component: {
    element: `
      const [avatarUrl, setAvatarUrl] = useState("https://picsum.photos/250");

      async function handleChange(newAvatar) {
        if (newAvatar) {
          setAvatarUrl(await newAvatar.src());
        } else {
          setAvatarUrl(undefined);
        }
      }

      return (
        <InputAvatar
          imageUrl={avatarUrl}
          getUploadParams={() => Promise.resolve({ url: "https://httpbin.org/post" })}
          onChange={handleChange}
        />
      );
    `,
  },
  title: "InputAvatar",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-InputAvatar-web--docs",
    },
  ],
} as const satisfies ContentExport;
