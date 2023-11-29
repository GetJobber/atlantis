import React from "react";
import { render } from "@testing-library/react-native";
import { Divider } from "./Divider";
import { styles } from "./Divider.style";

const dividerTestId = "Divider";

describe("Divider", () => {
  it("renders a default Divider", () => {
    const { getByTestId } = render(<Divider />);
    const dividerStyle = getByTestId(dividerTestId).props.style;
    expect(dividerStyle).toContainEqual(styles.base);
    expect(dividerStyle).not.toContainEqual(styles.large);
    expect(dividerStyle).not.toContainEqual(styles.largest);
  });

  it("renders a large Divider", () => {
    const { getByTestId } = render(<Divider size="large" />);
    const dividerStyle = getByTestId(dividerTestId).props.style;
    expect(dividerStyle).toContainEqual(styles.base);
    expect(dividerStyle).toContainEqual(styles.large);
    expect(dividerStyle).not.toContainEqual(styles.largest);
  });

  it("renders a largest Divider", () => {
    const { getByTestId } = render(<Divider size="largest" />);
    const dividerStyle = getByTestId(dividerTestId).props.style;
    expect(dividerStyle).toContainEqual(styles.base);
    expect(dividerStyle).not.toContainEqual(styles.large);
    expect(dividerStyle).toContainEqual(styles.largest);
  });
});
