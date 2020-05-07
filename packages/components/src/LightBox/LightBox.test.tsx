import React from "react";
import { cleanup, render } from "@testing-library/react";
import { LightBox } from ".";

afterEach(cleanup);

test("Lightbox opens and shows the image", () => {
  const title = "Dis be a title";
  const caption = "Dis be a caption 🎉";
  const handleClose = jest.fn();

  const { queryByText } = render(
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

  expect(queryByText(title)).toBeTruthy();
  expect(queryByText(caption)).toBeTruthy();
});

test("lightbox doesn't show up", () => {
  const title = "Dis be a title";
  const caption = "Dis be a caption 🎉";
  const handleClose = jest.fn();

  const { queryByText } = render(
    <LightBox
      open={false}
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

  expect(queryByText(title)).toBeNull();
  expect(queryByText(caption)).toBeNull();
});
