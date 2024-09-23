import { RenderComponentShowCode } from "./RenderComponentShowCode";

export const Meta = () => <></>;
export const Story = () => <></>;
export const ArgsTable = () => <></>;

export const Figma = ({
  url,
}: {
  readonly url: string;
  readonly collapsable: boolean;
}) => {
  return (
    <iframe
      width="800"
      height="450"
      src={`https://www.figma.com/embed?embed_host=share&url=${url}`}
      allowFullScreen
    ></iframe>
  );
};
export const Canvas = RenderComponentShowCode;
