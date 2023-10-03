import React from "react";
import { render } from "@testing-library/react";
import * as sbAPI from "@storybook/api";
import { Playground } from "./Playground";

const sbAPISpy = jest.spyOn<Partial<sbAPI.API>, "useStorybookApi">(
  sbAPI,
  "useStorybookApi",
);

afterEach(() => {
  sbAPISpy.mockReset();
});

describe("Playground", () => {
  it("should render a playground", () => {
    mockStoryData({ sourceCode: "args => <Button />" });
    const { container, getByTitle } = render(<Playground />);

    expect(container).toHaveTextContent(
      "export function Example() { return <Button />; }",
    );

    expect(getByTitle("Sandpack Preview")).toBeInTheDocument();
    expect(container).not.toHaveTextContent("Read-only");
  });

  it("should render a basic read only source code", () => {
    mockStoryData({ sourceCode: "() => <p></p>" });
    const { container } = render(<Playground />);

    expect(container).toHaveTextContent(
      "export function Example() { return <p></p>; }",
    );
    expect(container).toHaveTextContent("Read-only");
  });

  it("should render nothing when there's no story data", () => {
    sbAPISpy.mockImplementation(() => ({
      emit: jest.fn(),
      getCurrentStoryData: () => undefined,
    }));
    const { container } = render(<Playground />);

    // There should be only a div which implies that nothing was rendered
    expect(container).toMatchInlineSnapshot(`<div />`);
  });

  it("should render the code unavailable div when it's not a story", () => {
    mockStoryData({ type: "docs", title: "Design/Foundation" });
    const { getByTestId } = render(<Playground />);

    expect(getByTestId("code-unavailable")).toBeInTheDocument();
  });

  describe("Props and arg values", () => {
    it("should render the spread arg values", () => {
      mockStoryData({
        args: { size: "large" },
        sourceCode: "args => <Button {...args} />",
      });
      const { container } = render(<Playground />);

      expect(container).toHaveTextContent(
        `export function Example() { return <Button size={"large"} />; }`,
      );
    });

    it("should also render the non-spread arg values", () => {
      mockStoryData({
        args: { size: "large", visible: true, children: "Hello" },
        sourceCode:
          "args => <div {...args}><p visible={args.visible}>{args.children}</p></div>",
      });
      const { container } = render(<Playground />);

      expect(container).toHaveTextContent(`size={"large"}`);
      expect(container).toHaveTextContent(`visible={true}`);
      expect(container).toHaveTextContent(`{"Hello"}`);
    });

    it("should render a string arg value", () => {
      mockStoryData({ args: { size: "large" } });
      const { container } = render(<Playground />);

      expect(container).toHaveTextContent(`size={"large"}`);
    });

    it("should render a number arg value", () => {
      mockStoryData({ args: { width: 200 } });
      const { container } = render(<Playground />);

      expect(container).toHaveTextContent(`width={200}`);
    });

    it("should render a Symbol arg value as string", () => {
      mockStoryData({ args: { type: Symbol("hello") } });
      const { container } = render(<Playground />);

      expect(container).toHaveTextContent(`type={"Symbol(hello)"}`);
    });

    it("should render an array arg value", () => {
      mockStoryData({ args: { data: ["fee", "fi", "fo", "fum"] } });
      const { container } = render(<Playground />);

      expect(container).toHaveTextContent(`data={["fee", "fi", "fo", "fum"]}`);
    });

    it("should render an object arg value", () => {
      mockStoryData({
        args: { action: { label: "click me", onClick: () => undefined } },
      });
      const { container } = render(<Playground />);

      expect(container).toHaveTextContent(
        `action={{ label: "click me", onClick: () => undefined }}`,
      );
    });
  });

  it("should render a source code from a bracketed function", () => {
    mockStoryData({
      sourceCode: `args => {
        const [] = useState();
        return <Button />;
    }`,
    });
    const { container } = render(<Playground />);

    expect(container).toHaveTextContent('import { useState } from "react";');
    expect(container).toHaveTextContent(
      "export function Example() { const [] = useState(); return <Button />;",
    );
  });

  it("should render a source code with imports", () => {
    mockStoryData({ sourceCode: "args => <Button />" });
    const { container } = render(<Playground />);

    expect(container).toHaveTextContent(
      'import { Button } from "@jobber/components/Button";',
    );
    expect(container).toHaveTextContent(
      "export function Example() { return <Button />; }",
    );
    expect(container).not.toHaveTextContent("Read-only");
  });

  it("should render a source code with an import from a multiline code", () => {
    mockStoryData({
      sourceCode: `args => (
        <Button
          thing="hello"
        />
      )`,
    });
    const { container } = render(<Playground />);

    expect(container).toHaveTextContent(
      'import { Button } from "@jobber/components/Button";',
    );
  });

  it("should render a source code with an import from a single line code", () => {
    mockStoryData({
      sourceCode: `args => <Content>Sup!</Content>`,
    });
    const { container } = render(<Playground />);

    expect(container).toHaveTextContent(
      'import { Content } from "@jobber/components/Content";',
    );
  });

  describe("Extra imports", () => {
    it("should include the parameter extra imports when it's available", () => {
      mockStoryData({
        // @ts-expect-error - Storybook API types does allow this
        parameters: {
          previewTabs: {
            code: {
              extraImports: { "@jobber/components/Tab": ["Tabs", "Tab"] },
            },
          },
        },
        sourceCode: `args => <Content>Sup!</Content>`,
      });
      const { container } = render(<Playground />);

      expect(container).toHaveTextContent(
        'import { Content } from "@jobber/components/Content";',
      );
      expect(container).toHaveTextContent(
        'import { Tabs, Tab } from "@jobber/components/Tab";',
      );
    });

    it("should allow aliases for extra imports parameter", () => {
      mockStoryData({
        // @ts-expect-error - Storybook API types does allow this
        parameters: {
          previewTabs: {
            code: {
              extraImports: {
                "react-router-dom": ["Router"],
              },
            },
          },
        },
        sourceCode: `args => (
        <Router basename="/components/button">
          <Content>Sup!</Content>
        </Router>)`,
      });
      const { container } = render(<Playground />);

      expect(container).toHaveTextContent(
        'import { Router } from "react-router-dom";',
      );

      expect(container).not.toHaveTextContent(
        `import { Router } from "@jobber/components/Router`,
      );
    });

    it("should allow imports of subcomponents of @jobber/components", () => {
      mockStoryData({
        // @ts-expect-error - Storybook API types does allow this
        parameters: {
          previewTabs: {
            code: {
              extraImports: {
                "react-router-dom": ["Router"],
                "@jobber/components/Drawer": ["DrawerGrid"],
              },
            },
          },
        },
        sourceCode: `args => (
        <Router basename="/components/button">
        <DrawerGrid>
          <Content>Sup!</Content>
          <Drawer>
            <Content>Hello</Content>
          </Drawer>
        </DrawerGrid>
        </Router>
        )`,
      });
      const { container } = render(<Playground />);

      expect(container).toHaveTextContent(
        'import { DrawerGrid } from "@jobber/components/Drawer";',
      );
      expect(container).toHaveTextContent(
        'import { Drawer } from "@jobber/components/Drawer";',
      );
      expect(container).not.toHaveTextContent(
        'import { DrawerGrid } from "@jobber/components/DrawerGrid";',
      );
    });
  });

  describe("Mobile stories", () => {
    beforeEach(() => {
      mockStoryData({
        title: "Components/Mobile",
        sourceCode: "args => <Button />",
      });
    });

    it("should only render the code", () => {
      const { container, queryByTitle } = render(<Playground />);

      expect(container).toHaveTextContent("Read-only");
      expect(queryByTitle("Sandpack Preview")).not.toBeInTheDocument();
    });
  });
});

interface MockStoryDataType extends Partial<sbAPI.Story> {
  title?: string;
  sourceCode?: string;
}

function mockStoryData({
  sourceCode = "args => <div {...args} />",
  parameters,
  ...rest
}: MockStoryDataType) {
  sbAPISpy.mockImplementation(() => ({
    emit: jest.fn(),
    getCurrentStoryData: () => ({
      type: "story",
      title: "Components/Web",
      ...rest,
      parameters: { ...parameters, storySource: { source: sourceCode } },
    }),
  }));
}
