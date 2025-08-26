import Content from "@atlantis/docs/components/DataTable/DataTable.stories.mdx";
import Props from "./DataTable.props.json";
import Notes from "./DataTableNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<DataTable
      data={[
        {
          name: "Eddard",
          house: "Stark",
          region: "North",
          sigil: "Direwolf",
          isAlive: "No",
        },
        {
          name: "Catelyn",
          house: "Stark",
          region: "North",
          sigil: "Direwolf",
          isAlive: "No",
        },
        {
          name: "Jon Snow",
          house: "Stark",
          region: "North",
          sigil: "Direwolf",
          isAlive: "Yes",
        },
        {
          name: "Robert",
          house: "Stark",
          region: "North",
          sigil: "Direwolf",
          isAlive: "No",
        },
        {
          name: "Rickon",
          house: "Stark",
          region: "North",
          sigil: "Direwolf",
          isAlive: "No",
        },
        {
          name: "Robert",
          house: "Baratheon",
          region: "Stormlands",
          sigil: "Black Stag",
          isAlive: "No",
        },
        {
          name: "Cercei",
          house: "Lannister",
          region: "Westerlands",
          sigil: "Golden Lion",
          isAlive: "Yes",
        },
        {
          name: "Sansa",
          house: "Stark",
          region: "North",
          sigil: "Direwolf",
          isAlive: "Yes",
        },
        {
          name: "Arya",
          house: "Stark",
          region: "North",
          sigil: "Direwolf",
          isAlive: "Yes",
        },
        {
          name: "Bran",
          house: "Stark",
          region: "North",
          sigil: "Direwolf",
          isAlive: "Yes",
        },
        {
          name: "Joffrey",
          house: "Baratheon",
          region: "Stormlands",
          sigil: "Black Stag",
          isAlive: "No",
        },
        {
          name: "Myrcella",
          house: "Baratheon",
          region: "Stormlands",
          sigil: "Black Stag",
          isAlive: "Yes",
        },
        {
          name: "Tommen",
          house: "Baratheon",
          region: "Stormlands",
          sigil: "Black Stag",
          isAlive: "Yes",
        },
      ]}
      columns={[
        { accessorKey: "name" },
        { accessorKey: "house" },
        { accessorKey: "region" },
        { accessorKey: "sigil" },
        { accessorKey: "isAlive" },
      ]}
    />`,
  },
  title: "DataTable",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-lists-and-tables-datatable--docs`,
      ),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
