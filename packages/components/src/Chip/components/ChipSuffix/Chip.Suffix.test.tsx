import React from "react";
import { render } from "@testing-library/react";
import { Chip } from "../../Chip";
import styles from "../../Chip.css";
import { Avatar } from "../../../Avatar";
import { Icon } from "../../../Icon";

describe("Chip Compound Components", () => {
  it("renders Suffix", () => {
    const { container } = render(
      <Chip.Suffix>
        <Avatar initials="" />
      </Chip.Suffix>,
    );

    expect(container.querySelector("." + styles.suffix)).toBeInTheDocument();
  });

  it("suffix renders only one valid child", () => {
    const { container } = render(
      <Chip.Suffix>
        <Icon name="cross" />
        <Icon name="cross" />
      </Chip.Suffix>,
    );
    expect(container.querySelectorAll("svg")).toHaveLength(1);
  });

  it("should hide suffix when passed bad child", () => {
    const { container } = render(<Chip.Suffix>Yo!</Chip.Suffix>);
    const elem = container.querySelector("." + styles.empty);
    expect(elem).toBeInTheDocument();
  });
});
