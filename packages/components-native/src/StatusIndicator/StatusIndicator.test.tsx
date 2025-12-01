import React from "react";
import { render } from "@testing-library/react-native";
import { StatusIndicator } from "./StatusIndicator";

describe("StatusIndicator", () => {
  describe("status", () => {
    describe('when status prop set to default ("success")', () => {
      it("should match snapshot", () => {
        const view = render(<StatusIndicator status="success" />).toJSON();
        expect(view).toMatchSnapshot();
      });
    });

    describe('when status prop set to "warning"', () => {
      it("should match snapshot", () => {
        const view = render(<StatusIndicator status="warning" />).toJSON();
        expect(view).toMatchSnapshot();
      });
    });

    describe('when status prop set to "critical"', () => {
      it("should match snapshot", () => {
        const view = render(<StatusIndicator status="critical" />).toJSON();
        expect(view).toMatchSnapshot();
      });
    });

    describe('when status prop set to "inactive"', () => {
      it("should match snapshot", () => {
        const view = render(<StatusIndicator status="inactive" />).toJSON();
        expect(view).toMatchSnapshot();
      });
    });

    describe('when status prop set to "informative"', () => {
      it("should match snapshot", () => {
        const view = render(<StatusIndicator status="informative" />).toJSON();
        expect(view).toMatchSnapshot();
      });
    });
  });
});
