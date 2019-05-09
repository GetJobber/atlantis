declare const global: {};

function getGlobal() {
  if (typeof window !== "undefined") {
    return window;
  }

  return global;
}

const glob = getGlobal();

export { glob as global };
