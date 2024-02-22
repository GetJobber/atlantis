import * as FramerMotion from "framer-motion";
import * as PresencePOM from "./AnimatedPresence.pom";

const reduceMotionSpy = jest
  .spyOn(FramerMotion, "useReducedMotion")
  .mockReturnValue(false);

describe("AnimatedPresence", () => {
  it("should render the visible elements", async () => {
    PresencePOM.render();

    expect(PresencePOM.alwaysVisibleElement()).toBeInTheDocument();
    expect(PresencePOM.sometimesVisibleElement()).not.toBeInTheDocument();

    await PresencePOM.toggle();

    const el1 = PresencePOM.alwaysVisibleElement();
    expect(el1).toBeInTheDocument();
    expect(el1.parentElement).toHaveAttribute("style");

    const el2 = PresencePOM.sometimesVisibleElement();
    expect(el2).toBeInTheDocument();
    expect(el2?.parentElement).toHaveAttribute("style");
  });

  it("should not animate the elements when reduced motion is enabled", async () => {
    reduceMotionSpy.mockReturnValue(true);

    PresencePOM.render();

    expect(PresencePOM.alwaysVisibleElement()).toBeInTheDocument();
    expect(PresencePOM.sometimesVisibleElement()).not.toBeInTheDocument();

    await PresencePOM.toggle();

    const el1 = PresencePOM.alwaysVisibleElement();
    expect(el1).toBeInTheDocument();
    expect(el1.parentElement).not.toHaveAttribute("style");

    const el2 = PresencePOM.sometimesVisibleElement();
    expect(el2).toBeInTheDocument();
    expect(el2?.parentElement).not.toHaveAttribute("style");
  });
});
