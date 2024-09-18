import React from "react";
import { render, screen } from "@testing-library/react";
import { Chip } from "../../Chip";
import { Avatar } from "../../../Avatar";
import { Icon } from "../../../Icon";

describe("Chip.Prefix Component", () => {
  it("renders Prefix", () => {
    render(
      <Chip.Prefix>
        <Avatar initials="DT" />
      </Chip.Prefix>,
    );

    expect(screen.getByText("DT")).toBeInTheDocument();
  });

  it("should show all children when icon or avatar isn't provided", () => {
    render(
      <Chip.Prefix>
        <p>First child</p>
        <p>Second child</p>
      </Chip.Prefix>,
    );
    expect(screen.getByText("First child")).toBeInTheDocument();
    expect(screen.getByText("Second child")).toBeInTheDocument();
  });

  it("prefix renders only one valid child", () => {
    render(
      <Chip.Prefix>
        <Icon name="cross" />
        <Icon name="cross" />
      </Chip.Prefix>,
    );
    expect(screen.getAllByTestId("cross")).toHaveLength(1);
  });
});
