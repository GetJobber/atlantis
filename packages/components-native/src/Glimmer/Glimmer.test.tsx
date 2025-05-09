import React from "react";
import {
  act,
  fireEvent,
  render as renderComponent,
} from "@testing-library/react-native";
import { Animated } from "react-native";
import { GLIMMER_SHINE_TEST_ID, GLIMMER_TEST_ID, Glimmer } from "./Glimmer";

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

    // Spy on Animated.timing to verify the animation configuration
    const timingSpy = jest.spyOn(Animated, "timing");

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

    expect(timingSpy).toHaveBeenCalled();

    // Get the last call to timing
    const lastCall = timingSpy.mock.calls[timingSpy.mock.calls.length - 1];

    // The first argument should be the animated value
    // The second argument should be the config
    const config = lastCall[1];

    // Verify animation targets the right end position (300 + 48 = 348)
    expect(config.toValue).toBe(348);

    timingSpy.mockRestore();
    jest.useRealTimers();
  });
});
