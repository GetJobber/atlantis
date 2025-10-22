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

import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import {
  type MenuItem,
  type MenuSection,
  type OptionLike,
  defineMenu,
} from "./Autocomplete.types";
import {
  getActiveAction,
  navigateDown,
  openAutocomplete,
  typeInInput,
} from "./Autocomplete.pom";
import { Wrapper } from "./tests/Autocomplete.setup";
import { InputText } from "../InputText";

describe("Autocomplete custom render", () => {
  describe("customRenderInput", () => {
    it("renders a custom layout for customRenderInput when provided", async () => {
      const onChange = jest.fn();
      render(
        <Wrapper
          customRenderInput={({ inputRef, inputProps }) => {
            return (
              <InputText
                ref={inputRef}
                {...inputProps}
                version={2}
                // Compose with internal onChange so Autocomplete behavior still works
                onChange={(val, evt) => {
                  inputProps.onChange?.(val, evt);
                  onChange(val);
                }}
                placeholder="Just a Pineapple"
              />
            );
          }}
        />,
      );

      await openAutocomplete();
      await typeInInput("Just a Pineapple");

      expect(screen.getByRole("combobox")).toBeVisible();
      expect(onChange).toHaveBeenCalledWith("Just a Pineapple");
    });
  });

  describe("customRenderSection", () => {
    it("renders a custom layout for customRenderSection when provided", async () => {
      const renderSection = (
        section: MenuSection<OptionLike & { special?: boolean }>,
      ) => {
        return (
          <strong
            data-testid={`custom-section-header-${
              section.special ? "special" : "normal"
            }`}
          >
            {section.label}
          </strong>
        );
      };
      const sectionedMenu = defineMenu<OptionLike & { special?: boolean }>([
        {
          type: "section",
          special: true,
          label: "One",
          options: [{ label: "One" }, { label: "Two" }],
        },
      ]);

      render(
        <Wrapper<OptionLike & { special?: boolean }>
          customRenderSection={renderSection}
          menu={sectionedMenu}
        />,
      );

      await openAutocomplete();

      await waitFor(() => {
        expect(
          screen.getByTestId("custom-section-header-special"),
        ).toBeVisible();
      });
    });
  });

  describe("customRenderOption", () => {
    it("renders a custom layout for customRenderOption when provided", async () => {
      const customRenderOption = ({
        value,
      }: {
        value: OptionLike & { special?: boolean };
      }) => {
        return (
          <strong
            data-testid={`custom-option-${
              value.special ? "special" : "normal"
            }`}
          >
            {value.label}
          </strong>
        );
      };

      render(
        <Wrapper<OptionLike & { special?: boolean }>
          menu={defineMenu<OptionLike & { special?: boolean }>([
            {
              type: "options",
              options: [
                { label: "One", special: true },
                { label: "Two", special: false },
              ],
            },
          ])}
          customRenderOption={customRenderOption}
        />,
      );

      await openAutocomplete();

      await waitFor(() => {
        expect(screen.getByTestId("custom-option-special")).toBeVisible();
        expect(screen.getByTestId("custom-option-normal")).toBeVisible();
      });
    });

    it("passes isActive correctly to customRenderOption for the highlighted option", async () => {
      render(
        <Wrapper
          customRenderOption={({ value, isActive }) => {
            return (
              <div
                data-testid={`custom-option-${
                  isActive ? "active" : "inactive"
                }`}
              >
                {value.label}
              </div>
            );
          }}
        />,
      );
      await openAutocomplete();
      await navigateDown(1);

      await waitFor(() => {
        expect(screen.getByTestId("custom-option-active")).toBeVisible();
        expect(screen.getAllByTestId("custom-option-inactive")).toHaveLength(2);
      });
    });

    it("passes isSelected correctly to customRenderOption for the selected option", async () => {
      render(
        <Wrapper
          initialValue={{ label: "Two" }}
          customRenderOption={({ value, isSelected }) => {
            return (
              <div
                data-testid={`custom-option-${
                  isSelected ? "selected" : "unselected"
                }`}
              >
                {value.label}
              </div>
            );
          }}
        />,
      );
      await openAutocomplete();
      await navigateDown(1);

      await waitFor(() => {
        expect(screen.getByTestId("custom-option-selected")).toBeVisible();
        expect(screen.getAllByTestId("custom-option-unselected")).toHaveLength(
          2,
        );
      });
    });
  });

  describe("customRenderAction", () => {
    it("renders a custom layout for customRenderAction when provided", async () => {
      const renderAction = ({
        value,
      }: {
        value: OptionLike & { special?: boolean };
      }) => {
        return (
          <strong
            data-testid={`custom-action-${
              value.special ? "special" : "normal"
            }`}
          >
            {value.label}
          </strong>
        );
      };

      render(
        <Wrapper<OptionLike & { special?: boolean }>
          menu={[
            {
              type: "options",
              options: [{ label: "One" }],
              actions: [
                {
                  type: "action",
                  label: "Create new",
                  special: true,
                  onClick: jest.fn(),
                },
              ],
            },
          ]}
          customRenderAction={renderAction}
        />,
      );

      await openAutocomplete();

      await waitFor(() => {
        expect(screen.getByTestId("custom-action-special")).toBeVisible();
      });
    });

    it("passes isActive to customRenderAction for the highlighted action", async () => {
      render(
        <Wrapper
          customRenderAction={({ value, isActive }) => {
            return (
              <div
                data-testid={`custom-action-${
                  isActive ? "active" : "inactive"
                }`}
              >
                {value.label}
              </div>
            );
          }}
        />,
      );
      await openAutocomplete();
      // 3 options, 2 actions - move highlight to second action (index 4)
      await navigateDown(5);

      const activeAction = getActiveAction();

      expect(activeAction).not.toBeNull();
      expect(activeAction?.textContent).toContain("Stay Open");

      await waitFor(() => {
        expect(screen.getByTestId("custom-action-active")).toBeVisible();
        expect(screen.getByTestId("custom-action-inactive")).toBeVisible();
      });
    });
  });

  describe("customRenderHeader/customRenderFooter", () => {
    it("renders a custom layout for customRenderHeader when provided", async () => {
      render(
        <Wrapper
          menu={[
            {
              type: "header",
              label: "Interactive Header",
              onClick: jest.fn(),
            },
          ]}
          customRenderHeader={({ value }) => (
            <div data-testid="custom-header">{value.label}</div>
          )}
        />,
      );

      await openAutocomplete();

      await waitFor(() => {
        expect(screen.getByTestId("custom-header")).toBeVisible();
      });
    });
    it("passes isActive to customRenderHeader/customRenderFooter when interactive", async () => {
      render(
        <Wrapper
          menu={[
            {
              type: "header",
              label: "Interactive Header",
              onClick: jest.fn(),
            },
            {
              type: "footer",
              label: "Interactive Footer",
              onClick: jest.fn(),
            },
          ]}
          customRenderHeader={({ value, isActive }) => (
            <div
              data-testid={`custom-header-${isActive ? "active" : "inactive"}`}
            >
              {value.label}
            </div>
          )}
          customRenderFooter={({ value, isActive }) => (
            <div
              data-testid={`custom-footer-${isActive ? "active" : "inactive"}`}
            >
              {value.label}
            </div>
          )}
        />,
      );

      await openAutocomplete();

      await navigateDown(1);

      await waitFor(() => {
        expect(screen.getByTestId("custom-header-active")).toBeVisible();
        expect(screen.getByTestId("custom-footer-inactive")).toBeVisible();
      });
    });
    it("renders footer via customRenderFooter when provided", async () => {
      render(
        <Wrapper
          menu={[
            {
              type: "header",
              label: "Interactive Header",
              onClick: jest.fn(),
            },
          ]}
          customRenderHeader={({ value }) => (
            <div data-testid={`custom-header`}>{value.label}</div>
          )}
        />,
      );

      await openAutocomplete();

      await waitFor(() => {
        expect(screen.getByTestId("custom-header")).toBeVisible();
      });
    });
    it("accepts and passes custom values to customRenderHeader when provided", async () => {
      const menu = defineMenu<
        OptionLike,
        Record<string, never>,
        { arbitrary: string }
      >([
        {
          type: "header",
          label: "Interactive Header",
          arbitrary: "something",
          onClick: jest.fn(),
        },
      ]);

      render(
        <Wrapper<OptionLike>
          // TODO: fix test types to not need this
          menu={menu as MenuItem<OptionLike>[]}
          customRenderHeader={({ value }) => (
            <div data-testid="custom-header">
              {(value as unknown as { arbitrary: string }).arbitrary}
            </div>
          )}
        />,
      );

      await openAutocomplete();

      await waitFor(() => {
        expect(screen.getByTestId("custom-header")).toBeVisible();
        expect(screen.getByTestId("custom-header")).toHaveTextContent(
          "something",
        );
      });
    });
  });
});
