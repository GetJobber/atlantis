import React from "react";
import {
  RenderAPI,
  cleanup,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react-native";
import { FormProvider, useForm } from "react-hook-form";
import { CheckboxGroup } from "./CheckboxGroup";
import { Checkbox } from "./Checkbox";
import { CheckboxGroupState } from "./types";
import { Button } from "../Button";

const onSubmitMock = jest.fn();

const parentCheckboxLabel = "all condiments";
const firstCheckboxLabel = "relish";
const secondCheckboxLabel = "ketchup";
const thirdCheckboxLabel = "mustard";
const saveButtonText = "Save";

interface CheckboxGroupFormData {
  [key: string]: CheckboxGroupState;
}

interface CheckboxGroupFormOnChangeHandlers {
  relish?: (data: boolean) => void;
  mustard?: (data: boolean) => void;
  ketchup?: (data: boolean) => void;
  all?: (data: CheckboxGroupState) => void;
}

afterEach(cleanup);

function setup(
  label: string | undefined,
  disabled?: boolean,
  childDisabled?: boolean,
) {
  const checkboxGroup = render(
    <CheckboxGroup
      name="condimentsGroupCheckbox"
      label={label}
      accessibilityLabel={parentCheckboxLabel}
      disabled={disabled}
    >
      <Checkbox
        label="Relish"
        name="relish"
        accessibilityLabel={firstCheckboxLabel}
      />
      <Checkbox
        label="Ketchup"
        name="ketchup"
        accessibilityLabel={secondCheckboxLabel}
        disabled={childDisabled}
      />
      <Checkbox
        label="Mustard"
        name="mustard"
        accessibilityLabel={thirdCheckboxLabel}
      />
    </CheckboxGroup>,
  );

  return { checkboxGroup };
}

function SetupWithForm({
  initialValues,
  onChangeHandlers,
}: {
  readonly initialValues: CheckboxGroupFormData;
  readonly onChangeHandlers?: CheckboxGroupFormOnChangeHandlers;
}): JSX.Element {
  const formMethods = useForm({ defaultValues: initialValues });

  return (
    <FormProvider {...formMethods}>
      <CheckboxGroup
        name="condiments"
        label="All Condiments"
        accessibilityLabel={parentCheckboxLabel}
        onChange={onChangeHandlers?.all}
      >
        <Checkbox
          label="Relish"
          name="relish"
          accessibilityLabel={firstCheckboxLabel}
          onChange={onChangeHandlers?.relish}
        />
        <Checkbox
          label="Ketchup"
          name="ketchup"
          accessibilityLabel={secondCheckboxLabel}
          onChange={onChangeHandlers?.ketchup}
        />
        <Checkbox
          label="Mustard"
          name="mustard"
          accessibilityLabel={thirdCheckboxLabel}
          onChange={onChangeHandlers?.mustard}
        />
      </CheckboxGroup>
      <Button
        onPress={formMethods.handleSubmit(values => onSubmitMock(values))}
        label={saveButtonText}
        accessibilityLabel={saveButtonText}
      />
    </FormProvider>
  );
}

describe("when none of the checkboxes in a group are checked", () => {
  it("the parent checkbox should be in the unchecked state", () => {
    const { checkboxGroup } = setup("All Condiments");
    const parentCheckbox = checkboxGroup.getByLabelText(parentCheckboxLabel);
    expect(parentCheckbox.props.accessibilityState.checked).toEqual(false);
  });

  describe("when the parent checkbox is pressed", () => {
    it("should check all the checkboxes within the group", () => {
      const { checkboxGroup } = setup("All Condiments");
      fireEvent.press(checkboxGroup.getByLabelText(parentCheckboxLabel));
      [firstCheckboxLabel, secondCheckboxLabel, thirdCheckboxLabel].forEach(
        checkboxLabel => {
          const checkboxElement = checkboxGroup.getByLabelText(checkboxLabel);
          expect(checkboxElement.props.accessibilityState.checked).toEqual(
            true,
          );
        },
      );
    });
  });
});

describe("when one of the checkboxes in a group are checked", () => {
  it("the parent checkbox should be in the indeterminate state", () => {
    const { checkboxGroup } = setup("All Condiments");
    fireEvent.press(checkboxGroup.getByLabelText(secondCheckboxLabel));
    const parentCheckbox = checkboxGroup.getByLabelText(parentCheckboxLabel);
    expect(parentCheckbox.props.accessibilityState.checked).toEqual("mixed");
  });
});

describe("when all of the checkboxes in a group are checked", () => {
  function pressAllCheckboxes(checkboxGroup: RenderAPI) {
    fireEvent.press(checkboxGroup.getByLabelText(firstCheckboxLabel));
    fireEvent.press(checkboxGroup.getByLabelText(secondCheckboxLabel));
    fireEvent.press(checkboxGroup.getByLabelText(thirdCheckboxLabel));
  }

  it("the parent checkbox should be in the checked state", () => {
    const { checkboxGroup } = setup("All Condiments");
    pressAllCheckboxes(checkboxGroup);
    const parentCheckbox = checkboxGroup.getByLabelText(parentCheckboxLabel);
    expect(parentCheckbox.props.accessibilityState.checked).toEqual(true);
  });

  describe("when the parent checkbox is pressed", () => {
    it("should uncheck all the checkboxes within the group", () => {
      const { checkboxGroup } = setup("All Condiments");
      pressAllCheckboxes(checkboxGroup);
      fireEvent.press(checkboxGroup.getByLabelText(parentCheckboxLabel));
      [firstCheckboxLabel, secondCheckboxLabel, thirdCheckboxLabel].forEach(
        checkboxLabel => {
          const checkboxElement = checkboxGroup.getByLabelText(checkboxLabel);
          expect(checkboxElement.props.accessibilityState.checked).toEqual(
            false,
          );
        },
      );
    });
  });
});

describe("when the parent checkbox does not have a label", () => {
  it("does not render the parent checkbox", async () => {
    const { checkboxGroup } = setup(undefined);

    const findParentCheckbox = () => {
      checkboxGroup.getByLabelText(parentCheckboxLabel);
    };
    expect(findParentCheckbox).toThrow(
      "Unable to find an element with accessibilityLabel: all condiments",
    );
  });
});

describe("when the parent checkbox is disabled", () => {
  it("disabled all the children checkboxes", () => {
    const { checkboxGroup } = setup("All Condiments", true);
    fireEvent.press(checkboxGroup.getByLabelText(parentCheckboxLabel));
    [firstCheckboxLabel, secondCheckboxLabel, thirdCheckboxLabel].forEach(
      checkboxLabel => {
        const checkboxElement = checkboxGroup.getByLabelText(checkboxLabel);
        expect(checkboxElement.props.accessibilityState.disabled).toEqual(true);
      },
    );
  });
});

describe("when one of the checkboxes in a group are disabled", () => {
  it("the parent shouldn't modify the disabled checkbox's state", () => {
    const parentDisabled = false;
    const childDisabled = true;
    const { checkboxGroup } = setup(
      "All Condiments",
      parentDisabled,
      childDisabled,
    );
    fireEvent.press(checkboxGroup.getByLabelText(parentCheckboxLabel));

    [firstCheckboxLabel, thirdCheckboxLabel].forEach(checkboxLabel => {
      const checkboxElement = checkboxGroup.getByLabelText(checkboxLabel);
      expect(checkboxElement.props.accessibilityState.checked).toEqual(true);
    });
    const parentCheckbox = checkboxGroup.getByLabelText(parentCheckboxLabel);
    expect(parentCheckbox.props.accessibilityState.checked).toEqual("mixed");
  });
  it("the parent should update the non disabled checkboxes", () => {
    const parentDisabled = false;
    const childDisabled = true;
    const { checkboxGroup } = setup(
      "All Condiments",
      parentDisabled,
      childDisabled,
    );
    fireEvent.press(checkboxGroup.getByLabelText(parentCheckboxLabel));

    const secondCheckbox = checkboxGroup.getByLabelText(secondCheckboxLabel);
    const parentCheckbox = checkboxGroup.getByLabelText(parentCheckboxLabel);
    expect(secondCheckbox.props.accessibilityState.checked).toEqual(false);
    expect(parentCheckbox.props.accessibilityState.checked).toEqual("mixed");
  });
});

describe("when one of the checkbox has no name", () => {
  it("should throw an error", () => {
    expect(() =>
      render(
        <CheckboxGroup
          name="condimentsGroupCheckbox"
          label="test"
          accessibilityLabel={parentCheckboxLabel}
        >
          <Checkbox
            label="Relish"
            name="relish"
            accessibilityLabel={firstCheckboxLabel}
          />
          <Checkbox
            label="Ketchup"
            name="ketchup"
            accessibilityLabel={secondCheckboxLabel}
          />
          <Checkbox onChange={jest.fn} checked={false} />
        </CheckboxGroup>,
      ),
    ).toThrow("You must provide a name to checkboxes in a checkbox group");
  });
});

describe("when controlled by a form", () => {
  describe("when a checkbox is pressed", () => {
    it("should update the form values", async () => {
      const initialValues = {
        condiments: {
          parentChecked: false,
          childrenChecked: { relish: false, ketchup: false, mustard: false },
        },
      };
      const expectedValues = {
        condiments: {
          parentChecked: false,
          childrenChecked: { relish: false, ketchup: true, mustard: false },
        },
      };
      const { getByLabelText } = render(
        <SetupWithForm initialValues={initialValues} />,
      );
      fireEvent.press(getByLabelText(secondCheckboxLabel));
      const saveButton = getByLabelText(saveButtonText);
      await waitFor(() => {
        fireEvent.press(saveButton);
      });
      expect(onSubmitMock).toHaveBeenCalledWith(expectedValues);
    });
    it("should call the onChange handler for child checkbox", async () => {
      const initialValues = {
        condiments: {
          parentChecked: false,
          childrenChecked: { relish: false, ketchup: false, mustard: false },
        },
      };
      const relishHandler = jest.fn();
      const onChangeHandlers: CheckboxGroupFormOnChangeHandlers = {
        relish: relishHandler,
      };

      const { getByLabelText } = render(
        <SetupWithForm
          initialValues={initialValues}
          onChangeHandlers={onChangeHandlers}
        />,
      );
      fireEvent.press(getByLabelText(firstCheckboxLabel));

      expect(relishHandler).toHaveBeenCalledWith(true);
    });
    it("should call the onChange handler for parent checkbox", async () => {
      const initialValues = {
        condiments: {
          parentChecked: false,
          childrenChecked: { relish: false, ketchup: false, mustard: false },
        },
      };
      const allHandler = jest.fn();
      const onChangeHandlers: CheckboxGroupFormOnChangeHandlers = {
        all: allHandler,
      };

      const { getByLabelText } = render(
        <SetupWithForm
          initialValues={initialValues}
          onChangeHandlers={onChangeHandlers}
        />,
      );
      fireEvent.press(getByLabelText(parentCheckboxLabel));

      expect(allHandler).toHaveBeenCalledWith({
        parentChecked: true,
        childrenChecked: {
          relish: true,
          ketchup: true,
          mustard: true,
        },
      });
    });
  });
});
