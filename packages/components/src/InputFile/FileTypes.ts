export enum FileTypes {
  JPEG = "image/jpeg",
  JPG = "image/jpg",
  PNG = "image/png",
  HEIC = "image/heic",
  PDF = "application/pdf",
  DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  CSV = "text/csv",
}

export const BASIC_IMAGE_TYPES = ["PNG", "JPEG", "JPG"];

// Converts a MIME type to its readable format
export const mimeTypeToReadable = (mimeType: string): string => {
  const entry = Object.entries(FileTypes).find(
    ([, value]) => value === mimeType,
  );

  return entry ? entry[0] : mimeType;
};

// Converts an array of readable file type names to their corresponding MIME types
export const convertToMimeTypes = (types: string[]): string[] => {
  return types.map(
    type => FileTypes[type.toUpperCase() as keyof typeof FileTypes] || type,
  );
};

export function formatMimeTypes(types: string[]): string {
  if (types.length === 0) {
    return "";
  } else if (types.length === 1) {
    return types[0];
  } else {
    return `${types.slice(0, -1).join(", ")} or ${types[types.length - 1]}`;
  }
}
