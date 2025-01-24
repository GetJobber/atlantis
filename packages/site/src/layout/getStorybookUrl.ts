// Gets the storybook URL depending on where you're calling from.

// Eventually this will be a one stop shop for determining where the storybook instance you want to load is
// based on the environment you're in. We'll eventually have links for both web and mobile storybooks and potentially
// others as we bring them in. Originally there was an optional 'type' parameter that defaulted to 'legacy'
// but when I commented that out because it's future code, I got a warning that the parameter was unused so add a 'type'
// param back in when you're ready to support Storybook 8.0 and beyond.
export const getStorybookUrl = (path: string) => {
  let hostname = (window as AtlantisWindow)?.env?.VITE_STORYBOOK_URL;

  if (!hostname && import.meta.env.DEV) {
    hostname = "http://localhost:6005/";
  } else if (!hostname) {
    hostname = `https://${window.location.hostname}/`;
  }

  // This is an example of how I think this can be used in the future. If there's a better way, we can do that instead!
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
