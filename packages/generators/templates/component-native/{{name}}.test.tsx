import React from "react";
import {  render } from "@testing-library/react-native";

it("renders a {{name}}", () => {
  const { getByText } = render(< {{ name }} text = "Foo" />);
  expect(getByText("Foo")).toBeTruthy();
});
