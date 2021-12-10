import React from "react";
import { render } from "@testing-library/react";
import { useScheduler } from "./useScheduler";
import { DurationPeriod } from "./types";

describe("useScheduler", () => {
  it("can be called without any parameters", () => {
    const Scheduler: React.FC = () => {
      useScheduler();
      return <></>;
    };

    render(<Scheduler />);
  });

  it("can be initialized with information", () => {
    let state: Partial<ReturnType<typeof useScheduler>[0]> = {};

    const Scheduler: React.FC = () => {
      [state] = useScheduler({
        recurrence: {
          rule: { interval: 1, type: DurationPeriod.Day },
        },
      });
      return <></>;
    };

    render(<Scheduler />);

    expect(state.recurrence.rule.interval).toBe(1);
  });
});
