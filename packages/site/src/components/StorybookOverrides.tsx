import { RenderComponentShowCode } from "./RenderComponentShowCode";
/**
 * These are to Override uses within Storybook.
 *
 * If a component in an MDX file on the Storybook side is giving you issues, this is where you override it.
 *
 * You can either hide it like Meta/Story/ArgsTable, or you can replace it with a custom component.
 *
 * @returns
 */
export const Meta = () => null;

export const Story = ({
  children,
}: {
  children: React.ReactNode | (() => React.ReactNode);
}) => {
  if (typeof children === "function") {
    return children();
  }

  return children;
};
export const ArgsTable = () => null;
export const Source = () => null;

/**
 * Drop-in Replacement for the Figma component from Storybook. Just embeds the Figma document using their embed API.
 * @param param0 url to Figma document
 * @returns
 */
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
