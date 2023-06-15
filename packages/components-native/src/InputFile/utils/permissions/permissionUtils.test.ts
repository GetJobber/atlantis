import { Platform } from "react-native";
import { PERMISSIONS, RESULTS } from "react-native-permissions";
import { checkMultiple, requestMultiple } from "react-native-permissions/mock";
import {
  PermissionResultType,
  checkAndRequestCameraPermissions,
} from "./permissionUtils";

jest.mock("react-native-permissions", () =>
  require("react-native-permissions/mock"),
);

describe("checkAndRequestCameraPermissions", () => {
  describe("when checking on an android device", () => {
    beforeEach(() => {
      Platform.OS = "android";
      Platform.select = jest.fn(dict => dict.android);
    });
    afterEach(async () => {
      checkMultiple.mockImplementation(async () => {
        return checkAndRequestValueBuilder("android", RESULTS.GRANTED);
      });
      requestMultiple.mockImplementation(async () => {
        return checkAndRequestValueBuilder("android", RESULTS.GRANTED);
      });
    });
    describe("when the 'check' returns permission granted", () => {
      beforeEach(async () => {
        checkMultiple.mockImplementation(async () => {
          return checkAndRequestValueBuilder("android", RESULTS.GRANTED);
        });
      });
      test("should return true for the camera and photo library", async () => {
        await expect(checkAndRequestCameraPermissions()).resolves.toEqual({
          camera: true,
          photoLibrary: true,
        });
      });
    });
    describe("when the 'check' returns permissions denied but the 'request' returns granted", () => {
      beforeEach(async () => {
        checkMultiple.mockImplementation(async () => {
          return checkAndRequestValueBuilder("android", RESULTS.DENIED);
        });
        requestMultiple.mockImplementation(async () => {
          return checkAndRequestValueBuilder("android", RESULTS.GRANTED);
        });
      });
      test("should return true for the camera and photo library", async () => {
        await expect(checkAndRequestCameraPermissions()).resolves.toEqual({
          camera: true,
          photoLibrary: true,
        });
      });
    });
    describe("when both the 'check' and 'request' are denied", () => {
      beforeEach(async () => {
        checkMultiple.mockImplementation(async () => {
          return checkAndRequestValueBuilder("android", RESULTS.DENIED);
        });
        requestMultiple.mockImplementation(async () => {
          return checkAndRequestValueBuilder("android", RESULTS.DENIED);
        });
      });
      test("should return false for the camera and photo library", async () => {
        await expect(checkAndRequestCameraPermissions()).resolves.toEqual({
          camera: false,
          photoLibrary: false,
        });
      });
    });
    describe("when video denied but images granted", () => {
      beforeEach(async () => {
        const mockPermissions = {
          [PERMISSIONS.ANDROID.CAMERA]: RESULTS.GRANTED,
          [PERMISSIONS.ANDROID.READ_MEDIA_IMAGES]: RESULTS.GRANTED,
          [PERMISSIONS.ANDROID.READ_MEDIA_VIDEO]: RESULTS.DENIED,
        };
        checkMultiple.mockImplementation(async () => mockPermissions);
        requestMultiple.mockImplementation(async () => mockPermissions);
      });
      test("should still return true for photoLibrary", async () => {
        await expect(checkAndRequestCameraPermissions()).resolves.toEqual({
          camera: true,
          photoLibrary: true,
        });
      });
    });
    describe("when video granted but images denied", () => {
      beforeEach(async () => {
        const mockPermissions = {
          [PERMISSIONS.ANDROID.CAMERA]: RESULTS.GRANTED,
          [PERMISSIONS.ANDROID.READ_MEDIA_IMAGES]: RESULTS.DENIED,
          [PERMISSIONS.ANDROID.READ_MEDIA_VIDEO]: RESULTS.GRANTED,
        };
        checkMultiple.mockImplementation(async () => mockPermissions);
        requestMultiple.mockImplementation(async () => mockPermissions);
      });
      test("should still return true for photoLibrary", async () => {
        await expect(checkAndRequestCameraPermissions()).resolves.toEqual({
          camera: true,
          photoLibrary: true,
        });
      });
    });
  });
  describe("when checking on an ios device", () => {
    beforeEach(() => {
      Platform.OS = "ios";
      Platform.select = jest.fn(dict => dict.ios);
    });

    describe("when the 'check' returns permission granted", () => {
      beforeEach(async () => {
        checkMultiple.mockImplementation(async () => {
          return checkAndRequestValueBuilder("ios", RESULTS.GRANTED);
        });
      });
      afterEach(async () => {
        checkMultiple.mockImplementation(async () => {
          return checkAndRequestValueBuilder("ios", RESULTS.GRANTED);
        });
        requestMultiple.mockImplementation(async () => {
          return checkAndRequestValueBuilder("ios", RESULTS.GRANTED);
        });
      });
      test("should return true for the camera and photo library", async () => {
        await expect(checkAndRequestCameraPermissions()).resolves.toEqual({
          camera: true,
          photoLibrary: true,
        });
      });
    });

    describe("when the 'check' returns permission limited for photo library", () => {
      beforeEach(async () => {
        checkMultiple.mockImplementation(async () => {
          return {
            [PERMISSIONS.IOS.CAMERA]: RESULTS.GRANTED,
            [PERMISSIONS.IOS.PHOTO_LIBRARY]: RESULTS.LIMITED,
          };
        });
        requestMultiple.mockImplementation(async () => {
          return {
            [PERMISSIONS.IOS.CAMERA]: RESULTS.GRANTED,
            [PERMISSIONS.IOS.PHOTO_LIBRARY]: RESULTS.LIMITED,
          };
        });
      });

      test("should return true for the camera and photo library", async () => {
        await expect(checkAndRequestCameraPermissions()).resolves.toEqual({
          camera: true,
          photoLibrary: true,
        });
      });
    });

    describe("when the 'check' returns permissions denied but the 'request' returns granted", () => {
      beforeEach(async () => {
        checkMultiple.mockImplementation(async () => {
          return checkAndRequestValueBuilder("ios", RESULTS.DENIED);
        });
        requestMultiple.mockImplementation(async () => {
          return checkAndRequestValueBuilder("ios", RESULTS.GRANTED);
        });
      });

      test("should return true for the camera and photo library", async () => {
        await expect(checkAndRequestCameraPermissions()).resolves.toEqual({
          camera: true,
          photoLibrary: true,
        });
      });
    });
    describe("when both the 'check' and 'request' are denied", () => {
      beforeEach(async () => {
        checkMultiple.mockImplementation(async () => {
          return checkAndRequestValueBuilder("ios", RESULTS.DENIED);
        });
        requestMultiple.mockImplementation(async () => {
          return checkAndRequestValueBuilder("ios", RESULTS.DENIED);
        });
      });

      test("should return false for the camera and photo library", async () => {
        await expect(checkAndRequestCameraPermissions()).resolves.toEqual({
          camera: false,
          photoLibrary: false,
        });
      });
    });
  });
});

function checkAndRequestValueBuilder(
  platform: "ios" | "android",
  result: PermissionResultType,
) {
  if (platform === "ios") {
    return {
      [PERMISSIONS.IOS.CAMERA]: result,
      [PERMISSIONS.IOS.PHOTO_LIBRARY]: result,
    };
  }
  if (platform === "android") {
    return {
      [PERMISSIONS.ANDROID.CAMERA]: result,
      [PERMISSIONS.ANDROID.READ_MEDIA_IMAGES]: result,
      [PERMISSIONS.ANDROID.READ_MEDIA_VIDEO]: result,
    };
  }
  return {};
}
