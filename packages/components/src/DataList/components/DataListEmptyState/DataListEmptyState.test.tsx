import React from "react";
import { render, screen } from "@testing-library/react";
import {
  DataListEmptyState,
  InternalDataListEmptyState,
} from "./DataListEmptyState";
import { DataListContext, defaultValues } from "../../context/DataListContext";
import {
  EMPTY_FILTER_RESULTS_MESSAGE,
  EMPTY_RESULTS_MESSAGE,
  EMPTY_STATE_ACTION_BUTTON_ONLY_ERROR,
} from "../../DataList.const";
import { Button } from "../../../Button";

describe("DataListEmptyState", () => {
  it("should not render anything", () => {
    render(
      <DataListEmptyState
        key="1"
        message="A message"
        action={<Button label="Click" />}
      />,
    );

    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });
});

describe("InternalDataListEmptyState", () => {
  it("should render the default empty state when no empty state components are passed", () => {
    render(
      <DataListContext.Provider value={defaultValues}>
        <InternalDataListEmptyState />
      </DataListContext.Provider>,
    );

    expect(screen.getByText(EMPTY_RESULTS_MESSAGE)).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("should render the default 'filtered' empty state when no empty state components are passed", () => {
    render(
      <DataListContext.Provider value={{ ...defaultValues, filtered: true }}>
        <InternalDataListEmptyState />
      </DataListContext.Provider>,
    );

    expect(screen.getByText(EMPTY_FILTER_RESULTS_MESSAGE)).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("should render a custom message and an action", () => {
    const message = "I am empty";
    const actionLabel = "Click me";
    render(
      <DataListContext.Provider
        value={{
          ...defaultValues,
          emptyStateComponents: [
            <DataListEmptyState
              key="1"
              message={message}
              action={<Button label={actionLabel} />}
            />,
          ],
        }}
      >
        <InternalDataListEmptyState />
      </DataListContext.Provider>,
    );

    expect(screen.getByText(message)).toBeInTheDocument();
    expect(screen.getByText(actionLabel)).toBeInTheDocument();
  });

  it("should not render an action if it's not a Button component", () => {
    const component = () =>
      render(
        <DataListContext.Provider
          value={{
            ...defaultValues,
            emptyStateComponents: [
              <DataListEmptyState
                key="1"
                message="I am empty"
                action={<a href="#">Go</a>}
              />,
            ],
          }}
        >
          <InternalDataListEmptyState />
        </DataListContext.Provider>,
      );

    expect(component).toThrow(EMPTY_STATE_ACTION_BUTTON_ONLY_ERROR);
  });
});
