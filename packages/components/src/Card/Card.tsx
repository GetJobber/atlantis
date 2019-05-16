import React, { ReactNode } from "react";
import classnames from "classnames";
import styles from "./Card.css";

interface CardSectionProps {
  readonly children: ReactNode;
}

export function CardBanner(props: CardSectionProps) {
  return <header className={styles.banner} {...props} />;
}

export function CardHeader(props: CardSectionProps) {
  return <div className={styles.header} {...props} />;
}

export function CardDetail(props: CardSectionProps) {
  return <div className={styles.detail} {...props} />;
}

export function CardContent(props: CardSectionProps) {
  return <div className={styles.content} {...props} />;
}

interface CardProps {
  readonly accentColor?:
    | "indigo"
    | "blue"
    | "blueLighter"
    | "greyBlue"
    | "greyDark"
    | "grey"
    | "greyLight"
    | "greyLighter"
    | "green"
    | "lime"
    | "yellowGreen"
    | "yellow"
    | "red"
    | "pink"
    | "purple"
    | "navy"
    | "lightBlue"
    | "lightBlueLighter"
    | "teal"
    | "brown"
    | "white";
  readonly children: ReactNode[];
}

export function Card({ accentColor, ...other }: CardProps) {
  const className = classnames(
    styles.card,
    accentColor && styles.accent,
    accentColor && styles[accentColor],
  );

  return <div className={className} {...other} />;
}
