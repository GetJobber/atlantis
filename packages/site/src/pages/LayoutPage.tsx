import { Cover, Heading, SideKick, Square, Stack } from "@jobber/components";

export const LayoutPage = () => {
  return (
    <SideKick onRight>
      <Square borderWidth="0">
        <Cover minHeight="100vh">
          <Square borderWidth="0px">
            <Heading level={1}>Heading1!</Heading>
          </Square>
        </Cover>
      </Square>
      <Square padding="12px" borderWidth="0">
        <Stack space="12px">
          <Square borderWidth="0px">
            <Heading level={1}>Heading1!</Heading>
          </Square>
          <Square borderWidth="0px">
            <Heading level={1}>Heading1!</Heading>
          </Square>
        </Stack>
      </Square>
    </SideKick>
  );
};
