import { render } from "@testing-library/react";
import React, { ReactPortal } from "react";
import ReactDOM from "react-dom";
import { LightBox } from ".";

describe("Images", () => {
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn(element => {
      return element as ReactPortal;
    });
  });

  afterEach(() => {
    (ReactDOM.createPortal as jest.Mock).mockClear();
  });

  test("renders an image", () => {
    const title = "Dis be a title";
    const caption = "Dis be a caption 🎉";
    const handleClose = jest.fn();
    const { container } = render(
      <LightBox
        open={true}
        images={[
          {
            title: title,
            caption: caption,
            url: "https://i.imgur.com/6Jcfgnp.jpg",
          },
        ]}
        onRequestClose={handleClose}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
