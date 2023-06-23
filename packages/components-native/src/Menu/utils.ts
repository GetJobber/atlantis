import { LayoutRectangle } from "react-native";
import { styles } from "./Menu.style";

interface ScreenInfo {
  windowHeight: number;
  headerHeight: number;
  windowWidth: number;
}

export function findViewpoint(
  screenInfo: ScreenInfo,
  activatorLayout: LayoutRectangle,
): { [key: string]: number | undefined } {
  const { windowHeight, windowWidth, headerHeight } = screenInfo;
  const pos: { [key: string]: number | undefined } = {};
  const menuWidth = styles.menu.width;
  const windowHalf = (windowHeight - headerHeight) / 2 + headerHeight;
  const menuPositionVertical =
    activatorLayout.y + activatorLayout.height > windowHalf
      ? "menuAbove"
      : "menuBelow";

  const menuPositionHorizontal =
    windowWidth / 2 > activatorLayout.width / 2 + activatorLayout.x
      ? "menuRight"
      : "menuLeft";

  const menuPadding = 36;

  getVerticalPosition(pos, windowHeight, activatorLayout, menuPositionVertical);

  getHorizontalPosition(
    pos,
    activatorLayout,
    windowWidth,
    menuPadding,
    menuWidth,
    menuPositionHorizontal,
  );

  return pos;
}

function getVerticalPosition(
  pos: { [key: string]: number | undefined },
  windowHeight: number,
  activatorLayout: LayoutRectangle,
  menuPositionVertical: string,
) {
  if (menuPositionVertical === "menuAbove") {
    getAbovePosition(pos, windowHeight, activatorLayout);
  }

  if (menuPositionVertical === "menuBelow") {
    getBelowPosition(pos, activatorLayout);
  }
}

function getBelowPosition(
  pos: { [key: string]: number | undefined },
  activatorLayout: LayoutRectangle,
) {
  pos.top = activatorLayout.y + activatorLayout.height;
}

function getAbovePosition(
  pos: { [key: string]: number | undefined },
  windowHeight: number,
  activatorLayout: LayoutRectangle,
) {
  pos.bottom = windowHeight - activatorLayout.y;
}

function getHorizontalPosition(
  pos: { [key: string]: number | undefined },
  activatorLayout: LayoutRectangle,
  windowWidth: number,
  menuPadding: number,
  menuWidth: number,
  menuPositionHorizontal: string,
) {
  if (menuPositionHorizontal === "menuRight") {
    getRightPosition(pos, activatorLayout, windowWidth, menuPadding, menuWidth);
  }
  if (menuPositionHorizontal === "menuLeft") {
    getLeftPosition(pos, activatorLayout, windowWidth, menuPadding, menuWidth);
  }
}

function getLeftPosition(
  pos: { [key: string]: number | undefined },
  activatorLayout: LayoutRectangle,
  windowWidth: number,
  menuHorizontalPadding: number,
  menuWidth: number,
) {
  const overflowLeft =
    windowWidth -
      activatorLayout.x -
      activatorLayout.width +
      activatorLayout.width / 2 -
      menuHorizontalPadding +
      menuWidth >
    windowWidth;

  const overflowRight =
    windowWidth -
      activatorLayout.x -
      activatorLayout.width +
      activatorLayout.width / 2 -
      menuHorizontalPadding <
    0;

  if (overflowLeft) {
    pos.right = undefined;
    pos.left = 0;
  } else if (overflowRight) {
    pos.right = 0;
  } else {
    pos.right =
      windowWidth -
      activatorLayout.x -
      activatorLayout.width +
      activatorLayout.width / 2 -
      menuHorizontalPadding;
  }
}

function getRightPosition(
  pos: { [key: string]: number | undefined },
  activatorLayout: LayoutRectangle,
  windowWidth: number,
  menuPadding: number,
  menuWidth: number,
) {
  const overflowRight =
    activatorLayout.x + activatorLayout.width / 2 - menuPadding + menuWidth >
    windowWidth;

  const overflowLeft =
    activatorLayout.x + activatorLayout.width / 2 - menuPadding < 0;

  if (overflowRight) {
    pos.left = undefined;
    pos.right = 0;
  } else if (overflowLeft) {
    pos.left = 0;
  } else {
    pos.left = activatorLayout.x + activatorLayout.width / 2 - menuPadding;
  }
}
