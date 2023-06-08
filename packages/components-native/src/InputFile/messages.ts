import { defineMessages } from "react-intl";

export const messages = defineMessages({
  defaultLabel: {
    id: "DefaultLabel",
    defaultMessage: "Attach files",
    description: "The default label for button and accessibility",
  },
  defaultHint: {
    id: "DefaultHint",
    defaultMessage: "Click/Tap to Attach Files",
    description: "The default accessibility hint",
  },
  chooseFromLibrary: {
    id: "chooseFromLibrary",
    defaultMessage: "Choose photos & videos",
    description: "Option to choose photos & videos",
  },
  takePhoto: {
    id: "takePhoto",
    defaultMessage: "Take a photo",
    description: "Option to take a photo",
  },
  takeVideo: {
    id: "takeVideo",
    defaultMessage: "Take a video",
    description: "Option to take a video",
  },
  browseFiles: {
    id: "browseFiles",
    defaultMessage: "Choose documents",
    description: "Option to choose documents",
  },
  permissionFailedDescription: {
    id: "PermissionFailedDescription",
    defaultMessage: "Grant access to upload images",
    description: "The alert description if camera or gallery access was denied",
  },
  permissionFailedCamera: {
    id: "PermissionFailedCamera",
    defaultMessage: "Allow Jobber to access your camera",
    description: "The alert heading if camera access was denied",
  },
  permissionFailedGallery: {
    id: "PermissionFailedGallery",
    defaultMessage: "Allow Jobber to access your photos",
    description: "The alert heading if gallery access was denied",
  },
  permissionFailedCancelButton: {
    id: "PermissionFailedCancelButton",
    defaultMessage: "Cancel",
    description: "The button to cancel selecting an image",
  },
  permissionFailedGotoSettingsButton: {
    id: "PermissionFailedGotoSettingsButton",
    defaultMessage: "Go To Settings",
    description: "The button to go to the device settings",
  },
  tooManyFiles: {
    id: "tooManyFiles",
    defaultMessage: "Attached files limited to 50. Remove excess files",
    description: "User attached too many files",
  },
  filesTooLarge: {
    id: "filesTooLarge",
    defaultMessage: "File size limited to 500mb. Remove excess files",
    description: "User attached files are too large",
  },
  invalidFileExtension: {
    id: "invalidFileExtension",
    defaultMessage:
      "Unsupported file types ({blockedExtensionsFound}) not attached",
    description: "User attached a file not allowed for upload",
  },
  unavailableNetworkTitle: {
    id: "unavailableNetworkTitle",
    defaultMessage: "Network unavailable",
    description: "The title for an alert about an unavailable network",
  },
  unavailableNetworkMessage: {
    id: "unavailableNetworkMessage",
    defaultMessage: "Check your internet connection and try again later",
    description: "The message for an alert about an unavailable network",
  },
});
