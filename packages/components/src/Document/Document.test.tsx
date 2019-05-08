import React from "react";
import renderer from "react-test-renderer";
import { IconName } from "../Icon";
import {
  Document,
  Title,
  Header,
  Detail,
  Content,
  DecoratedIcon,
  StatusLabel,
} from "./Document";

it("renders", () => {
  const tree = renderer
    .create(
      <Document accentColor="purple">
        <Title>
          <DecoratedIcon iconName={IconName.invoice} />
          <StatusLabel status="pending" />

          <h3>Invoice #1</h3>
        </Title>

        <Header>
          <h2>This is the exceptionally long document header.</h2>
        </Header>

        <Detail>
          <h4>Invoice details</h4>
        </Detail>

        <Content>
          <p>This is the document content.</p>
        </Content>
      </Document>,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="document purple"
    >
      <div
        className="title"
      >
        <span
          className="iconDecorator"
        >
          <div
            className="invoice icon"
          />
        </span>
        <span
          className="statusWrapper"
        >
          <span
            className="inlineLabel normal yellow"
          >
            pending
          </span>
        </span>
        <h3>
          Invoice #1
        </h3>
      </div>
      <header
        className="header"
      >
        <h2>
          This is the exceptionally long document header.
        </h2>
      </header>
      <div
        className="detail"
      >
        <h4>
          Invoice details
        </h4>
      </div>
      <div
        className="content"
      >
        <p>
          This is the document content.
        </p>
      </div>
    </div>
  `);
});
