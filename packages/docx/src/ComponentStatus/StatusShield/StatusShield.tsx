import React from "react";
import styles from "./StatusShield.css";

const statusColor = {
  fail: "ef5733",
  warn: "ddb338",
  pass: "7db00e",
};

interface StatusShieldProps {
  readonly name: string;
  readonly text: string;
  readonly status: keyof typeof statusColor;
  readonly url?: string;
}

export function StatusShield({ name, text, status, url }: StatusShieldProps) {
  const encodedName = encodeURIComponent(name.replace(/-/g, "--"));
  const encodedText = encodeURIComponent(text.replace(/-/g, "--"));

  const shield = (
    <img
      alt={name}
      src={`https://img.shields.io/badge/${encodedName}-${encodedText}-${statusColor[status]}.svg?style=for-the-badge`}
    />
  );

  if (url) {
    return (
      <a
        className={styles.statusShield}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {shield}
      </a>
    );
  }

  return <div className={styles.statusShield}>{shield}</div>;
}
