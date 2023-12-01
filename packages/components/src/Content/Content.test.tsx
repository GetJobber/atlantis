import React from "react";
import { render } from "@testing-library/react";
import { Content } from ".";

it("renders a Content", () => {
  const { queryByText } = render(<Content>Wazaaaaa</Content>);

  expect(queryByText("Wazaaaaa")).toBeInTheDocument();
});

it("renders a Content with a large spacing", () => {
  const { queryByText } = render(
    <Content spacing="large">Space me up!</Content>,
  );
  const content = queryByText("Space me up!");

  expect(content).toBeInTheDocument();
  expect(content).toHaveClass("padded large");
});

it("renders a Content with a small spacing", () => {
  const { queryByText } = render(
    <Content spacing="small">Space me down!</Content>,
  );
  const content = queryByText("Space me down!");

  expect(content).toBeInTheDocument();
  expect(content).toHaveClass("padded small");
});

it("renders with a semantic tag when a valid type is set", () => {
  const { queryByRole } = render(
    <Content type="article">
      <h2>My Article</h2>
      <p>Wow, what an article!</p>
    </Content>,
  );
  const article = queryByRole("article");

  expect(article).toBeInTheDocument();
  expect(article).toHaveClass("padded base");
});
