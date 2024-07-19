import React, { PropsWithChildren } from "react";
import classNames from "classnames";
import { Icon } from "@jobber/components/Icon";
import { useChildComponent } from "../../hooks";
import styles from "../../Chip.css";

export function ChipSuffix({
  children,
  className,
  onClick: onSuffixClick,
}: ChipSuffixProps) {
  let singleChild = useChildComponent(children, d => d.type === Icon);

  if (!allowedSuffixIcons.includes(singleChild?.props?.name)) {
    singleChild = undefined;
  }

  // Common props for both span and button to avoid repetition
  const commonProps = {
    className: classNames(
      styles.suffix,
      className,
      !singleChild && styles.empty,
    ),
    children: singleChild,
  };

  return onSuffixClick ? (
    <button
      {...commonProps}
      onClick={ev => {
        ev.stopPropagation(); // Prevent the event from bubbling up
        onSuffixClick(ev);
      }}
      type="button" // Specify the button type for accessibility
      aria-label="Suffix button" // Provide an accessible label
    />
  ) : (
    <span {...commonProps} />
  );
}

//   return (
//     <span
//       className={classNames(
//         styles.suffix,
//         className,
//         !singleChild && styles.empty,
//       )}
//        onClick={(ev) => {
//         ev.stopPropagation(); // Prevent the event from bubbling up to the Chip's onClick
//         if (onSuffixClick) {
//           onSuffixClick(ev);
//         }
//       }}
//     >
//       {singleChild}
//     </span>
//   );
// }

export interface ChipSuffixProps extends PropsWithChildren {
  readonly className?: string;
  readonly onClick?: (ev: React.MouseEvent<HTMLSpanElement>) => void;
}

export const allowedSuffixIcons = ["cross", "add", "checkmark", "arrowDown"];
