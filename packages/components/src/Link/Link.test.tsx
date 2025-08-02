import React from "react";
import { fireEvent, render } from "@testing-library/react";
import {
  Route,
  RouteChildrenProps,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { Link } from ".";

const testUrl = "https://getjobber.com";
const testText = "This is a link";

describe("when a Link is rendered", () => {
  it("opens the link in the same tab if external is left at default value of false", () => {
    const { getByText } = render(<Link url={testUrl}>{testText}</Link>);
    const link = getByText(testText);
    expect(link.getAttribute("target")).toBeNull();
  });

  it("opens in a new tab if external is set to true", () => {
    const { getByText } = render(
      <Link url={testUrl} external={true}>
        {testText}
      </Link>,
    );
    const link = getByText(testText);
    expect(link.getAttribute("target")).toBe("_blank");
  });

  it("links to the correct url provided", () => {
    const { getByText } = render(<Link url={testUrl}>{testText}</Link>);
    const link = getByText(testText);
    expect(link.getAttribute("href")).toBe(testUrl);
  });

  describe("styling variations", () => {
    it("applies primary type styling by default", () => {
      const { container } = render(<Link url={testUrl}>{testText}</Link>);
      const link = container.querySelector("a");
      expect(link?.className).toContain("primary");
    });

    it("applies secondary type styling when specified", () => {
      const { container } = render(
        <Link url={testUrl} type="secondary">
          {testText}
        </Link>,
      );
      const link = container.querySelector("a");
      expect(link?.className).toContain("secondary");
    });

    it("applies tertiary type styling when specified", () => {
      const { container } = render(
        <Link url={testUrl} type="tertiary">
          {testText}
        </Link>,
      );
      const link = container.querySelector("a");
      expect(link?.className).toContain("tertiary");
    });

    it("applies work variation by default", () => {
      const { container } = render(<Link url={testUrl}>{testText}</Link>);
      const link = container.querySelector("a");
      expect(link?.className).toContain("work");
    });

    it("applies learning variation when specified", () => {
      const { container } = render(
        <Link url={testUrl} variation="learning">
          {testText}
        </Link>,
      );
      const link = container.querySelector("a");
      expect(link?.className).toContain("learning");
    });

    it("applies destructive variation when specified", () => {
      const { container } = render(
        <Link url={testUrl} variation="destructive">
          {testText}
        </Link>,
      );
      const link = container.querySelector("a");
      expect(link?.className).toContain("destructive");
    });
  });

  describe("size variations", () => {
    it("applies base size by default", () => {
      const { container } = render(<Link url={testUrl}>{testText}</Link>);
      const link = container.querySelector("a");
      expect(link?.className).toContain("base");
    });

    it("applies small size when specified", () => {
      const { container } = render(
        <Link url={testUrl} size="small">
          {testText}
        </Link>,
      );
      const link = container.querySelector("a");
      expect(link?.className).toContain("small");
    });

    it("applies large size when specified", () => {
      const { container } = render(
        <Link url={testUrl} size="large">
          {testText}
        </Link>,
      );
      const link = container.querySelector("a");
      expect(link?.className).toContain("large");
    });
  });

  describe("states", () => {
    it("renders as a span when disabled", () => {
      const { container } = render(
        <Link url={testUrl} disabled>
          {testText}
        </Link>,
      );
      const element = container.querySelector("span");
      expect(element).toBeTruthy();
      expect(element?.className).toContain("disabled");
      expect(element?.getAttribute("aria-disabled")).toBe("true");
    });

    it("applies loading class when loading", () => {
      const { container } = render(
        <Link url={testUrl} loading>
          {testText}
        </Link>,
      );
      const link = container.querySelector("a");
      expect(link?.className).toContain("loading");
    });

    it("applies fullWidth class when fullWidth is true", () => {
      const { container } = render(
        <Link url={testUrl} fullWidth>
          {testText}
        </Link>,
      );
      const link = container.querySelector("a");
      expect(link?.className).toContain("fullWidth");
    });
  });

  describe("with icons", () => {
    it("renders icon on the left by default", () => {
      const { container } = render(
        <Link url={testUrl} icon="dashboard">
          {testText}
        </Link>,
      );
      const link = container.querySelector("a");
      expect(link?.className).toContain("withIcon");
      const icon = container.querySelector("svg");
      expect(icon).toBeTruthy();
    });

    it("renders icon on the right when iconOnRight is true", () => {
      const { container } = render(
        <Link url={testUrl} icon="dashboard" iconOnRight>
          {testText}
        </Link>,
      );
      const link = container.querySelector("a");
      expect(link?.className).toContain("withIcon");
    });

    it("applies iconOnly class when there are no children", () => {
      const { container } = render(
        <Link url={testUrl} icon="dashboard" ariaLabel="Dashboard" />,
      );
      const link = container.querySelector("a");
      expect(link?.className).toContain("iconOnly");
    });
  });

  describe("accessibility", () => {
    it("applies aria-label when provided", () => {
      const ariaLabel = "Custom label";
      const { container } = render(
        <Link url={testUrl} ariaLabel={ariaLabel}>
          {testText}
        </Link>,
      );
      const link = container.querySelector("a");
      expect(link?.getAttribute("aria-label")).toBe(ariaLabel);
    });

    it("applies aria-expanded when provided", () => {
      const { container } = render(
        <Link url={testUrl} ariaExpanded={true}>
          {testText}
        </Link>,
      );
      const link = container.querySelector("a");
      expect(link?.getAttribute("aria-expanded")).toBe("true");
    });

    it("applies aria-controls when provided", () => {
      const ariaControls = "menu-id";
      const { container } = render(
        <Link url={testUrl} ariaControls={ariaControls}>
          {testText}
        </Link>,
      );
      const link = container.querySelector("a");
      expect(link?.getAttribute("aria-controls")).toBe(ariaControls);
    });

    it("applies aria-haspopup when provided", () => {
      const { container } = render(
        <Link url={testUrl} ariaHaspopup={true}>
          {testText}
        </Link>,
      );
      const link = container.querySelector("a");
      expect(link?.getAttribute("aria-haspopup")).toBe("true");
    });
  });

  describe("custom styling", () => {
    it("applies custom className when provided", () => {
      const customClass = "custom-link-class";
      const { container } = render(
        <Link url={testUrl} UNSAFE_className={{ container: customClass }}>
          {testText}
        </Link>,
      );
      const link = container.querySelector("a");
      expect(link?.className).toContain(customClass);
    });

    it("applies custom style when provided", () => {
      const customStyle = { marginTop: "10px" };
      const { container } = render(
        <Link url={testUrl} UNSAFE_style={{ container: customStyle }}>
          {testText}
        </Link>,
      );
      const link = container.querySelector("a");
      expect(link?.style.marginTop).toBe("10px");
    });
  });

  describe("client-side routing", () => {
    it("navigates when links with button styling are clicked", () => {
      const { getByText, queryByText } = render(
        <Router>
          <Link url="/" type="primary" variation="work">
            Home
          </Link>
          <Link url="/office" type="secondary" variation="work">
            Office
          </Link>
          <Link url="/dentist" type="tertiary" variation="destructive">
            Dentist
          </Link>
          <Switch>
            <Route exact path="/">
              This is my home, time to get cozy.
            </Route>
            <Route exact path="/office">
              This is my office, time to get to work.
            </Route>
            <Route exact path="/dentist">
              This is the dentist, time to get my teeth fixed.
            </Route>
          </Switch>
        </Router>,
      );

      expect(queryByText("This is my home, time to get cozy.")).toBeInstanceOf(
        HTMLElement,
      );
      expect(
        queryByText("This is my office, time to get to work."),
      ).not.toBeInstanceOf(HTMLElement);
      expect(
        queryByText("This is the dentist, time to get my teeth fixed."),
      ).not.toBeInstanceOf(HTMLElement);

      fireEvent.click(getByText("Office"));

      expect(
        queryByText("This is my home, time to get cozy."),
      ).not.toBeInstanceOf(HTMLElement);
      expect(
        queryByText("This is my office, time to get to work."),
      ).toBeInstanceOf(HTMLElement);
      expect(
        queryByText("This is the dentist, time to get my teeth fixed."),
      ).not.toBeInstanceOf(HTMLElement);

      fireEvent.click(getByText("Dentist"));

      expect(
        queryByText("This is my home, time to get cozy."),
      ).not.toBeInstanceOf(HTMLElement);
      expect(
        queryByText("This is my office, time to get to work."),
      ).not.toBeInstanceOf(HTMLElement);
      expect(
        queryByText("This is the dentist, time to get my teeth fixed."),
      ).toBeInstanceOf(HTMLElement);
    });

    it("renders Link with button-like appearance for navigation", () => {
      const { container } = render(
        <Router>
          <Link url="/jobber" type="primary" size="large" icon="dashboard">
            Go to Dashboard
          </Link>
        </Router>,
      );
      const link = container.querySelector("a");
      expect(link?.className).toContain("primary");
      expect(link?.className).toContain("large");
      expect(link?.className).toContain("withIcon");
      expect(link?.getAttribute("href")).toBe("/jobber");
    });
  });
});