import { usePopper } from "react-popper";

export const useMenuPopper = ({
  popperElement,
  shadowRef,
  width,
  smallScreenBreakpoint = 490,
  menuOffset = 6,
}: {
  popperElement: HTMLElement | null;
  shadowRef: React.RefObject<HTMLSpanElement>;
  width: number;
  smallScreenBreakpoint?: number;
  menuOffset?: number;
}) => {
  const {
    styles: popperStyles,
    attributes,
    state,
  } = usePopper(shadowRef.current?.nextElementSibling, popperElement, {
    placement: "bottom-start",
    strategy: "fixed",
    modifiers: [
      {
        name: "flip",
        options: {
          flipVariations: true,
        },
      },
      {
        name: "offset",
        options: {
          offset: [0, menuOffset],
        },
      },
    ],
  });
  const positionAttributes =
    width >= smallScreenBreakpoint
      ? {
          ...attributes.popper,
          style: popperStyles.popper,
        }
      : {};

  return { positionAttributes, state };
};
