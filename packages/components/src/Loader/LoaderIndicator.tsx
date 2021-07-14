import React from "react";
import { Spinner } from "../Spinner";
import { ProgressBar } from "../ProgressBar";

interface LoaderIndicatorProps {
  determinate: boolean;
  size: "base" | "small";
  currentValue?: number;
  maxValue?: number;
}

export function LoaderIndicator({
  determinate,
  currentValue = 0,
  maxValue = 100,
  size,
}: LoaderIndicatorProps) {
  return determinate ? (
    <ProgressBar currentStep={currentValue} totalSteps={maxValue} size={size} />
  ) : (
    <Spinner size={size} />
  );
}
