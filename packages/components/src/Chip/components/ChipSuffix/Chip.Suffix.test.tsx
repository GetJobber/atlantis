import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Chip } from "../../Chip";
import styles from "../../Chip.module.css";
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

  describe("when onClick prop is passed", () => {
    it("should call onClick when suffix is clicked", async () => {
      const onClick = jest.fn();
      const { getByTestId } = render(
        <Chip.Suffix onClick={onClick} testID="ATL-Chip-Suffix">
          <Icon name="cross" />
        </Chip.Suffix>,
      );

      await userEvent.click(getByTestId("ATL-Chip-Suffix"));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("should call onClick when suffix is keypressed", async () => {
      const onClick = jest.fn();
      render(
        <Chip.Suffix onClick={onClick} testID="ATL-Chip-Suffix">
          <Icon name="cross" />
        </Chip.Suffix>,
      );

      await userEvent.tab();
      await userEvent.keyboard("{enter}");
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("renders a testID", () => {
      const onClick = jest.fn();
      const { getByTestId } = render(
        <Chip.Suffix onClick={onClick} testID="ATL-Chip-Suffix">
          <Icon name="cross" />
        </Chip.Suffix>,
      );

      expect(getByTestId("ATL-Chip-Suffix")).toBeInTheDocument();
    });

    it("applies accessible and semantic attributes", () => {
      const onClick = jest.fn();
      const { getByTestId } = render(
        <Chip.Suffix
          onClick={onClick}
          ariaLabel="dismiss"
          testID="ATL-Chip-Suffix"
        >
          <Icon name="cross" />
        </Chip.Suffix>,
      );

      const chipSuffix = getByTestId("ATL-Chip-Suffix");
      expect(chipSuffix).toHaveAttribute("aria-label", "dismiss");
      expect(chipSuffix).toHaveAttribute("role", "button");
    });

    it("should apply the correct styles", () => {
      const onClick = jest.fn();
      const { getByTestId } = render(
        <Chip.Suffix onClick={onClick} testID="ATL-Chip-Suffix">
          <Icon name="cross" />
        </Chip.Suffix>,
      );

      const suffix = getByTestId("ATL-Chip-Suffix");
      expect(suffix).toHaveClass(styles.clickableSuffix);
      expect(suffix).not.toHaveClass(styles.suffix);
    });
  });
});
