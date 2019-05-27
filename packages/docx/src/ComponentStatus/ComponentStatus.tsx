import React from "react";
import { StatusShield } from "./StatusShield";

interface StatusData {
  text: string;
  status: "fail" | "warn" | "pass";
}

const status: { [status: string]: { [stage: string]: StatusData } } = {
  stage: {
    pre: {
      text: "Pre-Release",
      status: "fail",
    },
    rc: {
      text: "Release Candidate",
      status: "warn",
    },
    ready: {
      text: "Ready",
      status: "pass",
    },
  },
  responsive: {
    no: {
      text: "✕",
      status: "fail",
    },
    partial: {
      text: "—",
      status: "warn",
    },
    yes: {
      text: "✔",
      status: "pass",
    },
  },
  accessible: {
    no: {
      text: "✕",
      status: "fail",
    },
    partial: {
      text: "—",
      status: "warn",
    },
    yes: {
      text: "✔",
      status: "pass",
    },
  },
};

interface ComponentStatusProps {
  readonly stage: "pre" | "ready";
  readonly responsive: "no" | "partial" | "yes";
  readonly accessible: "no" | "partial" | "yes";
}

export function ComponentStatus({
  stage,
  responsive,
  accessible,
}: ComponentStatusProps) {
  const stageData = {
    ...{ name: "Stage" },
    ...status.stage[stage],
  };
  const responsiveData = {
    ...{ name: "Responsive" },
    ...status.responsive[responsive],
  };
  const accessibleData = {
    ...{ name: "Accessibility" },
    ...status.accessible[accessible],
  };

  return (
    <div>
      <StatusShield {...stageData} />
      <StatusShield {...responsiveData} />
      <StatusShield {...accessibleData} />
    </div>
  );
}
