import React from "react";
import { render, screen } from "@testing-library/react";
import { Avatar } from ".";

it("renders a Avatar", () => {
  const { container } = render(
    <Avatar
      imageUrl="https://api.adorable.io/avatars/150/jobbler"
      name="The Jobbler"
      size="large"
    />,
  );

  expect(container).toMatchSnapshot();
});

it("displays initials if no image is set", () => {
  const { container } = render(<Avatar initials="JBLR" />);
  expect(container).toMatchSnapshot();
});

it("Initials are trimmed to the first 3 characters", () => {
  const { getByText } = render(<Avatar initials="JBLR ARE 2 MANY LETTERS" />);
  expect(getByText("JBL").innerHTML.length).toBeLessThanOrEqual(3);
  expect(getByText("JBL").innerHTML).toBe("JBL");
});

it("displays an icon if no image and no initials are set", () => {
  // Disabling typecheck here to test a fallback. This version of avatar
  // should never be used, but is created as an extra safety.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { container } = render(<Avatar />);
  expect(container).toMatchSnapshot();
});

describe("UNSAFE props", () => {
  describe("UNSAFE_className", () => {
    it("applies to Avatar container", () => {
      render(
        <Avatar
          name="Custom Container Class Name"
          imageUrl="https://api.adorable.io/avatars/150/jobbler"
          UNSAFE_className={{ container: "customContainerClassName" }}
        />,
      );
      expect(screen.getByLabelText("Custom Container Class Name")).toHaveClass(
        "customContainerClassName",
      );
    });

    it("applies to Avatar initials", () => {
      render(
        <Avatar
          initials="JB"
          UNSAFE_className={{ initials: "customInitialsClassName" }}
        />,
      );
      expect(screen.getByText("JB")).toHaveClass("customInitialsClassName");
    });

    it("applies to Avatar fallback icon", () => {
      render(
        <Avatar
          initials=""
          UNSAFE_className={{
            fallbackIcon: {
              svg: "customFallbackIconSvgClassName",
              path: "customFallbackIconPathClassName",
            },
          }}
        />,
      );
      expect(screen.getByTestId("person")).toHaveClass(
        "customFallbackIconSvgClassName",
      );
      expect(screen.getByTestId("person").querySelector("path")).toHaveClass(
        "customFallbackIconPathClassName",
      );
    });
  });

  describe("UNSAFE_style", () => {
    it("applies to Avatar container", () => {
      render(
        <Avatar
          name="Custom Container Style"
          imageUrl="https://api.adorable.io/avatars/150/jobbler"
          UNSAFE_style={{
            container: {
              borderColor: "var(--color-green)",
            },
          }}
        />,
      );

      expect(screen.getByLabelText("Custom Container Style")).toHaveStyle({
        borderColor: "var(--color-green)",
      });
    });

    it("applies to Avatar initials", () => {
      render(
        <Avatar
          initials="JB"
          UNSAFE_style={{
            initials: {
              color: "var(--color-blue)",
            },
          }}
        />,
      );

      expect(screen.getByText("JB")).toHaveStyle({
        color: "var(--color-blue)",
      });
    });

    it("applies to Avatar fallback icon", () => {
      render(
        <Avatar
          initials=""
          UNSAFE_style={{
            fallbackIcon: {
              svg: {
                width: "59px",
                height: "59px",
              },
              path: {
                fill: "var(--color-blue)",
              },
            },
          }}
        />,
      );

      expect(screen.getByTestId("person")).toHaveStyle({
        width: "59px",
        height: "59px",
      });
      expect(screen.getByTestId("person").querySelector("path")).toHaveStyle({
        fill: "var(--color-blue)",
      });
    });
  });
});
