import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Banner } from ".";

it("renders a success banner", () => {
  const { container } = render(<Banner type="success">Success</Banner>);
  expect(container).toMatchSnapshot();
});

it("renders an error banner", () => {
  const { container } = render(
    <Banner type="error">Something went wrong</Banner>,
  );
  expect(container).toMatchSnapshot();
});

it("renders a notice banner", () => {
  const { container } = render(<Banner type="notice">Notice me</Banner>);
  expect(container).toMatchSnapshot();
});

it("renders a warning banner", () => {
  const { container } = render(<Banner type="warning">Warn</Banner>);
  expect(container).toMatchSnapshot();
});

it("renders without close button", () => {
  const { queryByLabelText } = render(
    <Banner type="warning" dismissible={false}>
      Foo
    </Banner>,
  );
  expect(queryByLabelText("Dismiss notification")).toBeNull();
});

it("renders with close button", () => {
  const { queryByLabelText } = render(
    <Banner type="warning" dismissible={true}>
      Foo
    </Banner>,
  );
  expect(queryByLabelText("Dismiss notification")).toBeTruthy();
});

test("should call the handler with a number value", () => {
  const changeHandler = jest.fn();

  const { getByLabelText } = render(
    <Banner type="success" onDismiss={changeHandler}>
      Close me
    </Banner>,
  );

  fireEvent.click(getByLabelText("Dismiss notification"));
  expect(changeHandler).toHaveBeenCalledTimes(1);
});

it("renders a banner with a primary action", () => {
  const { container } = render(
    <Banner
      type="success"
      primaryAction={{
        label: "smash me",
      }}
    >
      Bruce
    </Banner>,
  );

  expect(container).toMatchSnapshot();
});

it("renders a banner with a primary 'learning' action when the type is 'notice'", () => {
  const { container } = render(
    <Banner
      type="notice"
      primaryAction={{
        label: "smash me",
      }}
    >
      Bruce
    </Banner>,
  );

  expect(container).toMatchSnapshot();
});

it("wraps its children in text if the children are a simple string", () => {
  render(
    <Banner
      type="notice"
      primaryAction={{
        label: "smash me",
      }}
    >
      Bruce
    </Banner>,
  );
  expect(screen.getByText("Bruce")).toBeInstanceOf(HTMLParagraphElement);
});

it("does not wrap the its children in text if the children are not a simple string", () => {
  render(
    <Banner
      type="notice"
      primaryAction={{
        label: "smash me",
      }}
    >
      <h3>Bruce</h3>
    </Banner>,
  );
  const bruceHeading = screen.getByText("Bruce");
  expect(bruceHeading).toBeInstanceOf(HTMLHeadingElement);
  expect(bruceHeading.parentElement).toBeInstanceOf(HTMLDivElement);
});

it("should call the onClick when primaryAction is present", () => {
  const onClick = jest.fn();

  const { getByText } = render(
    <Banner
      type="success"
      primaryAction={{
        label: "Hello World",
        onClick: () => onClick(),
      }}
    >
      Bruce
    </Banner>,
  );

  fireEvent.click(getByText("Hello World"));
  expect(onClick).toHaveBeenCalledTimes(1);
});

it("adds a role of status by default", () => {
  const { getByRole } = render(<Banner type="notice">Bruce</Banner>);
  expect(getByRole("status")).toBeInstanceOf(HTMLDivElement);
});

it("adds a role of alert for error banners", () => {
  const { getByRole } = render(<Banner type="error">Bruce</Banner>);
  expect(getByRole("alert")).toBeInstanceOf(HTMLDivElement);
});

it("doesn't hide the banner when controlledVisibility is true", () => {
  const onDismissMock = jest.fn();
  const { getByLabelText, getByText } = render(
    <Banner
      type="warning"
      dismissible={true}
      controlledVisiblity={true}
      onDismiss={onDismissMock}
    >
      Foo
    </Banner>,
  );

  fireEvent.click(getByLabelText("Dismiss notification"));
  expect(onDismissMock).toHaveBeenCalledTimes(1);
  expect(getByText("Foo")).toBeVisible();
});

describe("Banner.Provider", () => {
  it("renders the banner content as is", () => {
    render(
      <Banner.Provider type="success">
        <Banner.Content>
          <div>custom content goes here</div>
        </Banner.Content>
      </Banner.Provider>,
    );
    const content = screen.getByText("custom content goes here");
    expect(content).toBeVisible();
    expect(content).toBeInstanceOf(HTMLDivElement);
  });

  it("renders the banner content into <Text> if it's a string", () => {
    render(
      <Banner.Provider type="success">
        <Banner.Content>custom content goes here</Banner.Content>
      </Banner.Provider>,
    );
    const content = screen.getByText("custom content goes here");
    expect(content).toBeVisible();
    expect(content).toBeInstanceOf(HTMLParagraphElement);
    expect(content.classList).toContain("text");
  });

  describe("banner icon", () => {
    it("renders the banner icon by default", () => {
      render(
        <Banner.Provider type="warning">
          <Banner.Content>...</Banner.Content>
        </Banner.Provider>,
      );
      expect(screen.getByTestId("warning")).toBeVisible();
    });

    it("does not render the banner icon when icon is false", () => {
      render(
        <Banner.Provider type="warning" icon={false}>
          <Banner.Content>...</Banner.Content>
        </Banner.Provider>,
      );
      expect(screen.queryByTestId("warning")).not.toBeInTheDocument();
    });

    it("allows a custom icon to be rendered", () => {
      render(
        <Banner.Provider type="warning" icon={<div>custom icon</div>}>
          <Banner.Content>...</Banner.Content>
        </Banner.Provider>,
      );
      expect(screen.queryByTestId("warning")).not.toBeInTheDocument();
      expect(screen.getByText("custom icon")).toBeVisible();
    });

    it("allows customizing the Banner.Icon", () => {
      render(
        <Banner.Provider type="warning" icon={<Banner.Icon name="info" />}>
          <Banner.Content>...</Banner.Content>
        </Banner.Provider>,
      );
      expect(screen.queryByTestId("info")).toBeVisible();
    });
  });

  describe("banner dismiss button", () => {
    it("renders the banner dismiss button by default", () => {
      render(
        <Banner.Provider type="warning">
          <Banner.Content>...</Banner.Content>
        </Banner.Provider>,
      );
      expect(screen.getByLabelText("Dismiss notification")).toBeVisible();
    });

    it("does not render the banner dismiss button when dismissButton is false", () => {
      render(
        <Banner.Provider type="warning" dismissButton={false}>
          <Banner.Content>...</Banner.Content>
        </Banner.Provider>,
      );
      expect(
        screen.queryByLabelText("Dismiss notification"),
      ).not.toBeInTheDocument();
    });

    it("on click it dismisses the banner and calls the onDismiss handler", async () => {
      const onDismissMock = jest.fn();

      render(
        <Banner.Provider type="warning" onDismiss={onDismissMock}>
          <Banner.Content>...</Banner.Content>
        </Banner.Provider>,
      );

      await userEvent.click(screen.getByLabelText("Dismiss notification"));
      expect(onDismissMock).toHaveBeenCalledTimes(1);
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });

    it("allows a custom dismiss button to be rendered", () => {
      render(
        <Banner.Provider
          type="error"
          dismissButton={<div>custom dismiss button</div>}
        >
          <Banner.Content>...</Banner.Content>
        </Banner.Provider>,
      );
      expect(
        screen.queryByLabelText("Dismiss notification"),
      ).not.toBeInTheDocument();
      expect(screen.getByText("custom dismiss button")).toBeVisible();
    });

    it("allows customizing the Banner.DismissButton", () => {
      render(
        <Banner.Provider
          type="warning"
          dismissButton={<Banner.DismissButton ariaLabel="custom label" />}
        >
          <Banner.Content>...</Banner.Content>
        </Banner.Provider>,
      );
      expect(screen.queryByLabelText("custom label")).toBeVisible();
    });

    it("allows onClick to override the default dismiss behavior", async () => {
      const onClickMock = jest.fn();
      render(
        <Banner.Provider
          type="error"
          dismissButton={<Banner.DismissButton onClick={onClickMock} />}
        >
          <Banner.Content>...</Banner.Content>
        </Banner.Provider>,
      );
      await userEvent.click(screen.getByLabelText("Dismiss notification"));
      expect(screen.queryByText("...")).toBeVisible();
      expect(onClickMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("when visibility is controlled", () => {
    it("dismiss button calls the onDismiss handler but does not dismiss the banner", async () => {
      const onDismissMock = jest.fn();
      render(
        <Banner.Provider type="error" visible={true} onDismiss={onDismissMock}>
          <Banner.Content>...</Banner.Content>
        </Banner.Provider>,
      );

      await userEvent.click(screen.getByLabelText("Dismiss notification"));
      expect(screen.getByRole("alert")).toBeVisible();
      expect(onDismissMock).toHaveBeenCalledTimes(1);
    });

    it("responds to visibility state changes", () => {
      const { rerender } = render(
        <Banner.Provider type="error" visible={false}>
          <Banner.Content>...</Banner.Content>
        </Banner.Provider>,
      );
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();

      rerender(
        <Banner.Provider type="error" visible={true}>
          <Banner.Content>...</Banner.Content>
        </Banner.Provider>,
      );
      expect(screen.getByRole("alert")).toBeVisible();

      rerender(
        <Banner.Provider type="error" visible={false}>
          <Banner.Content>...</Banner.Content>
        </Banner.Provider>,
      );
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });
});
