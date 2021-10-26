import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Chip } from "..";

afterEach(cleanup);

it("should throw error when not wrapped inside `<Chips>`", () => {
  expect(() => render(<Chip value={""} label={""} />)).toThrow(
    "`<Chip>` component can only be used inside `<Chips>`",
  );
});
