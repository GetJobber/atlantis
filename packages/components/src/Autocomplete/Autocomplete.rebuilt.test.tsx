import { render, screen } from "@testing-library/react";
import React from "react";
import { AutocompleteRebuilt } from "./Autocomplete.rebuilt";

describe("AutocompleteRebuilt", () => {
  it("renders", () => {
    const onChange = jest.fn();
    const getOptions = jest.fn();
    render(
      <AutocompleteRebuilt
        version={2}
        options={[]}
        value={undefined}
        onChange={onChange}
        getOptions={getOptions}
        placeholder=""
      />,
    );
    expect(screen.getByTestId("ATL-AutocompleteRebuilt")).toBeInTheDocument();
  });
});
