import { Cover, Heading, Rectangle, SideKick, Stack } from "@jobber/components";

export const LayoutPage = () => {
  return (
    <SideKick onRight>
      <Rectangle borderWidth="0">
        <Cover minHeight="100vh">
          <Rectangle borderWidth="0px">
            <Heading level={1}>Heading1!</Heading>
          </Rectangle>
        </Cover>
      </Rectangle>
      <Rectangle padding="12px" borderWidth="0">
        <Stack space="12px">
          <Rectangle borderWidth="0px">
            <Heading level={1}>Heading1!</Heading>
          </Rectangle>
          <Rectangle borderWidth="0px">
            <Heading level={1}>Heading1!</Heading>
          </Rectangle>
        </Stack>
      </Rectangle>
    </SideKick>
  );
};
