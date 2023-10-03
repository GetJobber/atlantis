import React from "react";
import { cleanup, render } from "@testing-library/react-native";

afterEach(cleanup);


it("renders a {{name}}", () => {
  const { getByText } = render(< {{ name }} text = "Foo" />);
  expect(getByText("Foo")).toBeTruthy();
});
