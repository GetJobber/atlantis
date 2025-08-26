import Content from "@atlantis/docs/components/Grid/Grid.stories.mdx";
import Props from "./Grid.props.json";
import Notes from "./GridNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <Grid gap={true}>
        <Grid.Cell
          size={{
            xs: 1,
          }}
        >
          <Box background={"base-blue--500"} height={220} width={36} radius={"base"}></Box>
        </Grid.Cell>
        <Grid.Cell
          size={{
            xs: 1,
          }}
        >
          <Box background={"base-blue--500"} height={220} width={36} radius={"base"}></Box>
        </Grid.Cell>
        <Grid.Cell
          size={{
            xs: 1,
          }}
        >
          <Box background={"base-blue--500"} height={220} width={36} radius={"base"}></Box>
        </Grid.Cell>
        <Grid.Cell
          size={{
            xs: 1,
          }}
        >
          <Box background={"base-blue--500"} height={220} width={36} radius={"base"}></Box>
        </Grid.Cell>
        <Grid.Cell
          size={{
            xs: 1,
          }}
        >
          <Box background={"base-blue--500"} height={220} width={36} radius={"base"}></Box>
        </Grid.Cell>
        <Grid.Cell
          size={{
            xs: 1,
          }}
        >
          <Box background={"base-blue--500"} height={220} width={36} radius={"base"}></Box>
        </Grid.Cell>
        <Grid.Cell
          size={{
            xs: 1,
          }}
        >
          <Box background={"base-blue--500"} height={220} width={36} radius={"base"}></Box>
        </Grid.Cell>
        <Grid.Cell
          size={{
            xs: 1,
          }}
        >
          <Box background={"base-blue--500"} height={220} width={36} radius={"base"}></Box>
        </Grid.Cell>
        <Grid.Cell
          size={{
            xs: 1,
          }}
        >
          <Box background={"base-blue--500"} height={220} width={36} radius={"base"}></Box>
        </Grid.Cell>
        <Grid.Cell
          size={{
            xs: 1,
          }}
        >
          <Box background={"base-blue--500"} height={220} width={36} radius={"base"}></Box>
        </Grid.Cell>
        <Grid.Cell
          size={{
            xs: 1,
          }}
        >
          <Box background={"base-blue--500"} height={220} width={36} radius={"base"}></Box>
        </Grid.Cell>
        <Grid.Cell
          size={{
            xs: 1,
          }}
        >
          <Box background={"base-blue--500"} height={220} width={36} radius={"base"}></Box>
        </Grid.Cell>
      </Grid>
    </div>`,
  },
  title: "Grid",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-layouts-and-structure-grid--docs`,
      ),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
