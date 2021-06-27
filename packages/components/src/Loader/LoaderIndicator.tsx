import React from "react";
import { Spinner } from "../Spinner";
import { ProgressBar } from "../ProgressBar";

interface LoaderIndicatorProps {
  determinate: boolean;
  currentValue?: number;
  maxValue?: number;
}

export function LoaderIndicator({
  determinate,
  currentValue = 0,
  maxValue = 100,
}: LoaderIndicatorProps) {
  return determinate ? (
    <ProgressBar currentStep={currentValue} totalSteps={maxValue} />
  ) : (
    <Spinner size="base" />
  );
}
