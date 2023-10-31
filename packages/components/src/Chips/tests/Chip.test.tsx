import React from "react";
import { render } from "@testing-library/react";
import { Chip } from "..";

it("should throw error when not wrapped inside `<Chips>`", () => {
  expect(() => render(<Chip value={""} label={""} />)).toThrow(
    "`<Chip>` component can only be used inside `<Chips>`",
  );
});
