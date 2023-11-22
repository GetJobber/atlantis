import { screen, waitFor } from "@testing-library/react";
import * as pom from "../POM/DataList.selectable.pom";

describe("DataList Selection", () => {
  describe("Select some", () => {
    it("should select a single item", async () => {
      pom.render();
      await pom.clickCheckbox(1);

      expect(pom.getCheckboxes()[1]).toBeChecked();
      await waitFor(() =>
        expect(screen.getAllByText("1 selected")).toHaveLength(2),
      );
    });

    it("should have 2 selected items", async () => {
      pom.render();
      await pom.clickCheckbox(2);
      await pom.clickCheckbox(4);

      const checkboxes = pom.getCheckboxes();
      expect(checkboxes[2]).toBeChecked();
      expect(checkboxes[4]).toBeChecked();
      await waitFor(() =>
        expect(screen.getAllByText("2 selected")).toHaveLength(2),
      );
    });

    it("should unselect the correct item", async () => {
      pom.render();
      await pom.clickCheckbox(5);
      await pom.clickCheckbox(3);

      const checkboxes = pom.getCheckboxes();
      expect(checkboxes[5]).toBeChecked();
      expect(checkboxes[3]).toBeChecked();

      await pom.clickCheckbox(3);

      expect(checkboxes[5]).toBeChecked();
      expect(checkboxes[4]).not.toBeChecked();
    });
  });

  describe("Select all", () => {
    it("should select all items", async () => {
      pom.render();
      await pom.clickSelectAllCheckbox();

      const checkboxes = pom.getCheckboxes();
      checkboxes.forEach(checkbox => expect(checkbox).toBeChecked());
      expect(screen.getByText("7 selected")).toBeInTheDocument();
    });

    it("should unselect all items", async () => {
      pom.render();
      await pom.clickSelectAllCheckbox();
      await pom.clickSelectAllCheckbox();

      const checkboxes = pom.getCheckboxes();
      checkboxes.forEach(checkbox => expect(checkbox).not.toBeChecked());
      await waitFor(() =>
        expect(screen.queryByText("7 selected")).not.toBeInTheDocument(),
      );
    });

    it("should deselect all after clicking the deselect all button", async () => {
      pom.render();
      await pom.clickSelectAllCheckbox();
      await pom.clickDeselectAllButton();

      const checkboxes = pom.getCheckboxes();
      checkboxes.forEach(checkbox => expect(checkbox).not.toBeChecked());
      await waitFor(() =>
        expect(screen.queryByText("7 selected")).not.toBeInTheDocument(),
      );
    });

    it("should allow unselecting and re-selecting a single item after a select all", async () => {
      pom.render();
      await pom.clickSelectAllCheckbox();
      await pom.clickCheckbox(2);

      const checkboxes = pom.getCheckboxes();
      expect(checkboxes[2]).not.toBeChecked();

      await pom.clickCheckbox(2);
      expect(checkboxes[2]).toBeChecked();
    });
  });
});
