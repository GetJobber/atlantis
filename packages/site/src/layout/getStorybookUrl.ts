// Gets the storybook URL depending on where you're calling from.

export const getStorybookUrl = (path: string) => {
  let hostname = (window as AtlantisWindow)?.env?.VITE_STORYBOOK_URL;

  if (!hostname && import.meta.env.DEV) {
    hostname = "http://localhost:6005/";
  } else if (!hostname) {
    hostname = "https://atlantis.getjobber.com/";
  }

  /**
  if (import.meta.env.DEV && type === "legacy") {
  } else if (import.meta.env.DEV && type === "web") {
    hostname = "http://localhost:6007/";
  } else if (import.meta.env.DEV && type === "mobile") {
    hostname = "http://localhost:6008/";
  }
   */

  return `${hostname}${path}`;
};
