export function mockUseMediaQuery() {
  return { cleanup, setMediaQueryResult };
}

const defaultMatchMedia = window.matchMedia;

/**
 * @param computeMediaQuery A function that takes a media query string and returns a boolean indicating whether the media query should be matched
 */
function setMediaQueryResult(computeMediaQuery: (query: string) => boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => {
      const matches = computeMediaQuery(query);
      const instance = {
        matches: matches,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated but some packages use it
        removeListener: jest.fn(), // Deprecated but some packages use it
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };

      return instance;
    }),
  });
}

function cleanup() {
  window.matchMedia = defaultMatchMedia;
}
