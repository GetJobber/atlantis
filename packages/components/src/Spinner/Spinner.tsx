/* eslint-disable max-statements */
import React from "react";
import classnames from "classnames";
import styles from "./Spinner.css";

interface SpinnerProps {
  /**
   * Specifies the size of the spinner
   *
   * @default "base"
   */
  readonly size?: "small" | "base";

  /**
   * Spinner becomes an inline element when true,
   * otherwise it is a block element
   */
  readonly inline?: boolean;

  /**
   * Uses an industry gif instead of the default spinner
   */
  readonly hasDelight?:
    | "arborist"
    | "pressureGauge"
    | "workVan"
    | "landscaping"
    | "chainsaw"
    | "plumbing"
    | "powerDrill"
    | "windowCleaning";
}

export function Spinner({ size = "base", inline, hasDelight }: SpinnerProps) {
  const arboristGif = require("../Spinner/assets/Jobber_Arborist.gif");
  const hvacGif = require("../Spinner/assets/Jobber_PressureGauge.gif");
  const workVanGif = require("../Spinner/assets/Jobber_WorkVan.gif");
  const landscapingGif = require("../Spinner/assets/Jobber_Bobcat.gif");
  const chainsawGif = require("../Spinner/assets/Jobber_Chainsaw.gif");
  const plumbingGif = require("../Spinner/assets/Jobber_PipeWrench.gif");
  const powerdrillGif = require("../Spinner/assets/Jobber_PowerDrill.gif");
  const windowCleaningGif = require("../Spinner/assets/Jobber_WaterLogo.gif");

  let selectedGif;

  switch (hasDelight) {
    case "arborist":
      selectedGif = arboristGif;
      break;
    case "pressureGauge":
      selectedGif = hvacGif;
      break;
    case "workVan":
      selectedGif = workVanGif;
      break;
    case "landscaping":
      selectedGif = landscapingGif;
      break;
    case "chainsaw":
      selectedGif = chainsawGif;
      break;
    case "plumbing":
      selectedGif = plumbingGif;
      break;
    case "powerDrill":
      selectedGif = powerdrillGif;
      break;
    case "windowCleaning":
      selectedGif = windowCleaningGif;
      break;
  }

  if (hasDelight) {
    return (
      <img
        src={selectedGif}
        alt="Loading"
        className={styles.industryGif}
        role="alert"
        aria-busy={true}
        aria-label="loading"
      />
    );
  }

  const spinnerStyles = classnames(styles.spinner, {
    [styles.small]: size === "small",
    [styles.inline]: inline,
  });

  return (
    <div
      className={spinnerStyles}
      role="alert"
      aria-busy={true}
      aria-label="loading"
    />
  );
}
