import React from "react";
import { render } from "@testing-library/react-native";
import { StatusLabel } from "./StatusLabel";

describe("StatusLabel", () => {
  describe("alignment", () => {
    describe('when alignment prop set to default ("start")', () => {
      it("should match snapshot", () => {
        const view = render(<StatusLabel text="Start Aligned" />).toJSON();
        expect(view).toMatchSnapshot();
      });
    });

    describe('when alignment prop set to "end"', () => {
      it("should match snapshot", () => {
        const view = render(
          <StatusLabel text="End Aligned" alignment="end" />,
        ).toJSON();
        expect(view).toMatchSnapshot();
      });
    });
  });

  describe("status", () => {
    describe('when status prop set to default ("success")', () => {
      it("should match snapshot", () => {
        const view = render(<StatusLabel text="Success" />).toJSON();
        expect(view).toMatchSnapshot();
      });
    });

    describe('when status prop set to "warning"', () => {
      it("should match snapshot", () => {
        const view = render(
          <StatusLabel text="Warning" status="warning" />,
        ).toJSON();
        expect(view).toMatchSnapshot();
      });
    });

    describe('when status prop set to "critical"', () => {
      it("should match snapshot", () => {
        const view = render(
          <StatusLabel text="Critical" status="critical" />,
        ).toJSON();
        expect(view).toMatchSnapshot();
      });
    });

    describe('when status prop set to "inactive"', () => {
      it("should match snapshot", () => {
        const view = render(
          <StatusLabel text="Inactive" status="inactive" />,
        ).toJSON();
        expect(view).toMatchSnapshot();
      });
    });

    describe('when status prop set to "informative"', () => {
      it("should match snapshot", () => {
        const view = render(
          <StatusLabel text="Informative" status="informative" />,
        ).toJSON();
        expect(view).toMatchSnapshot();
      });
    });
  });
});
