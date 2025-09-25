import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SegmentedControl } from "./SegmentedControl";

describe("SegmentedControl", () => {
  const options = [
    { value: "pizza", label: "Pizza" },
    { value: "tacos", label: "Tacos" },
    { value: "sushi", label: "Sushi" },
    { value: "burgers", label: "Burgers" },
  ];

  it("should render options correctly", () => {
    render(
      <SegmentedControl>
        {options.map(option => (
          <SegmentedControl.Option key={option.value} value={option.value}>
            {option.label}
          </SegmentedControl.Option>
        ))}
      </SegmentedControl>,
    );

    options.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it("updates the selected value when an option is clicked", async () => {
    render(
      <SegmentedControl defaultValue="pizza">
        {options.map(option => (
          <SegmentedControl.Option
            key={option.value}
            value={option.value}
            ariaLabel={option.value}
          >
            {option.label}
          </SegmentedControl.Option>
        ))}
      </SegmentedControl>,
    );

    expect(screen.getByLabelText("Pizza")).toBeChecked();

    userEvent.click(screen.getByLabelText("Tacos"));

    await waitFor(() => {
      expect(screen.getByLabelText("Tacos")).toBeChecked();
      expect(screen.getByLabelText("Pizza")).not.toBeChecked();
    });
  });

  it("updates the selected value when options are navigated via arrow keys", async () => {
    const changeHandler = jest.fn();
    render(
      <SegmentedControl onSelectValue={changeHandler}>
        {options.map(option => (
          <SegmentedControl.Option
            key={option.value}
            value={option.value}
            ariaLabel={option.value}
          >
            {option.label}
          </SegmentedControl.Option>
        ))}
      </SegmentedControl>,
    );

    const pizzaOption = screen.getByLabelText("Pizza");
    pizzaOption.focus();

    await userEvent.keyboard("{ArrowRight}");
    expect(changeHandler).toHaveBeenCalledWith("tacos");

    await userEvent.keyboard("{ArrowRight}");
    expect(changeHandler).toHaveBeenCalledWith("sushi");

    await userEvent.keyboard("{ArrowLeft}");
    expect(changeHandler).toHaveBeenCalledWith("tacos");
  });

  it("allows tabbing into and out of the component", async () => {
    render(
      <SegmentedControl defaultValue="pizza">
        {options.map(option => (
          <SegmentedControl.Option
            key={option.value}
            value={option.value}
            ariaLabel={option.value}
          >
            {option.label}
          </SegmentedControl.Option>
        ))}
      </SegmentedControl>,
    );

    await userEvent.tab();
    expect(screen.getByLabelText("Pizza")).toHaveFocus();

    await userEvent.tab();
    expect(screen.getByLabelText("Pizza")).not.toHaveFocus();
    expect(screen.getByLabelText("Tacos")).not.toHaveFocus();
    expect(screen.getByLabelText("Sushi")).not.toHaveFocus();
    expect(screen.getByLabelText("Burgers")).not.toHaveFocus();
  });

  it("assigns each option the same name prop string", () => {
    render(
      <SegmentedControl name="food">
        {options.map(option => (
          <SegmentedControl.Option key={option.value} value={option.value}>
            {option.label}
          </SegmentedControl.Option>
        ))}
      </SegmentedControl>,
    );

    options.forEach(option => {
      expect(screen.getByLabelText(option.label).getAttribute("name")).toBe(
        "food",
      );
    });
  });

  it("defaults the name prop to a unique id if string is not provided", () => {
    render(
      <SegmentedControl>
        {options.map(option => (
          <SegmentedControl.Option key={option.value} value={option.value}>
            {option.label}
          </SegmentedControl.Option>
        ))}
      </SegmentedControl>,
    );
    const firstOptionName = screen.getByLabelText("Pizza").getAttribute("name");
    expect(firstOptionName).toMatch("«ro»");
  });
});
