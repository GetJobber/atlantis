import React from "react";
import {
  act,
  fireEvent,
  render as renderComponent,
} from "@testing-library/react-native";
import { GLIMMER_SHINE_TEST_ID, GLIMMER_TEST_ID, Glimmer } from "./Glimmer";
import { tokens } from "../utils/design";

let screen: ReturnType<typeof renderComponent<typeof Glimmer>>;

function render<T>(...params: Parameters<typeof renderComponent<T>>) {
  screen = renderComponent(...params);

  return screen;
}

describe("Glimmer", () => {
  it("renders a Glimmer with default styling", () => {
    render(<Glimmer />);
    const element = screen.getByTestId(GLIMMER_TEST_ID);

    expect(element.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ height: 16 }),
        expect.objectContaining({ width: "100%" }),
      ]),
    );
  });

  it("renders a Glimmer with custom width", () => {
    render(<Glimmer width={50} />);
    const element = screen.getByTestId(GLIMMER_TEST_ID);

    expect(element.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ width: 50 })]),
    );
  });

  it("renders a Glimmer with custom percent width", () => {
    render(<Glimmer width="50%" />);
    const element = screen.getByTestId(GLIMMER_TEST_ID);

    expect(element.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ width: "50%" })]),
    );
  });

  it("renders sets the correct width", () => {
    jest.useFakeTimers();
    render(<Glimmer />);

    act(() => {
      fireEvent(screen.getByTestId(GLIMMER_TEST_ID), "onLayout", {
        nativeEvent: { layout: { width: 300 } },
      });
    });

    const element = screen.getByTestId(GLIMMER_SHINE_TEST_ID);

    expect(element.props.style).toEqual(
      expect.objectContaining({ transform: [{ translateX: -48 }] }),
    );

    jest.advanceTimersByTime(tokens["timing-loading--extended"]);

    expect(element.props.style).toEqual(
      expect.objectContaining({ transform: [{ translateX: 348 }] }),
    );

    jest.useRealTimers();
  });
});
