import React from "react";
import { cleanup, render } from "@testing-library/react";
import { CivilTime } from "@std-proposal/temporal";
import { FormatTime } from "./FormatTime";

afterEach(cleanup);

describe("FormatTime", () => {
  describe.each(
    Object.entries({
      CivilDate: new CivilTime(14, 30),
      ISO8601DateString: "2019-03-30T14:30",
      Date: new Date("2019-03-30T14:30"),
    }),
  )("%s", (name, date) => {
    it("renders a FormatTime", () => {
      const { container } = render(<FormatTime time={date} />);
      expect(container.textContent).toBe("2:30 PM");
    });

    it("renders a FormatTime using 24 hour clock", () => {
      const { container } = render(
        <FormatTime time={date} use24HourClock={true} />,
      );
      expect(container.textContent).toBe("14:30");
    });

    it("renders a FormatTime using 12 hour clock", () => {
      const { container } = render(
        <FormatTime time={date} use24HourClock={false} />,
      );
      expect(container.textContent).toBe("2:30 PM");
    });
  });

  it("should render 12:30AM as 00:30 using the 24 hour clock", () => {
    const { container } = render(
      <FormatTime time="2019-03-30T00:30" use24HourClock={true} />,
    );
    expect(container.textContent).toBe("00:30");
  });
});
