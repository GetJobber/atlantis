import React from "react";
import styles from "./ThumbnailGallery.css";
import { FormatFile } from "../FormatFile";

interface Attachment {
  /**
   * The name of the file.
   */
  readonly name: string;

  /**
   * The [MIME](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) type of the file
   */
  readonly type: string;

  /**
   * The size of the file in bytes.
   */
  readonly size: number;

  /**
   * The data url of the file.
   */
  url: string;
}

interface ThumbnailGalleryProps {
  /**
   * Takes list of details about the files to display as thumbnails.
   */
  readonly attachments: [Attachment];

  /**
   * Flag to show images in a LightBox on click
   */
  readonly openGalleryOnClick?: boolean;
}

export function ThumbnailGallery({ attachments }: ThumbnailGalleryProps) {
  return (
    <div>
      {attachments &&
        attachments.map((attachment, index) => {
          return (
            <div key={`attachment-${index}`} className={styles.thumbnail}>
              <FormatFile
                file={{
                  key: `attachment-${index}`,
                  name: attachment.name,
                  type: attachment.type,
                  size: attachment.size,
                  src: () => Promise.resolve(attachment.url),
                  progress: 1,
                }}
                showMetaData={false}
              />
            </div>
          );
        })}
    </div>
  );
}
