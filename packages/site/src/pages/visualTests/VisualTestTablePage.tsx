import {
  Body,
  Cell,
  CellCurrency,
  CellNumeric,
  Header,
  Row,
  Table,
} from "@jobber/components";

export const VisualTestTablePage = () => {
  return (
    <>
      {/* Basic Table */}
      <Table>
        <Header>
          <Cell>Header 1</Cell>
          <Cell>Header 2</Cell>
          <Cell>Header 3</Cell>
        </Header>
        <Body>
          <Row>
            <Cell>Row 1, Cell 1</Cell>
            <Cell>Row 1, Cell 2</Cell>
            <Cell>Row 1, Cell 3</Cell>
          </Row>
          <Row>
            <Cell>Row 2, Cell 1</Cell>
            <Cell>Row 2, Cell 2</Cell>
            <Cell>Row 2, Cell 3</Cell>
          </Row>
        </Body>
      </Table>

      {/* Table with Numeric and Currency Values */}
      <Table>
        <Header>
          <Cell>Item</Cell>
          <Cell>Quantity</Cell>
          <Cell>Price</Cell>
        </Header>
        <Body>
          <Row>
            <Cell>Item 1</Cell>
            <CellNumeric value={100} />
            <CellCurrency value={50.0} />
          </Row>
          <Row>
            <Cell>Item 2</Cell>
            <CellNumeric value={200} />
            <CellCurrency value={75.0} />
          </Row>
        </Body>
      </Table>

      {/* Table with Long Content */}
      <Table>
        <Header>
          <Cell>Description</Cell>
          <Cell>Status</Cell>
        </Header>
        <Body>
          <Row>
            <Cell>
              This is a very long description that might wrap to multiple lines
              in the table cell to test how the table handles long content
            </Cell>
            <Cell>Active</Cell>
          </Row>
          <Row>
            <Cell>
              Another long description to ensure consistent behavior across
              multiple rows with varying content lengths
            </Cell>
            <Cell>Inactive</Cell>
          </Row>
        </Body>
      </Table>
    </>
  );
};
