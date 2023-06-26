import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { Host } from "react-native-portalize";
import { ThumbnailList } from "./ThumbnailList";
import { File } from "../FormatFile/types";

const snapshotFile: File[] = [
  {
    contentType: "image/jpeg",
    fileName: "image.jpeg",
    thumbnailUrl: "https://imageurl.com/ababathumb.jpg",
    url: "https://imageurl.com/ababa1.jpg",
    fileSize: 1024,
  },
];

const files: File[] = [
  {
    contentType: "image/jpeg",
    fileName: "image.jpeg",
    thumbnailUrl: "https://imageurl.com/ababathumb.jpg",
    url: "https://imageurl.com/ababa1.jpg",
    fileSize: 1024,
  },
  {
    contentType: "image/jpeg",
    fileName: "image1.jpeg",
    thumbnailUrl: "https://imageurl.com/ababathumb.jpg",
    url: "https://imageurl.com/ababa2.jpg",
    fileSize: 1024,
  },
  {
    contentType: "pdf",
    fileName: "image2.pdf",
    thumbnailUrl: "https://imageurl.com/ababathumb.jpg",
    url: undefined,
    fileSize: 1024,
  },
];

const onOpenFile = jest.fn();
const mockCreateThumbnail = jest.fn(async () => ({
  thumbnail: "thumbnail",
  error: false,
}));

function setup(snapshot?: boolean) {
  return render(
    <Host>
      <ThumbnailList
        files={snapshot ? snapshotFile : files}
        handleOpenFile={onOpenFile}
        createThumbnail={mockCreateThumbnail}
      />
    </Host>,
  );
}

beforeEach(() => {
  jest.clearAllMocks();
});

it("renders a thumbnail component with attachments", () => {
  const tree = setup(true);
  expect(tree.toJSON()).toMatchSnapshot();
});

describe("when a an array of files is provided", () => {
  it("calls the previewImages util on pressing a valid file", () => {
    const { getByLabelText } = setup();
    fireEvent.press(
      getByLabelText(files[0].fileName ? files[0].fileName : "file"),
    );
    expect(onOpenFile).toHaveBeenCalledTimes(1);
  });

  it("calls createThumbnail", () => {
    setup();
    expect(mockCreateThumbnail).toHaveBeenCalledTimes(2);
  });
});
