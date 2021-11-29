import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { InputPhoneNumber } from ".";
import { AllowedRegions } from "./InputPhoneNumber";

afterEach(cleanup);

describe("InputPhoneNumber", () => {
  it("renders a InputPhoneNumber", () => {
    const tree = renderer
      .create(<InputPhoneNumber region={"NorthAmerica"} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("region", () => {
    describe("when region is NorthAmerica", () => {
      itWillValidateInput("NorthAmerica");

      it("will return the correct phone number with formatting", () => {
        const onChangeHandler = jest.fn();
        const rendered = render(
          <InputPhoneNumber
            region={"NorthAmerica"}
            placeholder="Phone Number"
            onChange={onChangeHandler}
          />,
        );
        const numberInput = rendered.getByLabelText(
          "Phone Number",
        ) as HTMLInputElement;

        fireEvent.change(numberInput, {
          target: { value: "7802424496" },
        });

        expect(onChangeHandler).toHaveBeenCalledWith("(780) 242-4496");
      });

      it("will return the correct phone number with formatting and country code", () => {
        const onChangeHandler = jest.fn();
        const rendered = render(
          <InputPhoneNumber
            region={"NorthAmerica"}
            placeholder="Phone Number"
            showCountryCode={true}
            onChange={onChangeHandler}
          />,
        );
        const numberInput = rendered.getByLabelText(
          "Phone Number",
        ) as HTMLInputElement;

        fireEvent.change(numberInput, {
          target: { value: "7802424496" },
        });

        expect(onChangeHandler).toHaveBeenCalledWith("+1 (780) 242-4496");
      });

      it("will mask the unentered values", () => {
        const rendered = render(
          <InputPhoneNumber
            region={"NorthAmerica"}
            placeholder="Phone Number"
            alwaysShowMask={false}
          />,
        );
        const numberInput = rendered.getByLabelText(
          "Phone Number",
        ) as HTMLInputElement;

        fireEvent.change(numberInput, {
          target: { value: "78024244" },
        });

        expect(numberInput.value).toBe("(780) 242-44__");
      });
    });

    describe("when region is GreatBritain", () => {
      itWillValidateInput("GreatBritain");

      it("will return the correct phone number with formatting", () => {
        const onChangeHandler = jest.fn();
        const rendered = render(
          <InputPhoneNumber
            region={"GreatBritain"}
            placeholder="Phone Number"
            onChange={onChangeHandler}
          />,
        );
        const numberInput = rendered.getByLabelText(
          "Phone Number",
        ) as HTMLInputElement;

        fireEvent.change(numberInput, {
          target: { value: "7802424496" },
        });

        expect(onChangeHandler).toHaveBeenCalledWith("7802424496");
      });

      it("will return the correct phone number with formatting and country code", () => {
        const onChangeHandler = jest.fn();
        const rendered = render(
          <InputPhoneNumber
            region={"GreatBritain"}
            placeholder="Phone Number"
            showCountryCode={true}
            onChange={onChangeHandler}
          />,
        );
        const numberInput = rendered.getByLabelText(
          "Phone Number",
        ) as HTMLInputElement;

        fireEvent.change(numberInput, {
          target: { value: "7802424496" },
        });

        expect(onChangeHandler).toHaveBeenCalledWith("+44 7802424496");
      });
    });

    describe("when region is Unknown", () => {
      itWillValidateInput("Unknown");

      it("will return the correct phone number with formatting", () => {
        const onChangeHandler = jest.fn();
        const rendered = render(
          <InputPhoneNumber
            region={"Unknown"}
            placeholder="Phone Number"
            onChange={onChangeHandler}
          />,
        );
        const numberInput = rendered.getByLabelText(
          "Phone Number",
        ) as HTMLInputElement;

        fireEvent.change(numberInput, {
          target: { value: "7802424496" },
        });

        expect(onChangeHandler).toHaveBeenCalledWith("7802424496");
      });

      it("will return the correct phone number with formatting and country code (no country code for unknown)", () => {
        const onChangeHandler = jest.fn();
        const rendered = render(
          <InputPhoneNumber
            region={"Unknown"}
            placeholder="Phone Number"
            showCountryCode={true}
            onChange={onChangeHandler}
          />,
        );
        const numberInput = rendered.getByLabelText(
          "Phone Number",
        ) as HTMLInputElement;

        fireEvent.change(numberInput, {
          target: { value: "7802424496" },
        });

        expect(onChangeHandler).toHaveBeenCalledWith("7802424496");
      });
    });

    describe("when region is not provided", () => {
      itWillValidateInput(undefined);

      it("will return a NorthAmerican formatting", () => {
        const onChangeHandler = jest.fn();
        const rendered = render(
          <InputPhoneNumber
            placeholder="Phone Number"
            onChange={onChangeHandler}
          />,
        );
        const numberInput = rendered.getByLabelText(
          "Phone Number",
        ) as HTMLInputElement;

        fireEvent.change(numberInput, {
          target: { value: "7802424496" },
        });

        expect(onChangeHandler).toHaveBeenCalledWith("(780) 242-4496");
      });
    });
  });

  describe("alwaysShowMask", () => {
    it("will hide the mask until the user begins to enter valid input", () => {
      const rendered = render(
        <InputPhoneNumber
          region={"NorthAmerica"}
          placeholder="Phone Number"
          alwaysShowMask={false}
        />,
      );
      const numberInput = rendered.getByLabelText(
        "Phone Number",
      ) as HTMLInputElement;

      expect(numberInput.value).toBe("");

      fireEvent.change(numberInput, {
        target: { value: "7802424496" },
      });

      expect(numberInput.value).toBe("(780) 242-4496");
    });
  });
});

function itWillValidateInput(region?: keyof AllowedRegions) {
  it("will only accept numerical characters", () => {
    const onChangeHandler = jest.fn();

    const rendered = render(
      <InputPhoneNumber
        region={region}
        placeholder="Phone Number"
        onChange={onChangeHandler}
      />,
    );
    const numberInput = rendered.getByLabelText(
      "Phone Number",
    ) as HTMLInputElement;

    fireEvent.change(numberInput, {
      target: { value: "abcde~!@#$%^&*()_+={}[]\\|`?/\"'`" },
    });

    expect(onChangeHandler).toHaveBeenCalledTimes(0);
  });
}
