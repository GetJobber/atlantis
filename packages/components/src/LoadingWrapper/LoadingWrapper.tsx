import React, { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./LoadingWrapper.css";
import { Spinner } from "../Spinner";
import { ProgressBar } from "../ProgressBar";

interface BaseLoadingWrapper {
  readonly isLoading: boolean;
  readonly children: ReactNode | ReactNode[];
}

interface LoadingWrapperSpinnerVariant extends BaseLoadingWrapper {
  readonly variant: "spinner";
}

interface LoadingWrapperProgressVariant extends BaseLoadingWrapper {
  readonly variant: "bar";
  readonly progress: number;
}

type LoadingWrapperProps =
  | LoadingWrapperSpinnerVariant
  | LoadingWrapperProgressVariant;

export function LoadingWrapper(props: LoadingWrapperProps) {
  const progress = props.variant == "bar" ? props.progress : 0;
  const { variant, isLoading, children } = props;

  return (
    <div className={styles.loadingWrapper}>
      {children}
      {isLoading && (
        <AnimatePresence>
          <motion.div
            className={styles.innerLoadingWrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {variant == "spinner" && <SpinnerVariant />}
            {variant == "bar" && <ProgressBarVariant progress={progress} />}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

function SpinnerVariant() {
  return (
    <div>
      <Spinner />
    </div>
  );
}

interface ProgressBarVariantProps {
  readonly progress: number;
}

function ProgressBarVariant({ progress }: ProgressBarVariantProps) {
  return (
    <div className={styles.bar}>
      <ProgressBar currentStep={progress} totalSteps={100} />
    </div>
  );
}
