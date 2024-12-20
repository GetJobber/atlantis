import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as POM from "./ComboboxOption.pom";
import { ComboboxOptionProps } from "../../Combobox.types";

const onSelect = jest.fn();

afterEach(() => {
  onSelect.mockClear();
});

describe("ComboboxOption", () => {
  describe("when option is selected", () => {
    it("should have a checkmark", () => {
      POM.renderOption({
        id: "1",
        label: "Michael",
        selected: [{ id: "1", label: "Michael" }],
      });

      expect(POM.getCheckmark()).toBeInTheDocument();
    });

    it("should have selected attributes", () => {
      POM.renderOption({
        id: "1",
        label: "Michael",
        selected: [{ id: "1", label: "Michael" }],
      });

      expect(POM.getOption("Michael")).toHaveAttribute("aria-selected", "true");
      expect(POM.getOption("Michael")).toHaveAttribute("data-selected", "true");
    });

    it("should call selectionHandler when clicked", async () => {
      POM.renderOption({
        id: "1",
        label: "Michael",
        selected: [{ id: "1", label: "Michael" }],
        onSelect,
      });

      await userEvent.click(POM.getOption("Michael"));

      expect(onSelect).toHaveBeenCalled();
    });

    describe("id type insensitivity", () => {
      it("should correctly evaluate if selected is a string and option is a number", () => {
        POM.renderOption({
          id: "1",
          label: "Michael",
          selected: [{ id: "1", label: "Michael" }],
        });

        expect(POM.getOption("Michael")).toHaveAttribute(
          "aria-selected",
          "true",
        );
        expect(POM.getOption("Michael")).toHaveAttribute(
          "data-selected",
          "true",
        );
      });
      it("should correctly evaluate if selected is a number and option is a number", () => {
        POM.renderOption({
          id: "1",
          label: "Michael",
          selected: [{ id: "1", label: "Michael" }],
        });

        expect(POM.getOption("Michael")).toHaveAttribute(
          "aria-selected",
          "true",
        );
        expect(POM.getOption("Michael")).toHaveAttribute(
          "data-selected",
          "true",
        );
      });
    });
  });

  describe("when option is not selected", () => {
    it("should not have a checkmark", async () => {
      POM.renderOption({
        id: "1",
        label: "Michael",
        selected: [],
      });

      expect(POM.queryCheckmark()).not.toBeInTheDocument();
    });

    it("should not have selected attributes", () => {
      POM.renderOption({
        id: "1",
        label: "Michael",
        selected: [],
      });

      expect(POM.getOption("Michael")).toHaveAttribute(
        "aria-selected",
        "false",
      );
      expect(POM.getOption("Michael")).toHaveAttribute(
        "data-selected",
        "false",
      );
    });

    it("should call selectionHandler when clicked", async () => {
      POM.renderOption({
        id: "1",
        label: "Michael",
        selected: [],
        onSelect,
      });

      await userEvent.click(POM.getOption("Michael"));

      expect(onSelect).toHaveBeenCalled();
    });
  });

  describe("when supplying a customRender prop", () => {
    it("renders the custom content", () => {
      const option: ComboboxOptionProps = {
        id: "1",
        label: "Michael",
        customRender: POM.customRender,
      };

      POM.renderOption({
        ...option,
        selected: [],
      });

      const id = screen.queryByText("1");
      const label = screen.queryByText("Michael");
      const selectedCheckmark = screen.queryByText("✅");
      expect(id).toBeInTheDocument();
      expect(label).toBeInTheDocument();
      expect(selectedCheckmark).not.toBeInTheDocument();
    });

    it("renders the custom content with a checkmark if selected", () => {
      const option: ComboboxOptionProps = {
        id: "1",
        label: "Michael",
        customRender: POM.customRender,
      };

      POM.renderOption({
        ...option,
        selected: [option],
      });

      const id = screen.queryByText("1");
      const label = screen.queryByText("Michael");
      const selectedCheckmark = screen.queryByText("✅");
      expect(id).toBeInTheDocument();
      expect(label).toBeInTheDocument();
      expect(selectedCheckmark).toBeInTheDocument();
    });

    it("wraps the custom content within <li>", () => {
      const option: ComboboxOptionProps = {
        id: "1",
        label: "Michael",
        customRender: POM.customRender,
      };

      POM.renderOption({
        ...option,
        selected: [option],
      });

      expect(POM.queryListItem()).toBeInTheDocument();
    });

    it("selects the option when clicked", async () => {
      const option: ComboboxOptionProps = {
        id: "1",
        label: "Michael",
        customRender: POM.customRender,
      };

      POM.renderOption({
        ...option,
        selected: [],
        onSelect,
      });

      await userEvent.click(POM.getOption("Michael"));
      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onSelect).toHaveBeenCalledWith({
        id: "1",
        label: "Michael",
      });
    });
  });
});
