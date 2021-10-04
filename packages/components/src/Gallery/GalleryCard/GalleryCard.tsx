import React from "react";
import { XOR } from "ts-xor";
import classnames from "classnames";
import styles from "./GalleryCard.css";
import { Icon, IconNames } from "../../Icon";
import { Content } from "../../Content";
import { Text } from "../../Text";
import { Divider } from "../../Divider";
import { Card } from "../../Card";
import { FileIconsNames } from "../GalleryTypes";

interface BaseGalleryCard {
  name: string;
  src: string;
}

interface PreviewableGalleryCard extends BaseGalleryCard {
  onClick(): void;
}

interface FileGalleryCard extends BaseGalleryCard {
  icon: FileIconsNames;
}

type GalleryCardProps = XOR<PreviewableGalleryCard, FileGalleryCard>;

export function GalleryCard({ name, src, icon, onClick }: GalleryCardProps) {
  const isPreviewable = onClick != undefined;
  return (
    <div>
      <Card
        {...{
          ...(isPreviewable
            ? { onClick: onClick as () => void }
            : { url: src, external: true }),
        }}
      >
        {isPreviewable ? (
          <div
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              width: "56px",
              height: "56px",
            }}
          />
        ) : (
          // <img
          //   src={src}
          //   alt={`${name} file`}
          //   style={{
          //     display: "block",
          //     objectFit: "cover",
          //     maxWidth: "100%",
          //     maxHeight: "100%",
          //   }}
          // />
          <div
            style={{
              width: "56px",
              height: "56px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              ["--color-border"]: "var(--color-grey--lighter)",
            }}
          >
            <Content>
              <Icon name={icon as FileIconsNames} />
            </Content>
            <div>
              <Divider />
              <Content>
                <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                  <Text maxLines="single">{name}</Text>
                </div>
              </Content>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
