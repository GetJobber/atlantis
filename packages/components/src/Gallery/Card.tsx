/* eslint-disable import/no-relative-parent-imports */
/* eslint-disable no-restricted-imports */
import React, { ReactNode } from "react";
import { XOR } from "ts-xor";
import classnames from "classnames";
import styles from "./Gallery.css";
import { File, FileIconsNames, Sizes } from "./GalleryTypes";
import { Icon } from "../Icon";
import { Spinner } from "../Spinner";
import { Text } from "../Text";
import { Emphasis } from "../Emphasis";
import { Divider } from "../Divider";
import { Card as AtlantisCard } from "../Card";
import { Tooltip } from "../Tooltip";

type CardProps = XOR<
  PreviewableCardProps,
  XOR<FileCardProps, RenamedExtraCardProps>
>;

interface RenamedExtraCardProps extends Omit<ExtraCardProps, "children"> {
  extra: number;
}

export function Card({ file, extra, size = "base", icon, onClick }: CardProps) {
  if (extra && onClick) {
    return (
      <ExtraCard size={size} onClick={onClick}>
        {extra}
      </ExtraCard>
    );
  }

  if (file && icon) {
    return <FileCard file={file} size={size} icon={icon as FileIconsNames} />;
  }

  if (file && onClick) {
    return <PreviewableCard file={file} size={size} onClick={onClick} />;
  }

  return <Spinner />;
}

interface FileCardProps {
  file: File;
  size: Sizes;
  icon: FileIconsNames;
}

export function FileCard({ file: { name, src }, size, icon }: FileCardProps) {
  const card = classnames(styles.card, styles.border, styles[size]);
  return (
    <Tooltip message={name}>
      <div className={card}>
        <AtlantisCard url={src} external>
          <div className={styles.column}>
            <Icon size={size} name={icon} />
            <div>
              <Divider />
              <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                <Text maxLines="single"> {name}</Text>
              </div>
            </div>
          </div>
        </AtlantisCard>
      </div>
    </Tooltip>
  );
}

interface PreviewableCardProps {
  file: File;
  size: Sizes;
  onClick(): void;
}

export function PreviewableCard({
  file: { name, src },
  size,
  onClick,
}: PreviewableCardProps) {
  const card = classnames(styles.card, styles.border, styles[size]);
  return (
    <Tooltip message={name}>
      <div className={card}>
        <AtlantisCard onClick={onClick}>
          <div
            className={styles.image}
            style={{
              backgroundImage: `url(${src})`,
            }}
          />
        </AtlantisCard>
      </div>
    </Tooltip>
  );
}

interface ExtraCardProps {
  children?: ReactNode | ReactNode[];
  size: Sizes;
  onClick(): void;
}

export function ExtraCard({ children: extra, size, onClick }: ExtraCardProps) {
  const card = classnames(styles.card, styles[size]);
  return (
    <div className={card}>
      <AtlantisCard onClick={onClick}>
        <div
          style={{
            width: "100%",
            height: "100%",
            userSelect: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text align="center">
            <Emphasis variation="bold">+{extra}</Emphasis>
          </Text>
        </div>
      </AtlantisCard>
    </div>
  );
}
