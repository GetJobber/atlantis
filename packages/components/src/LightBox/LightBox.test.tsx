import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BREAKPOINT_SIZES, mockViewportWidth } from "@jobber/hooks";
import { LightBox } from ".";
import * as POM from "./LightBox.pom";

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

    render(
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

    fireEvent.click(POM.getCloseButton());
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
            url: "https://example.com/photo.jpg",
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
      expect(POM.getPreviousButton()).toBeInTheDocument();
      expect(POM.getNextButton()).toBeInTheDocument();
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
      expect(POM.getPreviousButton()).toBeNull();
      expect(POM.getNextButton()).toBeNull();
    });

    test("applies correct slide direction when changing from next to previous", async () => {
      const images = [
        { title: "Title 0", alt: "alt-0", url: "https://example.com/0.jpg" },
        { title: "Title 1", alt: "alt-1", url: "https://example.com/1.jpg" },
      ];

      render(
        <LightBox
          open={true}
          images={images}
          imageIndex={0}
          onRequestClose={jest.fn()}
        />,
      );

      await POM.goNextThenPreviousWithRealTimers(250);

      await new Promise(resolve => setTimeout(resolve, 50));

      const { enteringImg, exitingImg } = POM.getSlideImagesByAlt(
        "alt-0",
        "alt-1",
      );
      expect(enteringImg).toBeDefined();
      expect(exitingImg).toBeDefined();

      const { enteringTransform, exitingTransform } = POM.getSlideTransforms(
        enteringImg as HTMLElement,
        exitingImg as HTMLElement,
      );
      expect(enteringTransform).toMatch(/translateX\(-/);
      expect(exitingTransform).toMatch(/translateX\(\d/);
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
      expect(POM.getThumbnailBar()).toBeInTheDocument();
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
      expect(POM.getThumbnailBar()).not.toBeInTheDocument();
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

      fireEvent.click(POM.getThumbnailByAlt(destinationImageAlt));

      const imagesWithAlt = screen.getAllByAltText(destinationImageAlt);
      expect(imagesWithAlt).toHaveLength(2);

      expect(screen.queryByText(destinationImageCaption)).toBeInTheDocument();
    });
  });
});
