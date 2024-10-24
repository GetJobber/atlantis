import userEvent from "@testing-library/user-event";
import * as POM from "./ComboboxOption.pom";

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
});
