import React from "react";
import renderer, { act } from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { FormatFile } from ".";

afterEach(cleanup);

it("renders a FormatFile", () => {
  const testFile = {
    key: "123",
    name: "Funky Corn",
    type: "audio/ogg",
    size: 1024,
    progress: 1,
  };
  const tree = renderer.create(<FormatFile file={testFile} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders an image FormatFile file a src", () => {
  const testFile = {
    key: "234",
    name: "Onion",
    type: "image/png",
    size: 102432,
    progress: 0.1,
    src: () => Promise.resolve("not_actually_a_url"),
  };
  const tree = renderer.create(<FormatFile file={testFile} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("it should call the delete handler", () => {
  const testFile = {
    key: "234",
    name: "TPS Reports",
    type: "application/pdf",
    size: 1022,
    progress: 1,
  };
  const deleteHandler = jest.fn();
  const { getByLabelText } = render(
    <FormatFile onDelete={deleteHandler} file={testFile} />,
  );

  act(() => {
    fireEvent.click(getByLabelText("Delete"));
  });

  expect(deleteHandler).toHaveBeenCalled();
});
