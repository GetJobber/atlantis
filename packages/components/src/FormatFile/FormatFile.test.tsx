import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
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

it("renders an image when provided as src", (done) => {
  const url = "not_actually_a_url";
  const testFile = {
    key: "234",
    name: "Onion",
    type: "image/png",
    size: 102432,
    progress: 0.1,
    src: () => Promise.resolve(url),
  };

  const { queryByTestId } = render(<FormatFile file={testFile} />);
  const imageBlockDiv = queryByTestId("imageBlock");

  waitFor(() => {
    expect(imageBlockDiv).toHaveStyle(`background-image: url(${url})`);
    done();
  });
});

it("it should call the delete handler", () => {
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

  fireEvent.click(getByLabelText("Delete"));

  expect(deleteHandler).toHaveBeenCalled();
});
