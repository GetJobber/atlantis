import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BottomSheet } from ".";
import { Button } from "../Button";

describe("BottomSheet", () => {
  it("opens from the trigger and closes when an item is activated", async () => {
    const onItem = jest.fn();

    render(
      <BottomSheet>
        <BottomSheet.Trigger ariaLabel="Bottom Sheet">
          <Button label="Open sheet" />
        </BottomSheet.Trigger>
        <BottomSheet.Content>
          <BottomSheet.Section>
            <BottomSheet.Header>
              <BottomSheet.HeaderLabel>Actions</BottomSheet.HeaderLabel>
            </BottomSheet.Header>
            <BottomSheet.Item onClick={onItem} textValue="Archive item">
              <BottomSheet.ItemLabel>Archive item</BottomSheet.ItemLabel>
            </BottomSheet.Item>
          </BottomSheet.Section>
        </BottomSheet.Content>
      </BottomSheet>,
    );

    await userEvent.click(screen.getByLabelText("Bottom Sheet"));
    expect(await screen.findByText("Archive item")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Archive item" }));

    expect(onItem).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(screen.queryByText("Archive item")).not.toBeInTheDocument(),
    );
  });

  it("supports the trigger prop API", async () => {
    const onItem = jest.fn();

    render(
      <BottomSheet
        ariaLabel="Bottom Sheet"
        trigger={<Button label="Open sheet" />}
      >
        <BottomSheet.Section>
          <BottomSheet.Item onClick={onItem} textValue="Archive item">
            <BottomSheet.ItemLabel>Archive item</BottomSheet.ItemLabel>
          </BottomSheet.Item>
        </BottomSheet.Section>
      </BottomSheet>,
    );

    await userEvent.click(screen.getByLabelText("Bottom Sheet"));
    expect(await screen.findByText("Archive item")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Archive item" }));

    expect(onItem).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(screen.queryByText("Archive item")).not.toBeInTheDocument(),
    );
  });
});
