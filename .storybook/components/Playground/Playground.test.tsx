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
  it("should render a basic read only source code", () => {
    mockStoryData({ sourceCode: "() => <p></p>" });
    const { container } = render(<Playground />);

    expect(container).toHaveTextContent(
      "export function Example() { return <p></p> }",
    );
    expect(container).toHaveTextContent("Read-only");
  });

  it("should render nothing when there's no story data", () => {
    sbAPISpy.mockImplementation(() => ({
      getCurrentStoryData: () => undefined,
    }));
    const { container } = render(<Playground />);

    // There should be only a div which implies that nothing was rendered
    expect(container).toMatchInlineSnapshot(`<div />`);
  });

  describe("Props and arg values", () => {
    it("should render the spread arg values", () => {
      mockStoryData({
        args: { size: "large" },
        sourceCode: "args => <Button {...args} />",
      });
      const { container } = render(<Playground />);

      expect(container).toHaveTextContent(
        `export function Example() { return <Button size={"large"} /> }`,
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

      expect(container).toHaveTextContent(
        `data={["fee", "fi", "fo", "fum", ]}`,
      );
    });

    it("should render an object arg value", () => {
      mockStoryData({
        args: { action: { label: "click me", onClick: () => undefined } },
      });
      const { container } = render(<Playground />);

      expect(container).toHaveTextContent(
        `action={{label: "click me", onClick: () => undefined, }}`,
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
      "export function Example() { return <Button /> }",
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

  it("should use the parameter code imports when it's available", () => {
    mockStoryData({
      // @ts-expect-error - Storybook API types does allow this
      parameters: {
        code: {
          imports: `import { Tabs, Tab } from "@jobber/components/Tab";`,
        },
      },
      sourceCode: `args => <Content>Sup!</Content>`,
    });
    const { container } = render(<Playground />);

    expect(container).not.toHaveTextContent(
      'import { Content } from "@jobber/components/Content";',
    );
    expect(container).toHaveTextContent(
      'import { Tabs, Tab } from "@jobber/components/Tab";',
    );
  });
});

interface MockStoryDataType extends Partial<sbAPI.Story> {
  sourceCode?: string;
}

function mockStoryData({
  sourceCode = "args => <div {...args} />",
  parameters,
  ...rest
}: MockStoryDataType) {
  sbAPISpy.mockImplementation(() => ({
    getCurrentStoryData: () => ({
      ...rest,
      parameters: { ...parameters, storySource: { source: sourceCode } },
    }),
  }));
}
