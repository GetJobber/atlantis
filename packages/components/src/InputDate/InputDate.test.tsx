import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { InputDate } from ".";

afterEach(cleanup);

it("returns the right value when you click a date", () => {
  const { getByTestId, getByText } = render(
    <InputDate selected={new Date()} onChange={changeHandler} />,
  );
});
