const defaultMatchMedia = window.matchMedia;
const defaultResizeTo = window.resizeTo;
const defaultInnerWidth = window.innerWidth;

export function mockViewportWidth() {
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
  const match = query.match(/(\w+)\s*(<|<=|>|>=|=)\s*(\d+)/);
  if (!match) return false;

  const { innerWidth } = window;
  const [, , operator, value] = match;
  const breakpoint = parseInt(value, 10);

  switch (operator) {
    case "<":
      return innerWidth < breakpoint;
    case "<=":
      return innerWidth <= breakpoint;
    case ">":
      return innerWidth > breakpoint;
    case ">=":
      return innerWidth >= breakpoint;
    case "=":
      return innerWidth === breakpoint;
  }
}
