let defaultMatchMedia: typeof window.matchMedia;
let defaultResizeTo: typeof window.resizeTo;
let defaultInnerWidth: typeof window.innerWidth;

export function mockViewportWidth() {
  defaultMatchMedia = window.matchMedia;
  defaultResizeTo = window.resizeTo;
  defaultInnerWidth = window.innerWidth;

  return { cleanup, setViewportWidth };
}

function setViewportWidth(newWidth: number) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => {
      const matches = isQueryMatching(query);
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

      window.addEventListener("resize", () => {
        if (matches != instance.matches) {
          instance.matches = matches;
          instance.dispatchEvent("change");
        }
      });

      return instance;
    }),
  });

  Object.defineProperty(window, "resizeTo", {
    value: (width: number) => {
      Object.defineProperty(window, "innerWidth", {
        configurable: true,
        writable: true,
        value: width,
      });
      window.dispatchEvent(new Event("resize"));
    },
  });

  window.resizeTo(newWidth, window.innerHeight);
}

function cleanup() {
  window.matchMedia = defaultMatchMedia;
  window.resizeTo = defaultResizeTo;
  window.innerWidth = defaultInnerWidth;
}

export function isQueryMatching(query: string) {
  const match = query.match(/(min-width|max-width):\s*(\d+)/);
  if (!match) return false;

  const { innerWidth } = window;
  const [, operator, value] = match;
  const breakpoint = parseInt(value, 10);

  switch (operator) {
    case "max-width":
      return innerWidth <= breakpoint;
    case "min-width":
      return innerWidth >= breakpoint;
  }
}
