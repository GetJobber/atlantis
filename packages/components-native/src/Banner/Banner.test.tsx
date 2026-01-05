import React from "react";
import { render } from "@testing-library/react-native";
import { Banner } from ".";
import { Text } from "../Text";
import { TextList } from "../TextList";

describe("Banner", () => {
  describe("Type", () => {
    it("renders an error Banner", () => {
      const { getByText, getByTestId } = render(
        <Banner type="error" text="An error happened" />,
      );

      const icon = getByTestId("ATL-Banner-Icon");
      expect(getByText("An error happened")).toBeDefined();
      expect(icon.props.children.props.name).toBe("alert");
    });

    it("renders a warning Banner", () => {
      const { getByText, getByTestId } = render(
        <Banner type="warning" text="Here is a warning" />,
      );

      const icon = getByTestId("ATL-Banner-Icon");
      expect(getByText("Here is a warning")).toBeDefined();
      expect(icon.props.children.props.name).toBe("help");
    });

    it("renders a notice Banner", () => {
      const { getByText, getByTestId } = render(
        <Banner type="notice" text="Notice me" />,
      );

      const icon = getByTestId("ATL-Banner-Icon");
      expect(getByText("Notice me")).toBeDefined();
      expect(icon.props.children.props.name).toBe("starburst");
    });

    it("renders a success Banner", () => {
      const { getByText, getByTestId } = render(
        <Banner type="success">
          <Text>Your import is complete</Text>
        </Banner>,
      );

      const icon = getByTestId("ATL-Banner-Icon");
      expect(getByText("Your import is complete")).toBeDefined();
      expect(icon.props.children.props.name).toBe("checkmark");
    });
  });

  describe("Children", () => {
    describe("should flow", () => {
      it("renders using RNText when there is a text prop", () => {
        const { getByText, queryByTestId } = render(
          <Banner type="notice" text="Notice me" />,
        );

        expect(getByText("Notice me")).toBeDefined();
        expect(queryByTestId("ATL-Banner-RNText")).toBeDefined();
      });
      it("renders using RNText when there is a Text element", () => {
        const { getByText, queryByTestId } = render(
          <Banner type="notice">
            <Text>Notice me</Text>
          </Banner>,
        );

        expect(getByText("Notice me")).toBeDefined();
        expect(queryByTestId("ATL-Banner-RNText")).toBeDefined();
      });
    });

    describe("should stack", () => {
      it("renders using View when there is a details prop", () => {
        const { getByText, queryByTestId } = render(
          <Banner type="notice" details={["details"]} />,
        );

        expect(getByText("details")).toBeDefined();
        expect(queryByTestId("ATL-View-Container")).toBeDefined();
      });

      it("renders using View when there is more than one child", () => {
        const { getByText, queryByTestId } = render(
          <Banner type="notice">
            <Text>Notice me</Text>
            <TextList items={["Detail One", "Detail Two", "Detail Three"]} />
          </Banner>,
        );

        expect(getByText("Notice me")).toBeDefined();
        expect(getByText("Detail Three")).toBeDefined();
        expect(queryByTestId("ATL-View-Container")).toBeDefined();
      });

      it("renders using View when there is a details prop and a text prop", () => {
        const { getByText, queryByTestId } = render(
          <Banner type="notice" text="Notice me" details={["details"]} />,
        );

        expect(getByText("Notice me")).toBeDefined();
        expect(getByText("details")).toBeDefined();
        expect(queryByTestId("ATL-View-Container")).toBeDefined();
      });

      it("renders using View when there are text and details props, as well as a child", () => {
        const { getByText, queryByTestId } = render(
          <Banner type="notice" text="Notice me" details={["details"]}>
            <Text>I am a text child!</Text>
          </Banner>,
        );

        expect(getByText("Notice me")).toBeDefined();
        expect(getByText("I am a text child!")).toBeDefined();
        expect(queryByTestId("ATL-View-Container")).toBeDefined();
      });
    });

    it("should render multiple details when using the details prop", () => {
      const tree = render(
        <Banner
          type="error"
          text="You are disconnected"
          details={["details", "etc"]}
        />,
      );

      expect(tree.getByText("details")).toBeDefined();
      expect(tree.getByText("etc")).toBeDefined();
    });

    it("should render multiple details when using the TextList component", () => {
      const tree = render(
        <Banner type="error" text="You are disconnected">
          <TextList items={["details", "etc"]} />
        </Banner>,
      );

      expect(tree.getByText("details")).toBeDefined();
      expect(tree.getByText("etc")).toBeDefined();
    });

    it("should render a Typography bar when there is an action prop but no details", () => {
      const { getByText } = render(
        <Banner
          type="error"
          text="You are disconnected"
          action={{ label: "Reconnect", onPress: jest.fn() }}
        />,
      );

      expect(getByText("Reconnect")).toBeDefined();
      expect(getByText("|")).toBeDefined();
    });

    it("should not render a Typography bar when there are action and details props", () => {
      const { getByText, queryByText } = render(
        <Banner
          type="error"
          text="You are disconnected"
          details={["details"]}
          action={{ label: "Reconnect", onPress: jest.fn() }}
        />,
      );

      expect(getByText("Reconnect")).toBeDefined();
      expect(queryByText("|")).toBeNull();
    });
  });
});
