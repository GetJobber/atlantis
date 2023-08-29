import React, { createRef } from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { AccessibilityInfo, View } from "react-native";
import { Host } from "react-native-portalize";
import { ReactTestInstance, act } from "react-test-renderer";
import {
  ContentOverlay,
  ContentOverlayRef,
  ModalBackgroundColor,
} from "./ContentOverlay";
import { tokens } from "../utils/design";
import { Button } from "../Button";
import { Content } from "../Content";
import { Text } from "../Text";

jest.unmock("../hooks/useIsScreenReaderEnabled");
function fireLayoutEvent(childrenContent: ReactTestInstance) {
  fireEvent(childrenContent, "onLayout", {
    nativeEvent: {
      layout: {
        height: 100,
      },
    },
  });
}

interface testRendererOptions {
  text: string;
  title: string;
  buttonLabel: string;
  a11yLabel?: string;
  fullScreen?: boolean;
  showDismiss?: boolean;
  modalBackgroundColor?: ModalBackgroundColor;
  onCloseCallback?: () => void;
  onOpenCallback?: () => void;
  onBeforeExitCallback?: () => void;
}

function getDefaultOptions(): testRendererOptions {
  return {
    text: "I am the contentOverlay text",
    title: "Title",
    buttonLabel: "Open Content Overlay",
    fullScreen: false,
    showDismiss: false,
    modalBackgroundColor: "surface",
    onCloseCallback: () => {
      return;
    },
    onOpenCallback: () => {
      return;
    },
  };
}

function renderContentOverlay(
  {
    text,
    title,
    buttonLabel,
    a11yLabel,
    fullScreen,
    showDismiss,
    modalBackgroundColor,
    onCloseCallback,
    onOpenCallback,
    onBeforeExitCallback,
  } = getDefaultOptions(),
) {
  const contentOverlayRef = createRef<ContentOverlayRef>();

  const renderResult = render(
    <Host>
      <View>
        <Text>I am a bunch of text</Text>
        <Button
          label={buttonLabel}
          onPress={() => {
            contentOverlayRef?.current?.open?.();
          }}
        />
        <ContentOverlay
          ref={contentOverlayRef}
          title={title}
          onClose={onCloseCallback}
          onOpen={onOpenCallback}
          accessibilityLabel={a11yLabel}
          fullScreen={fullScreen}
          showDismiss={showDismiss}
          modalBackgroundColor={modalBackgroundColor}
          onBeforeExit={onBeforeExitCallback}
        >
          <Content>
            <Text>{text}</Text>
          </Content>
        </ContentOverlay>
      </View>
    </Host>,
  );

  const childrenView = renderResult.getByTestId("ATL-Overlay-Children");
  fireLayoutEvent(childrenView);
  const headerComponent = renderResult.getByTestId("ATL-Overlay-Header");
  fireLayoutEvent(headerComponent);

  return renderResult;
}

function renderAndOpenContentOverlay(defaultOptions = getDefaultOptions()) {
  const rendered = renderContentOverlay(defaultOptions);

  act(() => {
    fireEvent.press(rendered.getByLabelText(defaultOptions.buttonLabel));
  });

  return rendered;
}

describe("when open is called on the content overlay ref", () => {
  it("should open the content overlay, exposing the content to the user", () => {
    const options: testRendererOptions = {
      ...getDefaultOptions(),
      text: "I am text within the content overlay",
    };
    const contentOverlayScreen = renderAndOpenContentOverlay(options);

    expect(contentOverlayScreen.getByText(options.text)).toBeDefined();
  });
});

describe("when the close button is clicked on an open content overlay", () => {
  it("should close the content overlay", async () => {
    const options: testRendererOptions = {
      ...getDefaultOptions(),
      text: "I am text within the content overlay",
      showDismiss: true,
    };
    const contentOverlayScreen = renderAndOpenContentOverlay(options);

    act(() => {
      fireEvent.press(
        contentOverlayScreen.getByTestId("ATL-Overlay-CloseButton"),
      );
    });

    await waitFor(() => {
      expect(contentOverlayScreen.queryByText(options.text)).toBeNull();
    });
  });
});

describe("when the close button is clicked on an open content overlay with a defined onClose prop", () => {
  it("should call the passed in onClose prop", async () => {
    const options: testRendererOptions = {
      ...getDefaultOptions(),
      onCloseCallback: jest.fn(),
      showDismiss: true,
    };
    const contentOverlayScreen = renderAndOpenContentOverlay(options);

    act(() => {
      fireEvent.press(
        contentOverlayScreen.getByTestId("ATL-Overlay-CloseButton"),
      );
    });

    await waitFor(() => {
      expect(options.onCloseCallback).toHaveBeenCalled();
    });
  });
});

describe("when the content overlay is created with a defined onOpen prop", () => {
  describe("when the content overlay is not opened", () => {
    it("should not call the passed in onOpen prop", async () => {
      const options: testRendererOptions = {
        ...getDefaultOptions(),
        onOpenCallback: jest.fn(),
      };
      renderContentOverlay(options);

      await waitFor(() => {
        expect(options.onOpenCallback).not.toHaveBeenCalled();
      });
    });
  });

  describe("when the content overlay is opened", () => {
    it("should call the passed in onOpen prop", async () => {
      const options: testRendererOptions = {
        ...getDefaultOptions(),
        onOpenCallback: jest.fn(),
      };
      renderAndOpenContentOverlay(options);

      await waitFor(() => {
        expect(options.onOpenCallback).toHaveBeenCalled();
      });
    });
  });
});

describe("when title prop passed to content overlay", () => {
  it("should set the header title", () => {
    const options: testRendererOptions = {
      ...getDefaultOptions(),
      title: "Awesome Title",
    };
    const contentOverlayScreen = renderAndOpenContentOverlay(options);

    expect(contentOverlayScreen.getByText(options.title)).toBeDefined();
  });
});

describe("when accessibilityLabel prop passed to content overlay", () => {
  it("should set the header accessibilityLabel", () => {
    const options: testRendererOptions = {
      ...getDefaultOptions(),
      a11yLabel: "Awesome a11y Label",
      showDismiss: true,
    };
    const contentOverlayScreen = renderAndOpenContentOverlay(options);

    expect(
      contentOverlayScreen.getByLabelText(options.a11yLabel || "ohno"),
    ).toBeDefined();
  });
});

describe("when accessibilityLabel prop NOT passed to content overlay", () => {
  it("should use default accessibilityLabel", () => {
    const options: testRendererOptions = {
      ...getDefaultOptions(),
      title: "Awesome Title",
      showDismiss: true,
    };
    const contentOverlayScreen = renderAndOpenContentOverlay(options);

    expect(
      contentOverlayScreen.getAllByLabelText(`Close ${options.title} modal`),
    ).toHaveLength(2);
  });
});

describe("when there is a screen reader enabled", () => {
  jest
    .spyOn(AccessibilityInfo, "isScreenReaderEnabled")
    .mockImplementation(() => Promise.resolve(true));

  it("should show the dismiss button", async () => {
    const options: testRendererOptions = {
      ...getDefaultOptions(),
    };
    const contentOverlayScreen = renderAndOpenContentOverlay(options);

    expect(
      await contentOverlayScreen.findByTestId("ATL-Overlay-CloseButton"),
    ).toBeDefined();
  });
});

describe("when fullScreen is set to true", () => {
  it("should show the dismiss button", () => {
    const options: testRendererOptions = {
      ...getDefaultOptions(),
      fullScreen: true,
    };
    const contentOverlayScreen = renderAndOpenContentOverlay(options);
    expect(
      contentOverlayScreen.getByTestId("ATL-Overlay-CloseButton"),
    ).toBeDefined();
  });
});

describe("when showDismiss is set to true", () => {
  it("should show the dismiss button", () => {
    const options: testRendererOptions = {
      ...getDefaultOptions(),
      showDismiss: true,
    };
    const contentOverlayScreen = renderAndOpenContentOverlay(options);
    expect(
      contentOverlayScreen.getByTestId("ATL-Overlay-CloseButton"),
    ).toBeDefined();
  });
});

describe("when the close button is clicked on an open content overlay with a defined onBeforeExit", () => {
  it("should call the callback method on exit", async () => {
    const options: testRendererOptions = {
      ...getDefaultOptions(),
      onBeforeExitCallback: jest.fn(),
      showDismiss: true,
    };
    const contentOverlayScreen = renderAndOpenContentOverlay(options);

    act(() => {
      fireEvent.press(
        contentOverlayScreen.getByTestId("ATL-Overlay-CloseButton"),
      );
    });

    await waitFor(() => {
      expect(options.onBeforeExitCallback).toHaveBeenCalled();
    });
  });
});

describe("modalBackgroundColor prop", () => {
  describe("when using the default surface value", () => {
    it("renders the component with the color-surface color", () => {
      const options: testRendererOptions = {
        ...getDefaultOptions(),
      };
      const contentOverlayScreen = renderAndOpenContentOverlay(options);
      const OverlayHeader = contentOverlayScreen.getByTestId(
        "ATL-Overlay-Header",
      ).children[0] as ReactTestInstance;
      const OverlayHeaderStyles = OverlayHeader.props.style;

      expect(OverlayHeaderStyles).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            backgroundColor: tokens["color-surface"],
          }),
        ]),
      );

      expect(OverlayHeaderStyles).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            backgroundColor: tokens["color-surface--background"],
          }),
        ]),
      );
    });
  });

  describe("when set to background", () => {
    it("changes the backround color of the modal to color-surface--background", () => {
      const options: testRendererOptions = {
        ...getDefaultOptions(),
        modalBackgroundColor: "background",
      };
      const contentOverlayScreen = renderAndOpenContentOverlay(options);
      const OverlayHeader = contentOverlayScreen.getByTestId(
        "ATL-Overlay-Header",
      ).children[0] as ReactTestInstance;
      const OverlayHeaderStyles = OverlayHeader.props.style;

      expect(OverlayHeaderStyles).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            backgroundColor: tokens["color-surface--background"],
          }),
        ]),
      );
    });
  });
});
