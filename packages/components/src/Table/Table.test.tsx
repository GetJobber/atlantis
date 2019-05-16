import React from "react";
import renderer from "react-test-renderer";
import { Cell, CellCurrency, CellNumeric, Footer, Header, Row, Table } from ".";

it("renders a table", () => {
  const tree = renderer
    .create(
      <Table>
        <Header>
          <Cell>Ship</Cell>
          <Cell>Class</Cell>
          <Cell>Cost</Cell>
          <Cell>Crew</Cell>
        </Header>
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
        <Footer>
          <Cell />
          <Cell />
          <Cell />
          <CellNumeric value={412} />
        </Footer>
      </Table>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
