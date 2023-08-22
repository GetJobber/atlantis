import { render, screen } from "@testing-library/react";
import React from "react";
import {
  generateHeaderElements,
  generateListItemElements,
  getCompoundComponent,
} from "../DataList.utils";

const date = new Date("2001-01-01T00:00:00.000Z");

beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(date);
});

afterEach(jest.useRealTimers);

describe("Datalist utils", () => {
  describe("getCompundComponent", () => {
    const Component = () => <></>;
    const ComponentDos = () => <></>;

    it("should return the component I'm looking for", () => {
      const children = [<Component key="1" />, <ComponentDos key="2" />];
      const component = getCompoundComponent(children, Component);

      expect(component?.type).toBe(Component);
      expect(component?.type).not.toBe(ComponentDos);
    });

    it("should return undefined if the component i'm looking for doesn't exist", () => {
      const children = [<ComponentDos key="2" />];
      const component = getCompoundComponent(children, Component);

      expect(component).toBe(undefined);
    });
  });

  /**
   * Most of the tests here are inline snapshots.
   * This is okay since it is returning the components we're expecting it to
   * return rather than the generated HTML that each components create. Testing
   * it with the other matchers would end up us recreating how snapshots work.
   *
   * 1. If any of the snapshot here needs updating, it's either the code within
   *    the utils have changed or there really is something wrong.
   */
  describe("generateListItemElements", () => {
    it("should generate a Text component for the label key", () => {
      const elementList = generateListItemElements([{ id: 1, label: "Hello" }]);

      // Snapshot needs updating? See comment #1 above the `describe`.
      expect(elementList[0].label).toMatchInlineSnapshot(`
        <Text>
          Hello
        </Text>
      `);
    });

    it("should generate a subdued Text component for any random key", () => {
      const elementList = generateListItemElements([
        {
          id: 1,
          randomKeyThatIsntNormal: "I am a normal text",
        },
      ]);

      // Snapshot needs updating? See comment #1 above the `describe`.
      expect(elementList[0].randomKeyThatIsntNormal).toMatchInlineSnapshot(`
        <Text
          variation="subdued"
        >
          I am a normal text
        </Text>
      `);
    });

    it("should generate a list of inline label for the tag key", () => {
      const elementList = generateListItemElements([
        { id: 1, tags: ["uno", "dos"] },
      ]);

      // Snapshot needs updating? See comment #1 above the `describe`.
      expect(elementList[0].tags).toMatchInlineSnapshot(`
        <DataListTags
          items={
            [
              "uno",
              "dos",
            ]
          }
        />
      `);
    });

    it("should generate the element passed in on any key", () => {
      const elementList = generateListItemElements([
        { id: 1, element: <div /> },
      ]);

      // Snapshot needs updating? See comment #1 above the `describe`.
      expect(elementList[0].element).toMatchInlineSnapshot(`<div />`);
    });

    it("should generate the correct element", () => {
      const elementList = generateListItemElements([{ id: 1, date }]);

      // Snapshot needs updating? See comment #1 above the `describe`.
      expect(elementList[0].date).toMatchInlineSnapshot(`
        <Text
          variation="subdued"
        >
          <FormatDate
            date={2001-01-01T00:00:00.000Z}
          />
        </Text>
      `);
    });
  });

  describe("generateHeaderElements", () => {
    it("should generate the header element", () => {
      const name = "Nombre";
      const headerElements = generateHeaderElements({ name });
      render(headerElements?.name || <></>);

      const element = screen.getByText(name);
      expect(element).toBeInstanceOf(HTMLParagraphElement);
      expect(element).toHaveClass("small textSecondary textTruncate");
      expect(element.parentElement).toHaveClass("headerLabel");
    });

    it("should return undefined when the value is empty", () => {
      const headerElements = generateHeaderElements({});
      expect(headerElements).toBeUndefined();
    });
  });
});
