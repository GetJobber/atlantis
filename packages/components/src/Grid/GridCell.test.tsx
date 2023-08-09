import React from "react";
import { render } from "@testing-library/react";
import { Grid } from "./Grid";

describe("GridCell", () => {
  it("should throw an error when not in a grid", () => {
    expect(() =>
      render(
        <Grid.Cell size={{ xs: 12, sm: 10, md: 8, lg: 6, xl: 4 }}>
          Even numbers baby!
        </Grid.Cell>,
      ),
    ).toThrow("`<Grid.Cell>` can only be used inside of a `<Grid>` component!");
  });
});
