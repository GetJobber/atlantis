import React from "react";
import { render } from "@testing-library/react";
import { Chip } from "../../Chip";
import styles from "../../Chip.css";
import { Avatar } from "../../../Avatar";
import { Icon } from "../../../Icon";

describe("Chip Suffix", () => {
  it("renders suffix", () => {
    const { container } = render(
      <Chip.Suffix>
        <Avatar initials="" />
      </Chip.Suffix>,
    );

    expect(container.querySelector("." + styles.suffix)).toBeInTheDocument();
  });

  it("renders only one valid child", () => {
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

  it("renders suffix as button element when onClick is passed", () => {
    const { container } = render(
      <Chip.Suffix onClick={jest.fn()}>
        <Icon name="cross" />
      </Chip.Suffix>,
    );

    expect(container.querySelector("button")).toBeInTheDocument();
  });

  it("renders suffix as a span element when onClick is not passed", () => {
    const { container } = render(
      <Chip.Suffix>
        <Icon name="cross" />
      </Chip.Suffix>,
    );

    expect(container.querySelector("span")).toBeInTheDocument();
    expect(container.querySelector("button")).not.toBeInTheDocument();
  });

  it("should call onClick when suffix is clicked when onClick is passed", () => {
    const onClick = jest.fn();
    const { container } = render(
      <Chip.Suffix onClick={onClick}>
        <Icon name="cross" />
      </Chip.Suffix>,
    );

    container.querySelector("button")?.click();
    expect(onClick).toHaveBeenCalled();
  });
});
