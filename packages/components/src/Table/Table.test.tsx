import React from "react";
import renderer from "react-test-renderer";
import { Table, Header, Footer, Row, Cell } from "./";

it("renders a table", () => {
  const tree = renderer
    .create(
      <Table>
        <Header>
          <Cell>Ship</Cell>
          <Cell>Class</Cell>
          <Cell>Crew</Cell>
        </Header>
        <Row>
          <Cell>Nostromo</Cell>
          <Cell>Towing Vehicle</Cell>
          <Cell>7</Cell>
        </Row>
        <Row>
          <Cell>Rodger Young</Cell>
          <Cell>Corvette Transport</Cell>
          <Cell>200</Cell>
        </Row>
        <Row>
          <Cell>USS Enterprise</Cell>
          <Cell>Constitution</Cell>
          <Cell>205</Cell>
        </Row>
        <Footer>
          <Cell />
          <Cell />
          <Cell>412</Cell>
        </Footer>
      </Table>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
