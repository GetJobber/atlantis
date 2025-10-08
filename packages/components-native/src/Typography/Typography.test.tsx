import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { I18nManager } from "react-native";
import { Typography } from "./Typography";

it("renders text with no additional props", () => {
  const typography = render(<Typography>Test Text</Typography>);
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with regular style", () => {
  const typography = render(
    <Typography fontStyle="regular">Test Text</Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with bold style", () => {
  const typography = render(
    <Typography fontWeight="bold">Test Text</Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with italic style", () => {
  const typography = render(
    <Typography fontStyle="italic">Test Text</Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with bold weight and italic style", () => {
  const typography = render(
    <Typography fontStyle="italic" fontWeight="bold">
      Test Text
    </Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with bold style and display as fontFamily", () => {
  const typography = render(
    <Typography fontFamily="display" fontWeight="bold">
      Test Text
    </Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with extraBold weight and display as fontFamily", () => {
  const typography = render(
    <Typography fontFamily="display" fontWeight="extraBold">
      Test Text
    </Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with black style and display as fontFamily", () => {
  const typography = render(
    <Typography fontFamily="display" fontWeight="black">
      Test Text
    </Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with uppercase transform", () => {
  const typography = render(
    <Typography transform="uppercase">Test Text</Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with lowercase transform", () => {
  const typography = render(
    <Typography transform="lowercase">Test Text</Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("supports nested children and applies transform only to string children", () => {
  const typography = render(
    <Typography transform="uppercase">
      before <Typography fontWeight="bold">Inner</Typography> after
    </Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("allows child Typography to control its own transform", () => {
  const view = render(
    <Typography transform="uppercase">
      {"before "}
      <Typography fontWeight="bold" transform="lowercase">
        Inner
      </Typography>
      {" after"}
    </Typography>,
  ).toJSON();

  expect(view).toMatchSnapshot();
});

it("supports multi-level nesting across Typography and Text", () => {
  const view = render(
    <Typography transform="uppercase">
      {"level1 "}
      <Typography>
        and <Typography transform="lowercase">INNER</Typography>
      </Typography>
      {" end"}
    </Typography>,
  ).toJSON();

  expect(view).toMatchSnapshot();
});

it("applies transform to parent strings only", () => {
  const { getByText } = render(
    <Typography transform="uppercase">
      {"test "}
      <Typography>inner</Typography>
    </Typography>,
  );

  expect(getByText(/TEST/)).toBeDefined();
  expect(getByText("inner")).toBeDefined();
});

it("allows child transform to override parent transform", () => {
  const { getByText } = render(
    <Typography transform="uppercase">
      before <Typography transform="lowercase">INNER</Typography> after
    </Typography>,
  );

  expect(getByText(/BEFORE/)).toBeDefined();
  expect(getByText("inner")).toBeDefined();
  expect(getByText(/AFTER/)).toBeDefined();
});

it("renders text with white color", () => {
  const typography = render(<Typography color="white">Test Text</Typography>);
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with green color", () => {
  const typography = render(<Typography color="green">Test Text</Typography>);
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with semantic color", () => {
  const typography = render(
    <Typography color="inactiveOnSurface">Test Text</Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with default color", () => {
  const typography = render(<Typography color="default">Test Text</Typography>);
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with center align", () => {
  const typography = render(<Typography align="center">Test Text</Typography>);
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text respecting the text direction", () => {
  I18nManager.isRTL = true;

  const typography = render(<Typography>Test Text</Typography>);
  expect(typography.toJSON()).toMatchSnapshot();
  I18nManager.isRTL = false;
});

it("renders text with small size", () => {
  const typography = render(<Typography size="small">Test Text</Typography>);
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with large size", () => {
  const typography = render(<Typography size="large">Test Text</Typography>);
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with default size", () => {
  const typography = render(<Typography size="default">Test Text</Typography>);
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with multiple properties", () => {
  const typography = render(
    <Typography fontWeight="bold" size="large" color="white">
      Test Text
    </Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with line height override", () => {
  const typography = render(
    <Typography lineHeight="jumbo">Test Text</Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with letter spacing", () => {
  const typography = render(
    <Typography letterSpacing="loose">Test Text</Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with reverseTheme true with reversible color", () => {
  const typography = render(
    <Typography reverseTheme={true} color="success">
      Test Text
    </Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with reverseTheme false with reversible color", () => {
  const typography = render(
    <Typography reverseTheme={false} color="success">
      Test Text
    </Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with adjustsFontSizeToFit set to true", () => {
  const typography = render(
    <Typography adjustsFontSizeToFit={true} maxLines="single">
      Test Text that happens to be longer than the rest of the text. This just
      keeps going on and on. maxLines being set will make this work its magic
    </Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text accessibilityRole", () => {
  const typography = render(
    <Typography accessibilityRole="text">Test Text</Typography>,
  );
  expect(typography.getByRole("text")).toBeDefined();
});

it("renders header accessibilityRole", () => {
  const typography = render(
    <Typography accessibilityRole="header">Test Text</Typography>,
  );
  expect(typography.getByRole("header")).toBeDefined();
});

it("renders text using the maxLines is also passed", () => {
  const typography = render(
    <Typography maxLines="small">
      Test Text that happens to be longer than the rest of the text. This just
      keeps going on and on. maxLines being set will make this work its magic
    </Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with strikethough styling", () => {
  const typography = render(
    <Typography strikeThrough={true}>Test Text</Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text that is inaccessible", () => {
  const typography = render(
    <Typography hideFromScreenReader={true}>Test Text</Typography>,
  );

  expect(typography.root.props).toEqual(
    expect.objectContaining({
      accessible: false,
      accessibilityRole: "none",
      importantForAccessibility: "no-hide-descendants",
    }),
  );
});

it("applies custom UNSAFE_style to text", () => {
  const customStyle = { color: "red", fontSize: 20 };
  const typography = render(
    <Typography UNSAFE_style={{ textStyle: customStyle }}>
      Test Text
    </Typography>,
  );
  const textElement = typography.getByText("Test Text");

  expect(textElement.props.style).toEqual(
    expect.arrayContaining([expect.objectContaining(customStyle)]),
  );
});

describe("underline", () => {
  it.each(["solid", "double", "dotted", "dashed"] as const)(
    "renders text with %s underline",
    underlineStyle => {
      const typography = render(
        <Typography underline={underlineStyle}>Test Text</Typography>,
      );

      expect(typography.toJSON()).toMatchSnapshot();
    },
  );
});

describe("onTextLayout", () => {
  it("calls onTextLayout callback when text layout event occurs", () => {
    const onTextLayoutMock = jest.fn();
    const { getByRole } = render(
      <Typography onTextLayout={onTextLayoutMock}>Test Text</Typography>,
    );

    const textElement = getByRole("text");
    const mockEvent = {
      nativeEvent: {
        lines: [
          {
            text: "Test Text",
            x: 0,
            y: 0,
            width: 100,
            height: 20,
            ascender: 15,
            descender: -5,
            capHeight: 14,
            xHeight: 10,
          },
        ],
      },
    };
    fireEvent(textElement, "onTextLayout", mockEvent);
    expect(onTextLayoutMock).toHaveBeenCalledTimes(1);
    expect(onTextLayoutMock).toHaveBeenCalledWith(mockEvent);
  });
});

describe("TypographyGestureDetector", () => {
  it("wraps text with TypographyGestureDetector by default (collapsable=false)", () => {
    const { getByRole } = render(<Typography>Test Text</Typography>);
    const textElement = getByRole("text");

    expect(textElement.props.collapsable).toBe(false);
  });

  it("wraps text with TypographyGestureDetector (collapsable=false) when selectable=true", () => {
    const { getByRole } = render(
      <Typography selectable={true}>Test Text</Typography>,
    );
    const textElement = getByRole("text");

    expect(textElement.props.collapsable).toBe(false);
  });

  it("does not wrap text with TypographyGestureDetector when selectable=false", () => {
    const { getByRole } = render(
      <Typography selectable={false}>Test Text</Typography>,
    );
    const textElement = getByRole("text");

    expect(textElement.props.collapsable).toBeUndefined();
  });
});
