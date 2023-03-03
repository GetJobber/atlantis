import { render } from "@testing-library/react";
import React from "react";
import {
  Body,
  Cell,
  CellCurrency,
  CellNumeric,
  Footer,
  Header,
  Row,
  Table,
} from ".";

it("renders a table", () => {
  const { container } = render(
    <Table>
      <Header>
        <Cell>Ship</Cell>
        <Cell>Class</Cell>
        <Cell>Cost</Cell>
        <Cell>Crew</Cell>
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
    </Table>,
  );
  expect(container).toMatchSnapshot();
});
