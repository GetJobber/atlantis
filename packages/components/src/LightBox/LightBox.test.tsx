import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BREAKPOINT_SIZES, mockViewportWidth } from "@jobber/hooks";
import { LightBox } from ".";

const { setViewportWidth } = mockViewportWidth();

describe("LightBox", () => {
  beforeEach(() => {
    setViewportWidth(BREAKPOINT_SIZES.lg);
    HTMLDivElement.prototype.scrollIntoView = jest.fn();
  });
  test("opens and shows the image", () => {
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

  test("doesn't display when the open prop is false", () => {
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

  test("closes when user clicks close", () => {
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

  test("displays the image title of the selected imageIndex", () => {
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

    expect(queryByText(titleTwo)).toBeInTheDocument();
    expect(queryByText(title)).toBeNull();
  });

  describe("print styles", () => {
    test("toggles the atlantisLightBoxActive class on the html element", () => {
      const props = {
        images: [
          {
            title: "title",
            caption: "caption",
            url: "",
          },
        ],
        onRequestClose: jest.fn(),
      };

      const { rerender } = render(<LightBox open={false} {...props} />);

      rerender(<LightBox open={true} {...props} />);
      expect(document.documentElement.classList).toContain(
        "atlantisLightBoxActive",
      );

      rerender(<LightBox open={false} {...props} />);
      expect(document.documentElement.classList).not.toContain(
        "atlantisLightBoxActive",
      );
    });
  });

  describe("navigation buttons", () => {
    test("displays the next and previous buttons when more than one image", () => {
      render(
        <LightBox
          open={true}
          images={[
            {
              title: "Dis be a title",
              caption: "Dis be a caption 🎉",
              url: "https://i.imgur.com/6Jcfgnp.jpg",
            },
            {
              title: "Title two",
              caption: "This is the one we should find",
              url: "https://i.imgur.com/6Jcfgnp.jpg",
            },
          ]}
          imageIndex={1}
          onRequestClose={jest.fn()}
        />,
      );
      expect(screen.queryByLabelText("Previous image")).toBeInTheDocument();
      expect(screen.queryByLabelText("Next image")).toBeInTheDocument();
    });

    test("doesn't display the next and previous buttons when only one image", () => {
      render(
        <LightBox
          open={true}
          images={[
            {
              title: "Dis be a title",
              caption: "Dis be a caption 🎉",
              url: "https://i.imgur.com/6Jcfgnp.jpg",
            },
          ]}
          imageIndex={0}
          onRequestClose={jest.fn()}
        />,
      );
      expect(screen.queryByLabelText("Previous image")).toBeNull();
      expect(screen.queryByLabelText("Next image")).toBeNull();
    });
  });

  describe("thumbnail bar", () => {
    test("displays with images when more than one image", () => {
      const handleClose = jest.fn();

      render(
        <LightBox
          open={true}
          images={[
            {
              title: "title of unselected image",
              alt: "alt of unselected image",
              caption: "caption",
              url: "https://i.imgur.com/6Jcfgnp.jpg",
            },
            {
              title: "titleTwo",
              alt: "alt 1",
              caption: "captionTwo",
              url: "https://i.imgur.com/6Jcfgnp.jpg",
            },
          ]}
          imageIndex={1}
          onRequestClose={handleClose}
        />,
      );
      expect(
        screen.queryByAltText("alt of unselected image"),
      ).toBeInTheDocument();
      expect(screen.queryByTestId("ATL-Thumbnail-Bar")).toBeInTheDocument();
    });

    test("doesn't display when there is only one image", () => {
      const handleClose = jest.fn();

      render(
        <LightBox
          open={true}
          images={[
            {
              title: "title",
              caption: "caption",
              url: "https://i.imgur.com/6Jcfgnp.jpg",
            },
          ]}
          imageIndex={0}
          onRequestClose={handleClose}
        />,
      );
      expect(screen.queryByTestId("thumbnail-bar")).not.toBeInTheDocument();
    });

    test("displays the selected image thumbnail and caption when imageclicked", () => {
      const handleClose = jest.fn();
      const destinationImageCaption = "caption of destination image";
      const destinationImageAlt = "alt of destination image";

      render(
        <LightBox
          open={true}
          images={[
            {
              title: "title of destination image",
              caption: destinationImageCaption,
              alt: destinationImageAlt,
              url: "https://i.imgur.com/6Jcfgnp.jpg",
            },
            {
              title: "initially selected image title",
              caption: "initially selected image caption",
              url: "https://i.imgur.com/6Jcfgnp.jpg",
            },
          ]}
          imageIndex={1}
          onRequestClose={handleClose}
        />,
      );

      expect(
        screen.queryByText(destinationImageCaption),
      ).not.toBeInTheDocument();

      const destinationImage = screen.getByAltText(destinationImageAlt);
      fireEvent.click(destinationImage);

      const imagesWithAlt = screen.getAllByAltText(destinationImageAlt);
      expect(imagesWithAlt).toHaveLength(2);

      expect(screen.queryByText(destinationImageCaption)).toBeInTheDocument();
    });
  });
});
