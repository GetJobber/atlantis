import React from "react";
import {
  RenderAPI,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react-native";
import { Host } from "react-native-portalize";
import { Alert, NativeModules } from "react-native";
import { pick } from "react-native-document-picker";
import { useIntl } from "react-intl";
import { FileUpload, InputFile } from ".";
import {
  checkAndRequestCameraPermissions,
  checkAndRequestGalleryPermissions,
} from "./utils/permissions";
import { messages as messagesHook } from "./messages";
import { FileSource, StatusCode } from "./types";
import { defaultValues as contextDefaultValue } from "../AtlantisContext";
import * as atlantisContext from "../AtlantisContext/AtlantisContext";
import { AtlantisInterfaceType } from "../AtlantisNativeInterface";

jest.mock("./utils/uploadAsset");
jest.mock("./utils/permissions");

// const mockUserNetInfo = (isOnline: boolean) => {
//   jest.spyOn(hooks, "useIsDeviceOnline").mockReturnValue(isOnline);
// };

const mockOnLogError = jest.fn();
const atlantisContextSpy = jest.spyOn(atlantisContext, "useAtlantisContext");
atlantisContextSpy.mockImplementation(() => {
  return {
    ...contextDefaultValue,
    onLogError: mockOnLogError,
  };
});

let Platform: { OS: "ios" | "android" };

const mockSuccessfulSingleImageResponse = {
  assets: [
    {
      fileName: "test.jpg",
      fileSize: 12345,
      height: 1024,
      width: 1024,
      type: "image/jpg",
      uri: "file:///path/to/test.jpg",
    },
  ],
};

const mockSuccessfulSingleDocumentResponse = [
  {
    name: "test.pdf",
    size: 12345,
    type: "application/pdf",
    uri: "file:///path/to/test.pdf",
  },
];

const mockSuccessfulMultipleDocumentResponse = [
  {
    name: "tps_report.pdf",
    size: 12345,
    type: "application/pdf",
    uri: "file:///path/to/tps_report.pdf",
  },
  {
    name: "more_test.xls",
    size: 54321,
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    uri: "file:///path/to/more_test.xls",
  },
];
const key = "key for test.jpg";
const uploadUrl = "path_to_upload_bucket/key%20for%20test.jpg";
const mockGetUploadParams = jest.fn().mockImplementation(() => {
  return {
    url: "path_to_upload_bucket",
    key: key,
    headers: {
      xTestOne: "foo",
      xTestTwo: "bar",
    },
  };
});
const AtlantisNativeInterface: AtlantisInterfaceType =
  NativeModules.AtlantisNativeInterface;

jest.mock("react-native-document-picker");
const jestPick = pick as jest.Mock;

jest.mock("react-native-image-picker", () => ({
  launchCamera: jest.fn().mockImplementation((options, callback) => {
    callback(mockSuccessfulSingleImageResponse);
  }),
  launchImageLibrary: jest.fn().mockImplementation((options, callback) => {
    callback(mockSuccessfulSingleImageResponse);
  }),
}));

const jestCheckAndRequestCameraPermissions =
  checkAndRequestCameraPermissions as jest.Mock;
const jestCheckAndRequestGalleryPermissions =
  checkAndRequestGalleryPermissions as jest.Mock;

const defaultInputFileParams = {
  allowedTypes: "images" as const,
  getUploadParams: mockGetUploadParams,
};

beforeEach(() => {
  Platform = require("react-native").Platform;
  jestCheckAndRequestGalleryPermissions.mockImplementation(async () => {
    return { camera: true, photoLibrary: true };
  });
  jestCheckAndRequestCameraPermissions.mockImplementation(async () => {
    return { camera: true, photoLibrary: true };
  });
  jestPick.mockImplementation(() => {
    return mockSuccessfulSingleDocumentResponse;
  });
  jest.spyOn(Alert, "alert").mockImplementation(() => {
    return jest.fn();
  });
});

function basicRenderTestWithValue() {
  it("Renders an InputFile", () => {
    const { getByLabelText, getByHintText } = render(
      <Host>
        <InputFile {...defaultInputFileParams} />
      </Host>,
    );

    expect(
      getByLabelText(messagesHook.defaultLabel.defaultMessage),
    ).toBeDefined();
    expect(
      getByHintText(messagesHook.defaultHint.defaultMessage),
    ).toBeDefined();
  });

  it("Renders an InputFile with accessibility label and hint", () => {
    const { getByLabelText, getByHintText } = render(
      <Host>
        <InputFile
          getUploadParams={mockGetUploadParams}
          accessibilityLabel="Custom Label"
          accessibilityHint="Custom Hint Text"
        />
      </Host>,
    );

    expect(getByLabelText("Custom Label")).toBeDefined();
    expect(getByHintText("Custom Hint Text")).toBeDefined();
  });
}
function buildExpectedOptions(platform: "ios" | "android", message: string) {
  if (platform === "ios") {
    return [
      expect.objectContaining({
        options: expect.arrayContaining([message]),
      }),
      expect.any(Function),
    ];
  } else {
    return [
      expect.objectContaining({
        options: expect.arrayContaining([
          expect.objectContaining({ title: message }),
        ]),
      }),
    ];
  }
}

function singleMediaCaptureTest() {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("when capturing media", () => {
    jestCheckAndRequestGalleryPermissions.mockImplementation(async () => {
      return { camera: true, photoLibrary: true };
    });
    jest.spyOn(Alert, "alert").mockImplementation(() => {
      return jest.fn();
    });

    const optionsSpy = jest.spyOn(AtlantisNativeInterface, "openActionSheet");

    const expectedOptionLibrary = messagesHook.chooseFromLibrary.defaultMessage;
    const expectedOptionPhoto = messagesHook.takePhoto.defaultMessage;
    const expectedOptionVideo = messagesHook.takeVideo.defaultMessage;
    const expectedOptionFiles = messagesHook.browseFiles.defaultMessage;

    it("shows alert if network is unavailable", async () => {
      atlantisContextSpy.mockReturnValueOnce({
        ...contextDefaultValue,
        isOnline: false,
      });
      const { getByLabelText } = render(
        <Host>
          <InputFile
            getUploadParams={mockGetUploadParams}
            allowedTypes="images"
          />
        </Host>,
      );
      await fireEvent.press(
        getByLabelText(messagesHook.defaultLabel.defaultMessage),
      );
      expect(Alert.alert).toHaveBeenCalledTimes(1);
    });

    it.each([expectedOptionPhoto, expectedOptionLibrary])(
      "shows the attachment bottom sheet with a photo option",
      async expectedOption => {
        const expectedBottomSheetParameters = buildExpectedOptions(
          Platform.OS,
          expectedOption,
        );
        const { getByLabelText } = render(
          <Host>
            <InputFile
              getUploadParams={mockGetUploadParams}
              allowedTypes="images"
            />
          </Host>,
        );
        await fireEvent.press(
          getByLabelText(messagesHook.defaultLabel.defaultMessage),
        );
        const bottomSheetSpy = optionsSpy;

        expect(bottomSheetSpy).toHaveBeenCalledWith(
          ...expectedBottomSheetParameters,
        );
      },
    );

    it.each([expectedOptionVideo, expectedOptionLibrary])(
      "shows the attachment bottom sheet with a video option",
      async expectedOption => {
        const { getByLabelText } = render(
          <Host>
            <InputFile
              getUploadParams={mockGetUploadParams}
              allowedTypes="videos"
            />
          </Host>,
        );
        await fireEvent.press(
          getByLabelText(messagesHook.defaultLabel.defaultMessage),
        );
        const expectedParameters = buildExpectedOptions(
          Platform.OS,
          expectedOption,
        );
        const bottomSheetSpy = optionsSpy;
        expect(bottomSheetSpy).toHaveBeenCalledWith(...expectedParameters);
      },
    );

    it.each([
      expectedOptionVideo,
      expectedOptionLibrary,
      expectedOptionFiles,
      expectedOptionPhoto,
    ])(
      "shows the attachment bottom sheet with mixed options",
      async expectedOption => {
        const { getByLabelText } = render(
          <Host>
            <InputFile
              getUploadParams={mockGetUploadParams}
              allowedTypes="mixed"
            />
          </Host>,
        );
        await fireEvent.press(
          getByLabelText(messagesHook.defaultLabel.defaultMessage),
        );
        const bottomSheetSpy = optionsSpy;
        const expectedBottomSheetParameters = buildExpectedOptions(
          Platform.OS,
          expectedOption,
        );
        expect(bottomSheetSpy).toHaveBeenCalledWith(
          ...expectedBottomSheetParameters,
        );
      },
    );
  });
}

function errorHandlingTests() {
  describe("when there is an error", () => {
    beforeEach(() => {
      jest
        .spyOn(AtlantisNativeInterface, "openActionSheet")
        .mockImplementation(() => {
          if (Platform.OS === "ios") {
            return Promise.reject(new Error());
          }
          throw new Error();
        });
    });

    it("calls onFileSelected", async () => {
      const rendered = render(
        <Host>
          <InputFile getUploadParams={mockGetUploadParams} />
        </Host>,
      );

      fireEvent.press(
        rendered.getByLabelText(messagesHook.defaultLabel.defaultMessage),
      );

      const platform = Platform.OS === "android" ? "Android" : "iOS";
      const expectedError = `[File upload] ${platform}: not able to select media option to upload`;
      await waitFor(() => {
        expect(mockOnLogError).toHaveBeenCalledWith(expectedError);
      });
    });
  });
}

function permissionDeniedTests() {
  describe("when we are selecting single gallery images", () => {
    let rendered: RenderAPI;

    describe("when gallery permissions are denied", () => {
      beforeEach(() => {
        jest
          .spyOn(AtlantisNativeInterface, "openActionSheet")
          .mockImplementation(async () => FileSource.gallery);
        jestCheckAndRequestGalleryPermissions.mockImplementation(async () => {
          return { camera: true, photoLibrary: false };
        });
        rendered = render(
          <Host>
            <InputFile
              allowedTypes="images"
              type="singleSelect"
              getUploadParams={mockGetUploadParams}
            />
          </Host>,
        );
      });
      it("shows a permissions alert when trying to access the gallery", async () => {
        fireEvent.press(
          rendered.getByLabelText(messagesHook.defaultLabel.defaultMessage),
        );

        await waitFor(() => {
          expect(Alert.alert).toHaveBeenCalled();
        });
      });
    });
  });
  describe("when we are accessing the camera", () => {
    let rendered: RenderAPI;

    describe("when camera permissions are denied", () => {
      beforeEach(() => {
        jest
          .spyOn(AtlantisNativeInterface, "openActionSheet")
          .mockImplementation(async () => FileSource.camera);
        jestCheckAndRequestCameraPermissions.mockImplementation(async () => {
          return { camera: false, photoLibrary: true };
        });
        rendered = render(
          <Host>
            <InputFile
              {...defaultInputFileParams}
              allowedTypes="images"
              type="multiSelect"
            />
          </Host>,
        );
      });
      it("shows an alert when trying to access the camera", async () => {
        fireEvent.press(
          rendered.getByLabelText(messagesHook.defaultLabel.defaultMessage),
        );

        await waitFor(() => {
          expect(Alert.alert).toHaveBeenCalled();
        });
      });
    });
  });
}

function singleImageUploadTests() {
  describe("when a single image is selected", () => {
    let rendered: RenderAPI;

    const onFileSelected = jest.fn();
    const onUploadStart = jest.fn();
    const onUploadProgress = jest.fn();
    const onUploadComplete = jest.fn();
    const onUploadError = jest.fn();

    beforeEach(() => {
      jest
        .spyOn(AtlantisNativeInterface, "openActionSheet")
        .mockImplementation(async () => FileSource.gallery);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    describe("and the upload succeeds", () => {
      beforeEach(() => {
        rendered = render(
          <Host>
            <InputFile
              allowedTypes="images"
              type="singleSelect"
              getUploadParams={mockGetUploadParams}
              onFileSelected={onFileSelected}
              onUploadStart={onUploadStart}
              onUploadProgress={onUploadProgress}
              onUploadComplete={onUploadComplete}
              onUploadError={onUploadError}
            />
          </Host>,
        );
        fireEvent.press(
          rendered.getByLabelText(messagesHook.defaultLabel.defaultMessage),
        );
      });

      it("calls onFileSelected", async () => {
        await waitFor(() => {
          expect(onFileSelected).toHaveBeenCalledTimes(1);
        });
        const fileUpload: FileUpload = onFileSelected.mock.calls[0][0];
        expect(fileUpload.key).toBe(key);
        expect(fileUpload.name).toBe("test.jpg");
      });

      it("calls onUploadStart", async () => {
        await waitFor(() => {
          expect(onUploadStart).toHaveBeenCalledTimes(1);
        });
        const fileUpload: FileUpload = onUploadStart.mock.calls[0][0];
        expect(fileUpload.key).toBe(key);
        expect(fileUpload.name).toBe("test.jpg");
        expect(fileUpload.uploadUrl).toBe(uploadUrl);
        // @ts-expect-error tsc-ci
        expect(fileUpload.dimension.width).toBe(1024);
        // @ts-expect-error tsc-ci
        expect(fileUpload.dimension.height).toBe(1024);
        expect(fileUpload.batchContext.batchCount).toBe(1);
        expect(fileUpload.status).toBe(StatusCode.Started);
      });

      it("calls onUploadProgress", async () => {
        await waitFor(() => {
          expect(onUploadProgress).toHaveBeenCalledTimes(1);
        });
        const fileUpload: FileUpload = onUploadProgress.mock.calls[0][0];
        expect(fileUpload.progress).toBe(0.5);
        expect(fileUpload.size).toBe(100);
        expect(fileUpload.status).toBe(StatusCode.InProgress);
      });

      it("calls onUploadComplete", async () => {
        await waitFor(() => {
          expect(onUploadComplete).toHaveBeenCalledTimes(1);
        });
        const fileUpload: FileUpload = onUploadComplete.mock.calls[0][0];
        expect(fileUpload.progress).toBe(1);
        expect(fileUpload.size).toBe(100);
        expect(fileUpload.batchContext.batchCount).toBe(1);
        expect(fileUpload.status).toBe(StatusCode.Completed);
      });

      it("didn't call onUploadError", async () => {
        await waitFor(() => {
          expect(onUploadError).not.toHaveBeenCalled();
        });
      });
    });

    describe("when there is a network error", () => {
      beforeEach(async () => {
        rendered = render(
          <Host>
            <InputFile
              getUploadParams={mockGetUploadParams.mockImplementationOnce(
                () => ({
                  url: "error",
                }),
              )}
              allowedTypes="images"
              type="singleSelect"
              onUploadStart={onUploadStart}
              onUploadProgress={onUploadProgress}
              onUploadComplete={onUploadComplete}
              onUploadError={onUploadError}
            />
          </Host>,
        );

        fireEvent.press(
          rendered.getByLabelText(messagesHook.defaultLabel.defaultMessage),
        );
      });

      it("calls onUploadError", async () => {
        await waitFor(() => {
          expect(onUploadError).toHaveBeenCalledTimes(1);
          expect(mockOnLogError).toHaveBeenCalledTimes(1);
        });
        const fileUpload: FileUpload = onUploadError.mock.calls[0][0];
        expect(fileUpload.status).toBe(StatusCode.Failed);
      });

      it("calls onUploadComplete with 0 progress", () => {
        expect(onUploadComplete).toHaveBeenCalledTimes(1);
        const fileUpload: FileUpload = onUploadComplete.mock.calls[0][0];
        expect(fileUpload.progress).toBe(0);
        expect(fileUpload.status).toBe(StatusCode.Completed);
      });
    });
  });
}

function singleDocumentUploadTests() {
  // eslint-disable-next-line max-statements
  describe("when a single document is selected", () => {
    let rendered: RenderAPI;

    const onFileSelected = jest.fn();
    const onUploadStart = jest.fn();
    const onUploadProgress = jest.fn();
    const onUploadComplete = jest.fn();
    const onUploadError = jest.fn();
    const onInputError = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    beforeEach(() => {
      jest
        .spyOn(AtlantisNativeInterface, "openActionSheet")
        .mockImplementation(async () => FileSource.document);
    });
    describe("when the upload succeeds", () => {
      beforeEach(() => {
        rendered = render(
          <Host>
            <InputFile
              allowedTypes="mixed"
              type="singleSelect"
              getUploadParams={mockGetUploadParams}
              onFileSelected={onFileSelected}
              onUploadStart={onUploadStart}
              onUploadProgress={onUploadProgress}
              onUploadComplete={onUploadComplete}
              onUploadError={onUploadError}
            />
          </Host>,
        );
        fireEvent.press(
          rendered.getByLabelText(messagesHook.defaultLabel.defaultMessage),
        );
      });

      it("calls onFileSelected", async () => {
        await waitFor(() => {
          expect(onFileSelected).toHaveBeenCalledTimes(1);
        });
        const fileUpload: FileUpload = onFileSelected.mock.calls[0][0];
        expect(fileUpload.key).toBe(key);
        expect(fileUpload.name).toBe("test.pdf");
      });

      it("calls onUploadStart", async () => {
        await waitFor(() => {
          expect(onUploadStart).toHaveBeenCalledTimes(1);
        });
        const fileUpload: FileUpload = onUploadStart.mock.calls[0][0];
        expect(fileUpload.key).toBe(key);
        expect(fileUpload.name).toBe("test.pdf");
        expect(fileUpload.uploadUrl).toBe(uploadUrl);
        expect(fileUpload.batchContext.batchCount).toBe(1);
        expect(fileUpload.status).toBe(StatusCode.Started);
      });

      it("calls onUploadProgress", async () => {
        await waitFor(() => {
          expect(onUploadProgress).toHaveBeenCalledTimes(1);
        });
        const fileUpload: FileUpload = onUploadProgress.mock.calls[0][0];
        expect(fileUpload.progress).toBe(0.5);
        expect(fileUpload.size).toBe(100);
        expect(fileUpload.status).toBe(StatusCode.InProgress);
      });

      it("calls onUploadComplete", async () => {
        await waitFor(() => {
          expect(onUploadComplete).toHaveBeenCalledTimes(1);
        });
        const fileUpload: FileUpload = onUploadComplete.mock.calls[0][0];
        expect(fileUpload.progress).toBe(1);
        expect(fileUpload.batchContext.batchCount).toBe(1);
        expect(fileUpload.status).toBe(StatusCode.Completed);
      });

      it("didn't call onUploadError", async () => {
        await waitFor(() => {
          expect(onUploadError).not.toHaveBeenCalled();
        });
      });
    });

    describe("when there is a file with no extension", () => {
      beforeEach(async () => {
        const mockNoExtensionSingleDocumentResponse = [
          {
            name: "mylongfilenoextension",
            size: 12345,
            type: "application/pdf",
            uri: "file:///path/to/mylongfilenoextension",
          },
        ];

        jestPick.mockImplementation(() => {
          return mockNoExtensionSingleDocumentResponse;
        });
        rendered = render(
          <Host>
            <InputFile
              allowedTypes="mixed"
              type="singleSelect"
              getUploadParams={mockGetUploadParams}
              onFileSelected={onFileSelected}
              onUploadStart={onUploadStart}
              onUploadProgress={onUploadProgress}
              onUploadComplete={onUploadComplete}
              onUploadError={onUploadError}
            />
          </Host>,
        );
        fireEvent.press(
          rendered.getByLabelText(messagesHook.defaultLabel.defaultMessage),
        );
      });

      it("calls onFileSelected", async () => {
        await waitFor(() => {
          expect(onFileSelected).toHaveBeenCalledTimes(1);
        });
        const fileUpload: FileUpload = onFileSelected.mock.calls[0][0];
        expect(fileUpload.name).toBe("mylongfilenoextension");
      });

      it("calls onUploadStart", async () => {
        await waitFor(() => {
          expect(onUploadStart).toHaveBeenCalledTimes(1);
        });
        const fileUpload: FileUpload = onUploadStart.mock.calls[0][0];
        expect(fileUpload.name).toBe("mylongfilenoextension");
        expect(fileUpload.batchContext.batchCount).toBe(1);
        expect(fileUpload.status).toBe(StatusCode.Started);
      });

      it("calls onUploadProgress", async () => {
        await waitFor(() => {
          expect(onUploadProgress).toHaveBeenCalledTimes(1);
        });
        const fileUpload: FileUpload = onUploadProgress.mock.calls[0][0];
        expect(fileUpload.progress).toBe(0.5);
        expect(fileUpload.size).toBe(100);
        expect(fileUpload.status).toBe(StatusCode.InProgress);
      });

      it("calls onUploadComplete", async () => {
        await waitFor(() => {
          expect(onUploadComplete).toHaveBeenCalledTimes(1);
        });
        const fileUpload: FileUpload = onUploadComplete.mock.calls[0][0];
        expect(fileUpload.progress).toBe(1);
        expect(fileUpload.batchContext.batchCount).toBe(1);
        expect(fileUpload.status).toBe(StatusCode.Completed);
      });

      it("didn't call onUploadError", async () => {
        await waitFor(() => {
          expect(onUploadError).not.toHaveBeenCalled();
        });
      });
    });

    describe("when there is a file with an unsafe extension", () => {
      beforeEach(async () => {
        const mockUnsafeSingleDocumentResponse = [
          {
            name: "test.exe",
            size: 12345,
            type: "application/exe",
            uri: "file:///path/to/test.exe",
          },
        ];

        jestPick.mockImplementation(() => {
          return mockUnsafeSingleDocumentResponse;
        });
        rendered = render(
          <Host>
            <InputFile
              getUploadParams={mockGetUploadParams}
              allowedTypes="mixed"
              type="singleSelect"
              onUploadStart={onUploadStart}
              onUploadProgress={onUploadProgress}
              onUploadComplete={onUploadComplete}
              onUploadError={onUploadError}
              onInputError={onInputError}
            />
          </Host>,
        );

        fireEvent.press(
          rendered.getByLabelText(messagesHook.defaultLabel.defaultMessage),
        );
      });

      it("calls onInputError with the right message", async () => {
        const { formatMessage } = useIntl();
        const errorMessage = formatMessage(messagesHook.invalidFileExtension, {
          blockedExtensionsFound: "exe",
        });
        await waitFor(() => {
          expect(onInputError).toHaveBeenCalledTimes(1);
          expect(onInputError).toHaveBeenCalledWith(errorMessage);
        });
      });
    });

    describe("when there is a network error", () => {
      beforeEach(async () => {
        rendered = render(
          <Host>
            <InputFile
              getUploadParams={mockGetUploadParams.mockImplementationOnce(
                () => ({
                  url: "error",
                }),
              )}
              allowedTypes="images"
              type="singleSelect"
              onUploadStart={onUploadStart}
              onUploadProgress={onUploadProgress}
              onUploadComplete={onUploadComplete}
              onUploadError={onUploadError}
            />
          </Host>,
        );

        fireEvent.press(
          rendered.getByLabelText(messagesHook.defaultLabel.defaultMessage),
        );
      });

      it("calls onUploadError", async () => {
        await waitFor(() => {
          expect(onUploadError).toHaveBeenCalledTimes(1);
          expect(mockOnLogError).toHaveBeenCalledTimes(1);
        });
        const fileUpload: FileUpload = onUploadError.mock.calls[0][0];
        expect(fileUpload.status).toBe(StatusCode.Failed);
      });

      it("calls onUploadComplete with 0 progress", async () => {
        await waitFor(() => {
          expect(onUploadComplete).toHaveBeenCalledTimes(1);
        });
        const fileUpload: FileUpload = onUploadComplete.mock.calls[0][0];
        expect(fileUpload.progress).toBe(0);
        expect(fileUpload.status).toBe(StatusCode.Completed);
      });
    });
  });
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function multipleDocumentUploadTests() {
  describe("when two documents are selected", () => {
    let rendered: RenderAPI;
    // callbacks should be called once for each result in the file array
    const numExpectedCalls = mockSuccessfulMultipleDocumentResponse.length;

    const onUploadStart = jest.fn();
    const onUploadProgress = jest.fn();
    const onUploadComplete = jest.fn();
    const onUploadError = jest.fn();

    beforeEach(() => {
      jest
        .spyOn(AtlantisNativeInterface, "openActionSheet")
        .mockImplementation(async () => FileSource.document);
      jestPick.mockImplementation(() => {
        return mockSuccessfulMultipleDocumentResponse;
      });
    });
    describe("when the upload succeeds", () => {
      afterEach(() => {
        jest.clearAllMocks();
      });
      beforeEach(() => {
        rendered = render(
          <Host>
            <InputFile
              allowedTypes="mixed"
              getUploadParams={mockGetUploadParams}
              type="singleSelect"
              onUploadStart={onUploadStart}
              onUploadProgress={onUploadProgress}
              onUploadComplete={onUploadComplete}
              onUploadError={onUploadError}
            />
          </Host>,
        );
        fireEvent.press(
          rendered.getByLabelText(messagesHook.defaultLabel.defaultMessage),
        );
      });
      it("calls onUploadStart", async () => {
        await waitFor(() => {
          expect(onUploadStart).toHaveBeenCalledTimes(numExpectedCalls);
        });
        const fileUpload: FileUpload = onUploadStart.mock.calls[0][0];
        expect(fileUpload.name).toBe("tps_report.pdf");

        const secondFileUpload: FileUpload = onUploadStart.mock.calls[1][0];
        expect(secondFileUpload.name).toBe("more_test.xls");
      });

      it("calls onUploadProgress", async () => {
        await waitFor(() => {
          expect(onUploadProgress).toHaveBeenCalledTimes(numExpectedCalls);
        });
        const fileUpload: FileUpload = onUploadProgress.mock.calls[0][0];
        expect(fileUpload.progress).toBe(0.5);
        expect(fileUpload.size).toBe(100);
      });

      it("calls onUploadComplete", async () => {
        await waitFor(() => {
          expect(onUploadComplete).toHaveBeenCalledTimes(numExpectedCalls);
        });
        const fileUpload: FileUpload = onUploadComplete.mock.calls[0][0];
        expect(fileUpload.progress).toBe(1);
        const secondFileUpload: FileUpload = onUploadComplete.mock.calls[1][0];
        expect(secondFileUpload.progress).toBe(1);
      });

      it("didn't call onUploadError", async () => {
        await waitFor(() => {
          expect(onUploadError).not.toHaveBeenCalled();
        });
      });
    });
    describe("when there is a network error", () => {
      afterEach(() => {
        jest.clearAllMocks();
      });
      beforeEach(() => {
        rendered = render(
          <Host>
            <InputFile
              getUploadParams={mockGetUploadParams.mockImplementation(() => ({
                url: "error",
              }))}
              allowedTypes="images"
              type="singleSelect"
              onUploadStart={onUploadStart}
              onUploadProgress={onUploadProgress}
              onUploadComplete={onUploadComplete}
              onUploadError={onUploadError}
            />
          </Host>,
        );

        fireEvent.press(
          rendered.getByLabelText(messagesHook.defaultLabel.defaultMessage),
        );
      });

      it("calls onUploadError", async () => {
        await waitFor(() => {
          expect(onUploadError).toHaveBeenCalledTimes(numExpectedCalls);
          expect(mockOnLogError).toHaveBeenCalledTimes(numExpectedCalls);
        });
      });

      it("calls onUploadComplete with 0 progress", async () => {
        await waitFor(() => {
          expect(onUploadComplete).toHaveBeenCalledTimes(numExpectedCalls);
        });

        const fileUpload: FileUpload = onUploadComplete.mock.calls[0][0];
        expect(fileUpload.progress).toBe(0);
        const secondFileUpload: FileUpload = onUploadComplete.mock.calls[1][0];
        expect(secondFileUpload.progress).toBe(0);
      });
    });
  });
}

// describe("ios", () => {
//   beforeEach(() => {
//     Platform.OS = "ios";
//   });

//   basicRenderTestWithValue();
//   // permissionDeniedTests();
//   // singleImageUploadTests();
//   // singleDocumentUploadTests();
//   // multipleDocumentUploadTests();
//   singleMediaCaptureTest();
//   errorHandlingTests();
// });

describe("android", () => {
  beforeEach(() => {
    Platform.OS = "android";
  });

  basicRenderTestWithValue();
  permissionDeniedTests();
  singleImageUploadTests();
  singleDocumentUploadTests();
  // multipleDocumentUploadTests();
  singleMediaCaptureTest();
  errorHandlingTests();
});

it("fake", () => {
  expect(true).toBe(true);
});
