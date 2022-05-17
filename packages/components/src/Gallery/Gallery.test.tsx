import React from "react";
import renderer, { act } from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Gallery } from ".";

afterEach(cleanup);

const files = [
  {
    key: "abc",
    name: "myballisbigandroundIamrollingitontheground.png",
    type: "image/png",
    size: 213402324,
    progress: 1,
    src: "https://source.unsplash.com/250x250",
  },
  {
    key: "def",
    name: "iamanimage.png",
    type: "image/png",
    size: 124525234,
    progress: 1,
    src: "https://source.unsplash.com/250x250",
  },
  {
    key: "efg",
    name: "upanddown.png",
    type: "image/png",
    size: 233411234,
    progress: 1,
    src: "https://source.unsplash.com/250x250",
  },
  {
    key: "jkl",
    name: "kramer.png",
    type: "image/png",
    size: 233411234,
    progress: 1,
    src: "https://source.unsplash.com/250x250",
  },
  {
    key: "mno",
    name: "boston.png",
    type: "image/png",
    size: 233411234,
    progress: 1,
    src: "https://source.unsplash.com/250x250",
  },
];

it("renders a Gallery", () => {
  const tree = renderer.create(<Gallery files={files} />);
  expect(tree).toMatchSnapshot();
});

describe("when the gallery is large", () => {
  it("displays large thumbnails", () => {
    const tree = renderer.create(<Gallery size="large" files={files} />);
    expect(tree).toMatchSnapshot();
  });
});

describe("when the gallery has a maximum", () => {
  it("only displays the thumbnails up to the maximum", () => {
    const maxImages = 2;
    const { queryAllByTestId } = render(
      <Gallery max={maxImages} files={files} />,
    );
    const imageBlockDivs = queryAllByTestId("imageBlock");

    expect(imageBlockDivs.length).toEqual(maxImages);
  });

  describe("when the plus button is clicked", () => {
    it("displays the rest of the images", async () => {
      const maxImages = 2;
      const { getByText, queryAllByTestId } = render(
        <Gallery max={maxImages} files={files} />,
      );

      await act(() => {
        fireEvent.click(getByText(`+ ${files.length - maxImages}`));
      });

      const imageBlockDivs = queryAllByTestId("imageBlock");

      expect(imageBlockDivs.length).toEqual(files.length);
    });
  });

  describe("when the a gallery thumbnail is clicked", () => {
    it("opens the lightbox", async () => {
      const { queryAllByTestId, getByLabelText } = render(
        <Gallery files={files} />,
      );

      const imageBlockDivs = queryAllByTestId("imageBlock");

      await act(() => {
        fireEvent.click(imageBlockDivs[0]);
      });

      expect(getByLabelText("Lightbox")).not.toBeNull();
    });
  });
});
