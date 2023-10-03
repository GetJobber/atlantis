import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { Host } from "react-native-portalize";
import { Alert } from "react-native";
import { ButtonGroup, ButtonGroupProps } from "./ButtonGroup";
import { Button } from "../Button";
import * as atlantisContext from "../AtlantisContext/AtlantisContext";
import { atlantisContextDefaultValues } from "../AtlantisContext";

const mockOnOpen = jest.fn();

function ButtonGroupForTest(props: ButtonGroupProps) {
  return (
    <Host>
      <ButtonGroup
        bottomSheetHeading={props.bottomSheetHeading}
        showCancelInBottomSheet={props.showCancelInBottomSheet}
        onOpenBottomSheet={mockOnOpen}
      >
        {props.children}
      </ButtonGroup>
    </Host>
  );
}

it("renders a single primary action", () => {
  const createAction = jest.fn();
  const { getByText, queryByLabelText } = render(
    <ButtonGroupForTest>
      <ButtonGroup.PrimaryAction
        label="Create"
        icon="plus"
        onPress={createAction}
      />
    </ButtonGroupForTest>,
  );

  expect(getByText("Create")).not.toBeNull();
  expect(queryByLabelText("More")).toBeNull();
});

it("renders 2 primary actions", () => {
  const createAction = jest.fn();
  const editAction = jest.fn();
  const { getByText, queryByLabelText } = render(
    <ButtonGroupForTest>
      <ButtonGroup.PrimaryAction
        label="Create"
        icon="plus"
        onPress={createAction}
      />
      <ButtonGroup.PrimaryAction
        label="Edit"
        icon="edit"
        onPress={editAction}
      />
    </ButtonGroupForTest>,
  );

  expect(getByText("Create")).not.toBeNull();
  expect(getByText("Edit")).not.toBeNull();
  expect(queryByLabelText("More")).toBeNull();
});

it("does not render more than 2 primary actions but adds a More button", () => {
  const createAction = jest.fn();
  const editAction = jest.fn();
  const mysteryAction = jest.fn();
  const { getByText, queryByText, getByLabelText } = render(
    <ButtonGroupForTest>
      <ButtonGroup.PrimaryAction
        label="Create"
        icon="plus"
        onPress={createAction}
      />
      <ButtonGroup.PrimaryAction
        label="Edit"
        icon="edit"
        onPress={editAction}
      />
      <ButtonGroup.PrimaryAction
        label="Mystery"
        icon="edit"
        onPress={mysteryAction}
      />
    </ButtonGroupForTest>,
  );

  expect(getByText("Create")).not.toBeNull();
  expect(getByText("Edit")).not.toBeNull();
  expect(queryByText("Mystery")).toBeNull();
  expect(getByLabelText("More")).toBeDefined();
});

it("does not render secondary actions", () => {
  const createAction = jest.fn();
  const editAction = jest.fn();
  const deleteAction = jest.fn();
  const { getByText, queryByText, getByLabelText } = render(
    <ButtonGroupForTest>
      <ButtonGroup.PrimaryAction
        label="Create"
        icon="plus"
        onPress={createAction}
      />
      <ButtonGroup.SecondaryAction
        label="Edit"
        icon="edit"
        onPress={editAction}
      />
      <ButtonGroup.SecondaryAction
        label="Delete"
        icon="trash"
        onPress={deleteAction}
      />
    </ButtonGroupForTest>,
  );
  expect(getByText("Create")).not.toBeNull();
  expect(queryByText("Edit")).toBeNull();
  expect(queryByText("Delete")).toBeNull();
  expect(getByLabelText("More")).toBeDefined();
});

it("renders first secondary action as a primary action button if no primary action specified", () => {
  const editAction = jest.fn();
  const deleteAction = jest.fn();
  const { queryByText, getByText, getByLabelText } = render(
    <ButtonGroupForTest>
      <ButtonGroup.SecondaryAction
        label="Edit"
        icon="edit"
        onPress={editAction}
      />
      <ButtonGroup.SecondaryAction
        label="Delete"
        icon="trash"
        onPress={deleteAction}
      />
    </ButtonGroupForTest>,
  );
  expect(getByText("Edit")).not.toBeNull();
  expect(queryByText("Delete")).toBeNull();
  expect(getByLabelText("More")).toBeDefined();
});

it("fires the press handlers when the primary action buttons are pressed", () => {
  const createAction = jest.fn();
  const editAction = jest.fn();
  const { getByText } = render(
    <ButtonGroupForTest>
      <ButtonGroup.PrimaryAction
        label="Create"
        icon="plus"
        onPress={createAction}
      />
      <ButtonGroup.PrimaryAction
        label="Edit"
        icon="edit"
        onPress={editAction}
      />
    </ButtonGroupForTest>,
  );

  fireEvent.press(getByText("Create"));
  expect(createAction).toHaveBeenCalled();
  fireEvent.press(getByText("Edit"));
  expect(editAction).toHaveBeenCalled();
});

it("opens the secondary action menu when the More button is pressed", () => {
  const createAction = jest.fn();
  const editAction = jest.fn();
  const deleteAction = jest.fn();
  const { getByText, queryByText, getByLabelText } = render(
    <ButtonGroupForTest>
      <ButtonGroup.PrimaryAction
        label="Create"
        icon="plus"
        onPress={createAction}
      />
      <ButtonGroup.SecondaryAction
        label="Edit"
        icon="edit"
        onPress={editAction}
      />
      <ButtonGroup.SecondaryAction
        label="Delete"
        icon="trash"
        onPress={deleteAction}
      />
    </ButtonGroupForTest>,
  );

  expect(queryByText("Edit")).toBeNull();

  fireEvent.press(getByLabelText("More"));

  expect(getByText("Edit")).not.toBeNull();
  expect(getByText("Delete")).not.toBeNull();
});

it("renders heading and cancel options if passed in", () => {
  const createAction = jest.fn();
  const editAction = jest.fn();
  const { getByText, getByLabelText } = render(
    <ButtonGroupForTest
      bottomSheetHeading={"Heading"}
      showCancelInBottomSheet={true}
    >
      <ButtonGroup.PrimaryAction
        label="Create"
        icon="plus"
        onPress={createAction}
      />
      <ButtonGroup.SecondaryAction
        label="Edit"
        icon="edit"
        onPress={editAction}
      />
    </ButtonGroupForTest>,
  );

  fireEvent.press(getByLabelText("More"));

  expect(getByText("Heading")).not.toBeNull();
  expect(getByText("Cancel")).not.toBeNull();
});

it("renders custom button for primary action if passed in", () => {
  const createAction = jest.fn();

  const customCreateButton = (
    <Button label="CustomCreate" onPress={createAction} />
  );

  const { queryByText, getByText } = render(
    <ButtonGroupForTest>
      <ButtonGroup.PrimaryAction
        label="Create"
        icon="plus"
        onPress={createAction}
        customButton={customCreateButton}
      />
    </ButtonGroupForTest>,
  );

  expect(getByText("CustomCreate")).not.toBeNull();
  expect(queryByText("Create")).toBeNull();
});

it("calls onOpenBottomSheet when the secondary actions are opened", () => {
  const createAction = jest.fn();
  const editAction = jest.fn();
  const deleteAction = jest.fn();
  const { getByLabelText } = render(
    <ButtonGroupForTest>
      <ButtonGroup.PrimaryAction
        label="Create"
        icon="plus"
        onPress={createAction}
      />
      <ButtonGroup.SecondaryAction
        label="Edit"
        icon="edit"
        onPress={editAction}
      />
      <ButtonGroup.SecondaryAction
        label="Delete"
        icon="trash"
        onPress={deleteAction}
      />
    </ButtonGroupForTest>,
  );

  fireEvent.press(getByLabelText("More"));

  expect(mockOnOpen).toHaveBeenCalled();
});

describe("ButtonGroup Offline/Online", () => {
  const atlantisContextSpy = jest.spyOn(atlantisContext, "useAtlantisContext");

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const handlePress = jest.fn();
  const label = "Click me";
  const setup = () =>
    render(
      <ButtonGroupForTest>
        <ButtonGroup.PrimaryAction
          label={label}
          icon="plus"
          onPress={handlePress}
        />
      </ButtonGroupForTest>,
    );

  it("should show an alert and not fire the onPress", () => {
    const alertSpy = jest.spyOn(Alert, "alert");
    atlantisContextSpy.mockReturnValue({
      ...atlantisContextDefaultValues,
      isOnline: false,
    });

    const { getByText } = setup();

    fireEvent.press(getByText(label));

    expect(alertSpy).toHaveBeenCalled();
    expect(handlePress).not.toHaveBeenCalled();
  });

  it("should fire the onPress and not show an alert", () => {
    const alertSpy = jest.spyOn(Alert, "alert");
    const { getByText } = setup();

    fireEvent.press(getByText(label));

    expect(handlePress).toHaveBeenCalled();
    expect(alertSpy).not.toHaveBeenCalled();
  });
});
