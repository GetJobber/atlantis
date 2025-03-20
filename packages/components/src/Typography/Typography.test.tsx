import { render, screen } from "@testing-library/react";
import React from "react";
import { Typography } from ".";

it("renders an H1 title", () => {
  const { container } = render(
    <Typography
      element="h1"
      size="jumbo"
      textCase="uppercase"
      fontWeight="black"
    >
      Page title
    </Typography>,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <h1
        class="base black jumbo uppercase"
      >
        Page title
      </h1>
    </div>
  `);
});

it("renders an H2 title", () => {
  const { container } = render(
    <Typography
      element="h2"
      size="largest"
      textCase="uppercase"
      fontWeight="black"
    >
      Subtitle
    </Typography>,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <h2
        class="base black largest uppercase"
      >
        Subtitle
      </h2>
    </div>
  `);
});

it("renders an H3 title", () => {
  const { container } = render(
    <Typography element="h3" size="larger" fontWeight="bold">
      Content Group
    </Typography>,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <h3
        class="base bold larger"
      >
        Content Group
      </h3>
    </div>
  `);
});

it("renders an H4 title", () => {
  const { container } = render(
    <Typography element="h4" size="large" fontWeight="bold">
      Section
    </Typography>,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <h4
        class="base bold large"
      >
        Section
      </h4>
    </div>
  `);
});

it("renders an H5 title", () => {
  const { container } = render(
    <Typography element="h5" size="base" fontWeight="bold">
      Subsection
    </Typography>,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <h5
        class="base bold base"
      >
        Subsection
      </h5>
    </div>
  `);
});

it("renders an H6 title", () => {
  const { container } = render(
    <Typography
      element="h6"
      size="small"
      textCase="uppercase"
      fontWeight="bold"
    >
      Overline
    </Typography>,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <h6
        class="base bold small uppercase"
      >
        Overline
      </h6>
    </div>
  `);
});

it("renders a paragraph", () => {
  const { container } = render(
    <Typography>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat quae
      architecto accusamus cumque voluptate aspernatur repellendus natus, quo
      veniam illum.
    </Typography>,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <p
        class="base regular"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat quae architecto accusamus cumque voluptate aspernatur repellendus natus, quo veniam illum.
      </p>
    </div>
  `);
});

it("renders a span", () => {
  const { container } = render(<Typography element="span">SHOUT!</Typography>);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <span
        class="base regular"
      >
        SHOUT!
      </span>
    </div>
  `);
});

it("renders an uppercased span", () => {
  const { container } = render(
    <Typography textCase="uppercase">uppercase</Typography>,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <p
        class="base regular uppercase"
      >
        uppercase
      </p>
    </div>
  `);
});

it("renders a lowercased text", () => {
  const { container } = render(
    <Typography textCase="lowercase">LOWERCASE</Typography>,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <p
        class="base regular lowercase"
      >
        LOWERCASE
      </p>
    </div>
  `);
});

it("renders a capitalized text", () => {
  const { container } = render(
    <Typography textCase="capitalize">wElL tHiS iS hArD tO tYpE</Typography>,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <p
        class="base regular capitalize"
      >
        wElL tHiS iS hArD tO tYpE
      </p>
    </div>
  `);
});

it("renders text with no text-transform applied", () => {
  const { container } = render(
    <Typography textCase="none">wElL tHiS iS hArD tO tYpE</Typography>,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <p
        class="base regular none"
      >
        wElL tHiS iS hArD tO tYpE
      </p>
    </div>
  `);
});

it("should add textTruncate class when numberOfLines property is passed", () => {
  const { container } = render(
    <Typography numberOfLines={3}>Pretend this is a multiline text</Typography>,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <p
        class="base regular textTruncate"
      >
        Pretend this is a multiline text
      </p>
    </div>
  `);
});

it("renders a end-aligned text", () => {
  const { container } = render(
    <Typography align="end">End align me</Typography>,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <p
        class="base regular end"
      >
        End align me
      </p>
    </div>
  `);
});

it("renders a center-aligned text", () => {
  const { container } = render(
    <Typography align="center">Center align me</Typography>,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <p
        class="base regular center"
      >
        Center align me
      </p>
    </div>
  `);
});

it("renders text in a semantic color", () => {
  const { container } = render(
    <Typography textColor="interactiveSubtle">
      Text in a semantic color
    </Typography>,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <p
        class="base regular interactiveSubtle"
      >
        Text in a semantic color
      </p>
    </div>
  `);
});

describe("underlining", () => {
  it("renders an underline when a style is specified", () => {
    const { container } = render(
      <Typography underline={"dashed"}>Underline me</Typography>,
    );

    const snapshot = `
        <div>
          <p
            class="base regular basicUnderline"
            style="text-decoration-style: dashed;"
          >
            Underline me
          </p>
        </div>
      `;

    expect(container).toMatchInlineSnapshot(snapshot);
  });

  it("renders an underline with a customizable color", () => {
    const { container } = render(
      <Typography underline={"solid color-border"}>Underline me</Typography>,
    );

    const snapshot = `
        <div>
          <p
            class="base regular basicUnderline"
            style="text-decoration-style: solid; text-decoration-color: var(--color-border);"
          >
            Underline me
          </p>
        </div>
      `;

    expect(container).toMatchInlineSnapshot(snapshot);
  });
});

describe("UNSAFE props", () => {
  it("should apply the UNSAFE_className to the element", () => {
    render(
      <Typography UNSAFE_className="custom-class">
        Text with custom class
      </Typography>,
    );
    const element = screen.getByText("Text with custom class");
    expect(element).toHaveClass("custom-class");
  });

  it("should apply the UNSAFE_style to the element", () => {
    render(
      <Typography UNSAFE_style={{ color: "#0066CC" }}>
        Text with custom style
      </Typography>,
    );
    const element = screen.getByText("Text with custom style");
    expect(element).toHaveStyle({ color: "#0066CC" });
  });
});
