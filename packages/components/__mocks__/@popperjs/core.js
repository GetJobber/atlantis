// Mock popper to avoid forceUpdate causing act warnings with testing-library.
export function createPopper() {
  return {
    destroy: jest.fn(),
    forceUpdate: jest.fn(),
    update: jest.fn(),
  };
}
