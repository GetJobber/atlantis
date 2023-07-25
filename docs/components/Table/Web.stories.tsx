import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  Body,
  Cell,
  CellCurrency,
  CellNumeric,
  Footer,
  Header,
  Row,
  Table,
} from "@jobber/components/Table";

export default {
  title: "Components/Lists and Tables/Table/Web",
  component: Table,
  subcomponents: { Cell, CellCurrency, CellNumeric },
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
        extraImports: {
          "@jobber/components/Table": [
            "Table",
            "Header",
            "Cell",
            "Body",
            "Row",
            "CellCurrency",
            "CellNumeric",
            "Footer",
          ],
        },
      },
    },
  },
} as ComponentMeta<typeof Table>;

const BasicTemplate: ComponentStory<typeof Table> = args => (
  <Table {...args}>
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
  </Table>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {};
