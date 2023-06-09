import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import RNLocalize from "react-native-localize";
import { InputCurrency } from "./InputCurrency";
import { AtlantisContext, AtlantisContextProps } from "../AtlantisContext";

const mockCurrencySymbol = "£";
const atlantisContext: AtlantisContextProps = {
  currencySymbol: mockCurrencySymbol,
  timeFormat: "p",
  timeZone: RNLocalize.getTimeZone(),
  isOnline: true,
  onLogError: err => {
    return err;
  },
  floatSeparators: { group: ",", decimal: "." },
};
const placeHolder = "Price";
describe.each([{ includeATLContext: true }, { includeATLContext: false }])(
  "Has AtlantisContext: $includeATLContext",
  ({ includeATLContext }) => {
    function setup({
      showCurrencySymbol,
      name,
    }: {
      showCurrencySymbol?: boolean;
      name: string;
    }) {
      if (includeATLContext) {
        return render(
          <AtlantisContext.Provider value={atlantisContext}>
            <InputCurrency
              placeholder={placeHolder}
              name={name}
              showCurrencySymbol={showCurrencySymbol}
            />
          </AtlantisContext.Provider>,
        );
      } else {
        return render(
          <InputCurrency
            placeholder={placeHolder}
            name={name}
            showCurrencySymbol={showCurrencySymbol}
          />,
        );
      }
    }

    it("renders with currency symbol when the value is input", () => {
      const { getByText, getByLabelText } = setup({
        name: "sample",
      });
      const value = 123.459119;
      const expectedCurrencySymbol = includeATLContext
        ? mockCurrencySymbol
        : "$";
      fireEvent.changeText(getByLabelText(placeHolder), `${value}`);

      expect(getByText(expectedCurrencySymbol)).toBeDefined();
    });

    it("renders without currency symbol", () => {
      const { queryByText, getByLabelText } = setup({
        name: "sample",
        showCurrencySymbol: false,
      });
      const value = 123.459119;

      fireEvent.changeText(getByLabelText(placeHolder), `${value}`);
      expect(queryByText(mockCurrencySymbol)).toBeNull();
    });

    it("displays a maximum 5 decimal places", async () => {
      const value = 123.459119;
      const { getByLabelText, getByDisplayValue } = setup({
        name: "sample",
      });

      fireEvent.changeText(getByLabelText(placeHolder), `${value}`);
      fireEvent(getByLabelText("Price"), "blur");
      fireEvent(getByLabelText("Price"), "blur");

      await waitFor(() => {
        expect(getByDisplayValue("123.45912")).toBeDefined();
      });
    });

    it("displays a minimum of 2 decimal places", async () => {
      const value = 123.11;
      const { getByLabelText, getByDisplayValue } = setup({ name: "sample" });

      fireEvent.changeText(getByLabelText(placeHolder), `${value}`);
      fireEvent(getByLabelText("Price"), "blur");

      await waitFor(() => {
        expect(getByDisplayValue("123.11")).toBeDefined();
      });
    });

    it("displays a negative value", async () => {
      const value = -509.543;
      const { getByLabelText, getByDisplayValue } = setup({ name: "sample" });

      fireEvent.changeText(getByLabelText(placeHolder), `${value}`);
      fireEvent(getByLabelText("Price"), "blur");

      await waitFor(() => {
        expect(getByDisplayValue(`${value}`)).toBeDefined();
      });
    });

    it("internationalizes the display Value in the input", async () => {
      const value = 5098.543;
      const { getByLabelText, getByDisplayValue } = setup({ name: "sample" });

      fireEvent.changeText(getByLabelText(placeHolder), `${value}`);
      fireEvent(getByLabelText("Price"), "blur");

      await waitFor(() => {
        expect(getByDisplayValue("5,098.543")).toBeDefined();
      });
    });

    it("limits the whole number integer to 10 whole integers by default", async () => {
      const value = 12345678998;
      const { getByLabelText, getByDisplayValue } = setup({ name: "sample" });

      fireEvent.changeText(getByLabelText(placeHolder), `${value}`);

      await waitFor(() => {
        expect(getByDisplayValue("1,234,567,899")).toBeDefined();
      });
    });

    it("rounds the decimal point if there are more decimal numbers than the maxDecimalCount", async () => {
      const value = 123456.789988;
      const { getByLabelText, getByDisplayValue } = setup({ name: "sample" });

      fireEvent.changeText(getByLabelText(placeHolder), `${value}`);
      fireEvent(getByLabelText("Price"), "blur");

      await waitFor(() => {
        expect(getByDisplayValue("123,456.78999")).toBeDefined();
      });
    });

    it("displays 0 on blur if there is no inputted value or the field.value is undefined", async () => {
      const { getByLabelText, getByDisplayValue } = setup({ name: "sample" });

      fireEvent(getByLabelText("Price"), "blur");

      await waitFor(() => {
        expect(getByDisplayValue("0")).toBeDefined();
      });
    });
  },
);
