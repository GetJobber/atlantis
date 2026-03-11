import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
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

const meta = {
  title: "Components/Lists and Tables/Table",
  component: Table,
  subcomponents: { Cell, CellCurrency, CellNumeric },
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<Record<string, never>>;

export const Basic: Story = {
  render: () => (
    <Table>
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
  ),
};
