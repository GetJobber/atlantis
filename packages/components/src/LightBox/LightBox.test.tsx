import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
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

  expect(queryByText(title)).toBeInstanceOf(HTMLElement);
  expect(queryByText(caption)).toBeInstanceOf(HTMLElement);
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

test("lightbox closes when user clicks close", () => {
  const title = "Dis be a title";
  const caption = "Dis be a caption 🎉";

  //This expect is called from the close function as the react-image-lightbox
  //library has an easing animation that occurs before the close function is
  //called. This avoids an arbitrary setTimeout in our test.
  const handleClose = jest.fn(() => {
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  const { getByLabelText } = render(
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

  fireEvent.click(getByLabelText("Close"));
});

test("Lightbox displays the selected imageIndex", () => {
  const title = "Dis be a title";
  const caption = "Dis be a caption 🎉";
  const titleTwo = "FirstOne";
  const captionTwo = "This is the one we should find";
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
        {
          title: titleTwo,
          caption: captionTwo,
          url: "https://i.imgur.com/6Jcfgnp.jpg",
        },
      ]}
      imageIndex={1}
      onRequestClose={handleClose}
    />,
  );

  expect(queryByText(titleTwo)).toBeInstanceOf(HTMLElement);
  expect(queryByText(title)).toBeNull();
});
