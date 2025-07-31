import { render, screen } from "@testing-library/react";
import React from "react";
import { AutocompleteRebuilt } from "./Autocomplete.rebuilt";

describe("AutocompleteRebuilt", () => {
  it("renders", () => {
    const onChange = jest.fn();
    const onInputChange = jest.fn();
    render(
      <AutocompleteRebuilt
        version={2}
        value={undefined}
        onChange={onChange}
        inputValue=""
        onInputChange={onInputChange}
        menu={[
          {
            type: "options",
            options: [
              {
                label: "Option 1",
                value: "option-1",
              },
              {
                label: "Option 2",
                value: "option-2",
              },
            ],
          },
        ]}
        filterOptions={() => true}
        getOptionLabel={option => option.label || ""}
        getOptionValue={option => option.value || ""}
        placeholder=""
      />,
    );
    expect(screen.getByTestId("ATL-AutocompleteRebuilt")).toBeInTheDocument();
  });
});
