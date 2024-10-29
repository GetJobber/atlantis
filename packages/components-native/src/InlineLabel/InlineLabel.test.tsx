import React from "react";
import { render } from "@testing-library/react-native";
import { InlineLabel } from ".";

it("renders inline label with no additional props", () => {
  const inlineLabel = render(<InlineLabel>Draft</InlineLabel>).toJSON();
  expect(inlineLabel).toMatchSnapshot();
});
it("renders inline label with size default", () => {
  const inlineLabel = render(
    <InlineLabel size="default">Draft</InlineLabel>,
  ).toJSON();
  expect(inlineLabel).toMatchSnapshot();
});

it("renders inline label with size large", () => {
  const inlineLabel = render(
    <InlineLabel size="large">Draft</InlineLabel>,
  ).toJSON();
  expect(inlineLabel).toMatchSnapshot();
});

it("renders inline label with size larger", () => {
  const inlineLabel = render(
    <InlineLabel size="larger">Draft</InlineLabel>,
  ).toJSON();
  expect(inlineLabel).toMatchSnapshot();
});

it("renders inline label with color red", () => {
  const inlineLabel = render(
    <InlineLabel color="red">Draft</InlineLabel>,
  ).toJSON();
  expect(inlineLabel).toMatchSnapshot();
});

it("renders inline label with color teal", () => {
  const inlineLabel = render(
    <InlineLabel color="teal">Draft</InlineLabel>,
  ).toJSON();
  expect(inlineLabel).toMatchSnapshot();
});

it("renders inline label with color and size", () => {
  const inlineLabel = render(
    <InlineLabel color="teal" size="large">
      Draft
    </InlineLabel>,
  ).toJSON();
  expect(inlineLabel).toMatchSnapshot();
});

it("renders inline label with capitalize transform", () => {
  const inlineLabel = render(
    <InlineLabel transform="capitalize">draft</InlineLabel>,
  ).toJSON();
  expect(inlineLabel).toMatchSnapshot();
});
