import { render, screen } from "@testing-library/react";
import React from "react";
import {
  generateHeaderElements,
  generateListItemElement,
  getCompoundComponent,
  getCompoundComponents,
  sortBreakpoints,
} from "../DataList.utils";
import { BREAKPOINTS } from "../DataList.const";

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
  describe("generateListItemElement", () => {
    it("should generate a Text component for the label key", () => {
      const elementList = generateListItemElement({ id: 1, label: "Hello" });

      // Snapshot needs updating? See comment #1 above the `describe`.
      expect(elementList.label).toMatchInlineSnapshot(`
        <Heading
          level={5}
        >
          Hello
        </Heading>
      `);
    });

    it("should generate a subdued Text component for any random key", () => {
      const elementList = generateListItemElement({
        id: 1,
        randomKeyThatIsntNormal: "I am a normal text",
      });

      // Snapshot needs updating? See comment #1 above the `describe`.
      expect(elementList.randomKeyThatIsntNormal).toMatchInlineSnapshot(`
        <Text
          variation="subdued"
        >
          I am a normal text
        </Text>
      `);
    });

    it("should generate a list of inline label for the tag key", () => {
      const elementList = generateListItemElement({
        id: 1,
        tags: ["uno", "dos"],
      });

      // Snapshot needs updating? See comment #1 above the `describe`.
      expect(elementList.tags).toMatchInlineSnapshot(`
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
      const elementList = generateListItemElement({ id: 1, element: <div /> });

      // Snapshot needs updating? See comment #1 above the `describe`.
      expect(elementList.element).toMatchInlineSnapshot(`<div />`);
    });

    it("should generate the correct element", () => {
      const elementList = generateListItemElement({ id: 1, date });

      // Snapshot needs updating? See comment #1 above the `describe`.
      expect(elementList.date).toMatchInlineSnapshot(`
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
      expect(element).toHaveClass("base text textTruncate");
      expect(element.parentElement).toHaveClass("headerLabel");
    });
  });

  describe("Sort Breakpoints", () => {
    it("sorts correctly", () => {
      expect(sortBreakpoints(["xl", "md", "lg", "sm", "xs"])).toEqual(
        BREAKPOINTS,
      );
    });
  });

  describe("getCompoundComponents", () => {
    const Component = () => <></>;
    const ComponentDos = () => <></>;
    it("should return the components I'm looking for", () => {
      const children = [
        <Component key="1" />,
        <ComponentDos key="2" />,
        <Component key="3" />,
      ];
      const components = getCompoundComponents(children, Component);

      expect(components[0]?.type).toBe(Component);
      expect(components[0]?.type).not.toBe(ComponentDos);
      expect(components[1]?.type).toBe(Component);
      expect(components[1]?.type).not.toBe(ComponentDos);
    });

    it("should return an empty list if the component i'm looking for doesn't exist", () => {
      const children = [<ComponentDos key="2" />];
      const component = getCompoundComponents(children, Component);

      expect(component).toHaveLength(0);
    });
  });
});
