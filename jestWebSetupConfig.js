import "@testing-library/jest-dom";

if (typeof window !== "undefined" && window.PointerEvent == null) {
  class PointerEvent extends MouseEvent {}
  window.PointerEvent = PointerEvent;
  global.PointerEvent = PointerEvent;
}
