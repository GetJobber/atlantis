import React, { CSSProperties } from "react";
import { IconColorNames, IconNames, IconSizes, getIcon } from "@jobber/design";

export { IconColorNames, IconNames } from "@jobber/design";

export interface IconProps {
  /** The icon to show.  */
  readonly name: IconNames;

  /**
   * Changes the size to small or large.
   * @default base
   */
  readonly size?: IconSizes;

  /**
   * Determines the color of the icon. Some icons have a default system colour
   * like quotes, jobs, and invoices. Others that doesn't have a system colour
   * falls back to greyBlueDark.
   */
  readonly color?: IconColorNames;

  /**
   * Sets a custom color for the icon. Can be a rgb() or hex value.
   */
  readonly customColor?: string;

  /**
   * Used to locate this view in end-to-end tests
   */
  readonly testID?: string;

  /**
   * **Use at your own risk:** Custom classnames for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_className?: {
    svg?: string;
    path?: string;
  };

  /**
   * **Use at your own risk:** Custom style for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_style?: {
    svg?: CSSProperties;
    path?: CSSProperties;
  };
}

export function Icon({
  name,
  color,
  customColor,
  size = "base",
  testID,
  UNSAFE_className,
  UNSAFE_style,
}: IconProps) {
  let icon;
  const { svgStyle, pathStyle, paths, viewBox } = getIcon({
    name,
    color: getIconColor(name, color),
    size,
    platform: "web",
  });

  if (name === "truck") {
    icon = getTruck(pathStyle, customColor);
  } else {
    icon = paths.map((path: string) => (
      <path
        key={path}
        style={{ ...pathStyle, ...UNSAFE_style?.path }}
        className={UNSAFE_className?.path}
        d={path}
        fill={customColor}
      />
    ));
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      style={{ ...svgStyle, ...UNSAFE_style?.svg }}
      className={UNSAFE_className?.svg}
      data-testid={testID || name}
    >
      {icon}
    </svg>
  );
}

function getIconColor(name: IconNames, color?: IconColorNames) {
  if (name === "truck") {
    return color || "green";
  }

  return color;
}

function getTruck(pathStyle: { fill: string }, customColor?: string) {
  return (
    <g transform="translate(233.000000, 0.000000)" style={{ ...pathStyle }}>
      <path
        d="M31.030303,124.121212 C31.030303,106.983796 44.9231903,93.0909091 62.0606061,93.0909091 L93.0909091,93.0909091 L93.0909091,279.272727 L62.0606061,279.272727 C44.9231903,279.272727 31.030303,265.37984 31.030303,248.242424 L31.030303,124.121212 Z M31.030303,744.727273 C31.030303,727.589236 44.9231903,713.69697 62.0606061,713.69697 L93.0909091,713.69697 L93.0909091,899.878788 L62.0606061,899.878788 C44.9231903,899.878788 31.030303,885.986521 31.030303,868.848485 L31.030303,744.727273 Z M62.0606061,961.939394 L496.484848,961.939394 L496.484848,992.969697 C496.484848,1010.10773 482.592582,1024 465.454545,1024 L93.0909091,1024 C75.9534933,1024 62.0606061,1010.10773 62.0606061,992.969697 L62.0606061,961.939394 Z M494.858861,713.715588 L463.834764,714.258618 L467.083636,900.412509 L498.107733,899.869479 C515.242667,899.571588 528.889794,885.437285 528.591903,868.302352 L526.425988,744.199758 C526.128097,727.064824 511.993794,713.417697 494.858861,713.715588 Z M496.484848,93.0909091 L465.454545,93.0909091 L465.454545,279.272727 L496.484848,279.272727 C513.622885,279.272727 527.515152,265.37984 527.515152,248.242424 L527.515152,124.121212 C527.515152,106.983796 513.622885,93.0909091 496.484848,93.0909091 Z"
        id="Shape"
        fill="#2B2B2B"
      ></path>
      <path
        d="M124.121212,0 C89.8460703,0 62.0606061,27.7854642 62.0606061,62.0606061 L62.0606061,310.30303 L31.030303,310.30303 C13.8927321,310.30303 0,324.195297 0,341.333333 L62.0606061,341.333333 L62.0606061,992.969697 L496.484848,992.969697 L496.484848,341.333333 L558.545455,341.333333 C558.545455,324.195297 544.653188,310.30303 527.515152,310.30303 L496.484848,310.30303 L496.484848,62.0606061 C496.484848,27.7854642 468.700315,0 434.424242,0 L124.121212,0 Z"
        id="Path"
        fill={customColor}
      ></path>
      <path
        d="M465.454545,589.575758 L93.0909091,589.575758 L93.0909091,713.69697 L124.121212,713.69697 C141.258628,713.69697 155.151515,727.589236 155.151515,744.727273 L155.151515,868.848485 C155.151515,885.986521 141.258628,899.878788 124.121212,899.878788 L93.0909091,899.878788 L93.0909091,961.939394 L465.454545,961.939394 L465.454545,899.878788 L434.424242,899.878788 C417.286206,899.878788 403.393939,885.986521 403.393939,868.848485 L403.393939,744.727273 C403.393939,727.589236 417.286206,713.69697 434.424242,713.69697 L465.454545,713.69697 L465.454545,589.575758 Z"
        id="Path"
        fillOpacity="0.35"
        fill="#000000"
      ></path>
      <path
        d="M93.0909091,62.0606061 C93.0909091,44.9231903 106.983796,31.030303 124.121212,31.030303 L434.424242,31.030303 C451.562279,31.030303 465.454545,44.9231903 465.454545,62.0606061 L465.454545,589.575758 L93.0909091,589.575758 L93.0909091,62.0606061 Z M93.0909091,713.69697 L124.121212,713.69697 C141.258628,713.69697 155.151515,727.589236 155.151515,744.727273 L155.151515,868.848485 C155.151515,885.986521 141.258628,899.878788 124.121212,899.878788 L93.0909091,899.878788 L93.0909091,713.69697 Z M434.424242,713.69697 C417.286206,713.69697 403.393939,727.589236 403.393939,744.727273 L403.393939,868.848485 C403.393939,885.986521 417.286206,899.878788 434.424242,899.878788 L465.454545,899.878788 L465.454545,713.69697 L434.424242,713.69697 Z"
        id="Shape"
        fill="#FFFFFF"
        opacity="0.5"
      ></path>
      <path
        d="M93.0909091,279.272727 C113.777881,268.929396 192.387879,248.242424 279.272727,248.242424 C366.157576,248.242424 444.766642,268.929396 465.454545,279.272727 L403.393939,372.363636 C393.051539,362.021236 341.333333,341.333333 279.272727,341.333333 C217.212121,341.333333 165.494846,362.021236 155.151515,372.363636 L93.0909091,279.272727 Z M155.151515,512 L155.151515,403.393939 L93.0909091,310.30303 L93.0909091,512 L155.151515,512 Z M403.393939,512 L403.393939,403.393939 L465.454545,310.30303 L465.454545,512 L403.393939,512 Z"
        id="Shape"
        fill="#2A2A2A"
      ></path>
    </g>
  );
}
