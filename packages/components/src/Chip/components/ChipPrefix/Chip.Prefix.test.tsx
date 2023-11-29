import React from "react";
import { render } from "@testing-library/react";
import { Chip } from "../../Chip";
import { Avatar } from "../../../Avatar";
import { Icon } from "../../../Icon";

describe("Chip.Prefix Component", () => {
  it("renders Prefix", () => {
    const { getByText } = render(
      <Chip.Prefix>
        <Avatar initials="DT" />
      </Chip.Prefix>,
    );

    expect(getByText("DT")).toBeInTheDocument();
  });

  it("should hide prefix when passed bad child", () => {
    const { queryByText } = render(<Chip.Prefix>Hello!</Chip.Prefix>);
    expect(queryByText("Hello!")).not.toBeInTheDocument();
  });

  it("prefix renders only one valid child", () => {
    const { container } = render(
      <Chip.Prefix>
        <Icon name="cross" />
        <Icon name="cross" />
      </Chip.Prefix>,
    );
    expect(container.querySelectorAll("svg")).toHaveLength(1);
  });
});
