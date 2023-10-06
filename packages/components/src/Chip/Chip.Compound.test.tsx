import React from "react";
import { render } from "@testing-library/react";
import { Chip } from "./Chip";
import styles from "./Chip.css";
import { Avatar } from "../Avatar";
import { Icon } from "../Icon";

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

  it("renders Prefix", () => {
    const { container } = render(
      <Chip.Prefix>
        <Avatar initials="" />
      </Chip.Prefix>,
    );

    expect(container.querySelector("." + styles.prefix)).toBeInTheDocument();
  });

  it("should hide prefix when passed bad child", () => {
    const { container } = render(<Chip.Prefix>Yo!</Chip.Prefix>);
    const elem = container.querySelector("." + styles.empty);
    expect(elem).toBeInTheDocument();
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
