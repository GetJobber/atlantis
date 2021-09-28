class ResizeObserver {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
}

export const MockResizeObserver = window.ResizeObserver || ResizeObserver;
