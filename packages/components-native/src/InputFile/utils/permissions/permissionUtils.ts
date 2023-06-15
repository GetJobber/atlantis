import {
  PERMISSIONS,
  RESULTS,
  checkMultiple,
  requestMultiple,
} from "react-native-permissions";
import { Platform } from "react-native";

export interface PermissionsType {
  camera: boolean;
  photoLibrary: boolean;
}

export type PermissionResultType = "granted" | "denied";

export async function checkAndRequestCameraPermissions(): Promise<PermissionsType> {
  const platformPermissions = Platform.select({
    ios: [PERMISSIONS.IOS.CAMERA],
    android: [PERMISSIONS.ANDROID.CAMERA],
  });

  if (platformPermissions === undefined) {
    // Return something? You're not on iOS or android, web browser?
    return { camera: false, photoLibrary: false };
  }
  const checkPermissions = await checkMultiple(platformPermissions);
  // @ts-expect-error tsc-ci
  const permissionsArray = permissionsToArray(checkPermissions);

  if (permissionsArray.camera || permissionsArray.photoLibrary) {
    return permissionsArray;
  }

  const requestPermissions = await requestMultiple(platformPermissions);
  // @ts-expect-error tsc-ci
  return permissionsToArray(requestPermissions);
}

export async function checkAndRequestGalleryPermissions(): Promise<PermissionsType> {
  const platformPermissions = Platform.select({
    ios: [PERMISSIONS.IOS.PHOTO_LIBRARY],
    android: [
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
      PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
    ],
  });

  if (platformPermissions === undefined) {
    // Return something? You're not on iOS or android, web browser?
    return { camera: false, photoLibrary: false };
  }
  const checkPermissions = await checkMultiple(platformPermissions);
  // @ts-expect-error tsc-ci
  const permissionsArray = permissionsToArray(checkPermissions);

  if (permissionsArray.camera || permissionsArray.photoLibrary) {
    return permissionsArray;
  }

  const requestPermissions = await requestMultiple(platformPermissions);

  // @ts-expect-error tsc-ci
  return permissionsToArray(requestPermissions);
}

function permissionsToArray(
  permissions: Record<
    | "ios.permission.CAMERA"
    | "ios.permission.PHOTO_LIBRARY"
    | "android.permission.CAMERA"
    | "android.permission.WRITE_EXTERNAL_STORAGE"
    | "android.permission.READ_EXTERNAL_STORAGE"
    | "android.permission.READ_MEDIA_IMAGES"
    | "android.permission.READ_MEDIA_VIDEO",
    "unavailable" | "denied" | "blocked" | "granted" | "limited"
  >,
) {
  const cameraGranted = Platform.select({
    ios: permissions[PERMISSIONS.IOS.CAMERA] === RESULTS.GRANTED,
    android: permissions[PERMISSIONS.ANDROID.CAMERA] === RESULTS.GRANTED,
    default: false,
  });
  const imagesGranted = Platform.select({
    ios:
      permissions[PERMISSIONS.IOS.PHOTO_LIBRARY] === RESULTS.GRANTED ||
      permissions[PERMISSIONS.IOS.PHOTO_LIBRARY] === RESULTS.LIMITED,
    android:
      permissions[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] === RESULTS.GRANTED ||
      permissions[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] ===
        RESULTS.GRANTED,
    default: false,
  });
  const videoGranted = Platform.select({
    ios: permissions[PERMISSIONS.IOS.PHOTO_LIBRARY] === RESULTS.GRANTED,
    android:
      permissions[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] === RESULTS.GRANTED ||
      permissions[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] ===
        RESULTS.GRANTED,
    default: false,
  });

  return {
    camera: cameraGranted,
    photoLibrary: imagesGranted || videoGranted,
  };
}
