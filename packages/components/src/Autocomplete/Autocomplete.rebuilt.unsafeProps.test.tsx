// Locally mock timing tokens to 0ms to avoid transition waits in this file
jest.mock("@jobber/design", () => {
  const actual = jest.requireActual("@jobber/design");

  return {
    ...actual,
    tokens: {
      ...actual.tokens,
      "timing-base": 0,
    },
  };
});

import { render, screen } from "@testing-library/react";
import React from "react";
import { openAutocomplete } from "./Autocomplete.pom";
import { Wrapper } from "./tests/Autocomplete.setup";

describe("Autocomplete unsafe props", () => {
  describe("UNSAFE props", () => {
    it("passes className to the menu", async () => {
      render(<Wrapper UNSAFE_className={{ menu: "custom-menu" }} />);

      await openAutocomplete();

      expect(await screen.findByRole("listbox")).toHaveClass("custom-menu");
    });

    it("passes styles to the menu", async () => {
      render(<Wrapper UNSAFE_styles={{ menu: { backgroundColor: "red" } }} />);

      await openAutocomplete();

      expect(await screen.findByRole("listbox")).toHaveStyle({
        backgroundColor: "red",
      });
    });

    it("passes className to the option", async () => {
      render(<Wrapper UNSAFE_className={{ option: "custom-option" }} />);

      await openAutocomplete();

      expect(
        screen
          .getAllByRole("option")
          .every(option => option.classList.contains("custom-option")),
      ).toBe(true);
    });

    it("passes styles to the option", async () => {
      render(
        <Wrapper UNSAFE_styles={{ option: { backgroundColor: "red" } }} />,
      );

      await openAutocomplete();

      expect(
        screen
          .getAllByRole("option")
          .every(option => option.style.backgroundColor === "red"),
      ).toBe(true);
    });

    it("passes className to the action", async () => {
      render(<Wrapper UNSAFE_className={{ action: "custom-action" }} />);

      await openAutocomplete();

      expect(
        screen
          .getAllByTestId("ATL-AutocompleteRebuilt-Action")
          .every(action => action.classList.contains("custom-action")),
      ).toBe(true);
    });

    it("passes styles to the action", async () => {
      render(
        <Wrapper UNSAFE_styles={{ action: { backgroundColor: "red" } }} />,
      );

      await openAutocomplete();

      expect(
        screen
          .getAllByTestId("ATL-AutocompleteRebuilt-Action")
          .every(action => action.style.backgroundColor === "red"),
      ).toBe(true);
    });

    it("passes className to the persistent header and footer", async () => {
      render(
        <Wrapper
          UNSAFE_className={{
            header: "custom-header",
            footer: "custom-footer",
          }}
          menu={[
            {
              type: "header",
              label: "Interactive Header",
            },
            {
              type: "footer",
              label: "Interactive Footer",
            },
          ]}
        />,
      );

      await openAutocomplete();

      expect(screen.getByTestId("ATL-AutocompleteRebuilt-header")).toHaveClass(
        "custom-header",
      );
      expect(screen.getByTestId("ATL-AutocompleteRebuilt-footer")).toHaveClass(
        "custom-footer",
      );
    });
  });
});
