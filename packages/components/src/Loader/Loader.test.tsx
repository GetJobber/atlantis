import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Loader } from ".";

afterEach(cleanup);

describe("<Loader />", () => {
  describe("when loading", () => {
    describe("when determinate", () => {
      it("renders a Loader", () => {
        const { container } = render(
          <Loader loading determinate currentValue={0}>
            Loading
          </Loader>,
        );
        expect(container).toMatchSnapshot();
      });

      it("indicates to assistive technology that content is changing", () => {
        const { container } = render(
          <Loader loading determinate currentValue={0}>
            Loading
          </Loader>,
        );
        const loaderWithAccessibilityIndicators = container.querySelector(
          "[aria-busy=true][aria-live='polite']",
        );
        expect(loaderWithAccessibilityIndicators).toBeDefined();
      });

      it("renders children within the Loader", () => {
        const { queryByText } = render(
          <Loader loading determinate={true} currentValue={50}>
            I am a child!
          </Loader>,
        );
        const element = queryByText("I am a child!");
        expect(element).toBeInTheDocument();
      });

      it("indicates the loading progress", () => {
        const { container } = render(
          <Loader loading determinate currentValue={50}>
            Loading
          </Loader>,
        );
        const element = container.querySelector(
          "progress",
        ) as HTMLProgressElement;
        expect(element.value).toBe(50);
      });
    });

    describe("when not determinate", () => {
      it("renders a Loader", () => {
        const { container } = render(
          <Loader loading determinate={false}>
            Loading
          </Loader>,
        );
        expect(container).toMatchSnapshot();
      });

      it("renders children within the Loader", () => {
        const { queryByText } = render(
          <Loader loading determinate={false}>
            I am a child!
          </Loader>,
        );
        const element = queryByText("I am a child!");
        expect(element).toBeInTheDocument();
      });

      it("indicates to assistive technology that content is changing", () => {
        const { container } = render(
          <Loader loading determinate={false}>
            Loading
          </Loader>,
        );
        const loaderWithAccessibilityIndicators = container.querySelector(
          "[aria-busy=true][aria-live='polite']",
        );
        expect(loaderWithAccessibilityIndicators).toBeDefined();
      });
    });
  });

  describe("when not loading", () => {
    describe("when determinate", () => {
      it("renders a Loader", () => {
        const { container } = render(
          <Loader loading={false} determinate currentValue={0}>
            Loading
          </Loader>,
        );
        expect(container).toMatchSnapshot();
      });

      it("no indication to assistive tech that content is changing", () => {
        const { container } = render(
          <Loader loading={false} determinate currentValue={0}>
            Loading
          </Loader>,
        );
        const loaderWithAccessibilityIndicators = container.querySelector(
          "[aria-busy=true][aria-live='polite']",
        );
        expect(loaderWithAccessibilityIndicators).toBeNull();
      });

      it("renders children", () => {
        const { queryByText } = render(
          <Loader loading={false} determinate={false}>
            <p>I am a child!</p>
          </Loader>,
        );
        const element = queryByText("I am a child!");
        expect(element).toBeInTheDocument();
      });

      it("doesn't indicates the loading progress", () => {
        const { container, rerender } = render(
          <Loader loading={true} determinate currentValue={50}>
            Loading
          </Loader>,
        );
        const element = container.querySelector("progress");
        expect(element).toBeInTheDocument();
        rerender(
          <Loader loading={false} determinate currentValue={50}>
            Loading
          </Loader>,
        );
        expect(element).not.toBeInTheDocument();
      });
    });

    describe("when not determinate", () => {
      it("renders a Loader", () => {
        const { container } = render(
          <Loader loading={false} determinate={false}>
            Loading
          </Loader>,
        );
        expect(container).toMatchSnapshot();
      });

      it("renders children", () => {
        const { queryByText } = render(
          <Loader loading={false} determinate={false}>
            <p>I am a child!</p>
          </Loader>,
        );
        const element = queryByText("I am a child!");
        expect(element).toBeInTheDocument();
      });

      it("no indication to assistive tech that content is changing", () => {
        const { container } = render(
          <Loader loading={false} determinate={false}>
            Loading
          </Loader>,
        );
        const loaderWithAccessibilityIndicators = container.querySelector(
          "[aria-busy=true][aria-live='polite']",
        );
        expect(loaderWithAccessibilityIndicators).toBeNull();
      });
    });
  });
});
