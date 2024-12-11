import Content from "@atlantis/docs/components/Table/Table.stories.mdx";
import Props from "./Table.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<Table>
      <Header>
        <Cell>Ship</Cell>
        <Cell>Class</Cell>
        <Cell align="right">Cost</Cell>
        <Cell align="right">Crew</Cell>
      </Header>
      <Body>
        <Row>
          <Cell>Nostromo</Cell>
          <Cell>Towing Vehicle</Cell>
          <CellCurrency value={42000000} />
          <CellNumeric value={7} />
        </Row>
        <Row>
          <Cell>Rodger Young</Cell>
          <Cell>Corvette Transport</Cell>
          <Cell />
          <CellNumeric value={200} />
        </Row>
        <Row>
          <Cell>USS Enterprise</Cell>
          <Cell>Constitution</Cell>
          <Cell />
          <CellNumeric value={205} />
        </Row>
      </Body>
      <Footer>
        <Cell />
        <Cell />
        <Cell />
        <CellNumeric value={412} />
      </Footer>
    </Table>`,
    defaultProps: {},
  },
  title: "Table",
  links: [
    {
      label: "Storybook",
      url: `${
        (window as AtlantisWindow)?.env?.VITE_STORYBOOK_URL
      }?path=/docs/components-lists-and-tables-table--docs`,
    },
  ],
} as const satisfies ContentExport;
