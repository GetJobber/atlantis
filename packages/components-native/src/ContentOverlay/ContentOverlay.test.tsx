import React, { createRef } from "react";
import {
  act,
  render,
  screen,
  userEvent,
  waitFor,
} from "@testing-library/react-native";
import { AccessibilityInfo, View } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import type { ReactTestInstance } from "react-test-renderer";
import type { ContentOverlayRef, ModalBackgroundColor } from "./types";
import { ContentOverlay } from "./ContentOverlay";
import { tokens } from "../utils/design";
import { Button } from "../Button";
import { Content } from "../Content";
import { Text } from "../Text";

jest.unmock("../hooks/useIsScreenReaderEnabled");
jest.unmock("react-native-reanimated");
jest.unmock("@gorhom/bottom-sheet");
jest.mock("@gorhom/bottom-sheet/lib/commonjs/hooks/useAnimatedLayout", () => ({
  // Fix for reanimated not actually running in the test environment.
  useAnimatedLayout: () => {
    const value = {
      containerHeight: 600,
      rawContainerHeight: 600,
      handleHeight: 24,
      footerHeight: 0,
      contentHeight: 400,
      containerOffset: { top: 0, bottom: 0, left: 0, right: 0 },
    };

    return { value, get: () => value };
  },
}));

const user = userEvent.setup();

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

  render(
    <BottomSheetModalProvider>
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
    </BottomSheetModalProvider>,
  );
}

async function renderAndOpenContentOverlay(
  defaultOptions = getDefaultOptions(),
) {
  jest.useFakeTimers();
  const props = {
    onOpenCallback: jest.fn(),
    onCloseCallback: jest.fn(),
    ...defaultOptions,
  };

  renderContentOverlay(props);

  await user.press(screen.getByLabelText(defaultOptions.buttonLabel));
  await act(async () => {
    jest.runAllTimers();
  });

  await waitFor(() => {
    expect(screen.getByTestId("ATL-Overlay-Header")).toBeDefined();
    expect(props.onOpenCallback).toHaveBeenCalledTimes(1);
  });
}

describe("when open is called on the content overlay ref", () => {
  it("should open the content overlay, exposing the content to the user", async () => {
    const options: testRendererOptions = {
      ...getDefaultOptions(),
      text: "I am text within the content overlay",
    };
    await renderAndOpenContentOverlay(options);

    expect(screen.getByText(options.text)).toBeDefined();
  });
});

describe("when the close button is clicked on an open content overlay", () => {
  it("should close the content overlay", async () => {
    const options: testRendererOptions = {
      ...getDefaultOptions(),
      text: "I am text within the content overlay",
      showDismiss: true,
    };
    await renderAndOpenContentOverlay(options);

    const closeButton = await screen.findByTestId("ATL-Overlay-CloseButton");
    await user.press(closeButton);
    await act(async () => {
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(screen.queryByText(options.text)).toBeNull();
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
    await renderAndOpenContentOverlay(options);

    const closeButton = await screen.findByTestId("ATL-Overlay-CloseButton");
    await user.press(closeButton);
    await act(async () => {
      jest.runAllTimers();
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
      await renderAndOpenContentOverlay(options);

      await waitFor(() => {
        expect(options.onOpenCallback).toHaveBeenCalled();
      });
    });
  });
});

describe("when title prop passed to content overlay", () => {
  it("should set the header title", async () => {
    const options: testRendererOptions = {
      ...getDefaultOptions(),
      title: "Awesome Title",
    };
    await renderAndOpenContentOverlay(options);

    expect(screen.getByText(options.title)).toBeDefined();
  });
});

describe("when accessibilityLabel prop passed to content overlay", () => {
  it("should set the header accessibilityLabel", async () => {
    const options: testRendererOptions = {
      ...getDefaultOptions(),
      a11yLabel: "Awesome a11y Label",
      showDismiss: true,
    };
    await renderAndOpenContentOverlay(options);

    expect(screen.getByLabelText(options.a11yLabel || "ohno")).toBeDefined();
  });
});

describe("when accessibilityLabel prop NOT passed to content overlay", () => {
  it("should use default accessibilityLabel", async () => {
    const options: testRendererOptions = {
      ...getDefaultOptions(),
      title: "Awesome Title",
      showDismiss: true,
    };
    await renderAndOpenContentOverlay(options);

    expect(
      screen.getAllByLabelText(`Close ${options.title} modal`),
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
    await renderAndOpenContentOverlay(options);

    expect(await screen.findByTestId("ATL-Overlay-CloseButton")).toBeDefined();
  });
});

describe("when fullScreen is set to true", () => {
  it("should show the dismiss button", async () => {
    const options: testRendererOptions = {
      ...getDefaultOptions(),
      fullScreen: true,
    };
    await renderAndOpenContentOverlay(options);
    expect(screen.getByTestId("ATL-Overlay-CloseButton")).toBeDefined();
  });
});

describe("when showDismiss is set to true", () => {
  it("should show the dismiss button", async () => {
    const options: testRendererOptions = {
      ...getDefaultOptions(),
      showDismiss: true,
    };
    await renderAndOpenContentOverlay(options);
    expect(screen.getByTestId("ATL-Overlay-CloseButton")).toBeDefined();
  });
});

describe("when the close button is clicked on an open content overlay with a defined onBeforeExit", () => {
  it("should call the callback method on exit", async () => {
    const options: testRendererOptions = {
      ...getDefaultOptions(),
      onBeforeExitCallback: jest.fn(),
      showDismiss: true,
    };
    await renderAndOpenContentOverlay(options);

    await user.press(screen.getByTestId("ATL-Overlay-CloseButton"));

    await waitFor(() => {
      expect(options.onBeforeExitCallback).toHaveBeenCalled();
    });
  });
});

describe("modalBackgroundColor prop", () => {
  describe("when using the default surface value", () => {
    it("renders the component with the color-surface color", async () => {
      const options: testRendererOptions = {
        ...getDefaultOptions(),
      };
      await renderAndOpenContentOverlay(options);
      const OverlayHeader = screen.getByTestId("ATL-Overlay-Header")
        .children[0] as ReactTestInstance;
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
    it("changes the backround color of the modal to color-surface--background", async () => {
      const options: testRendererOptions = {
        ...getDefaultOptions(),
        modalBackgroundColor: "background",
      };
      await renderAndOpenContentOverlay(options);
      const OverlayHeader = screen.getByTestId("ATL-Overlay-Header")
        .children[0] as ReactTestInstance;
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
