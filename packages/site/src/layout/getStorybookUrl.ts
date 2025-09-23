// Gets the storybook URL depending on where you're calling from.

const pathPrefixes = {
  web: "storybook/web",
  mobile: "storybook/mobile",
};

// Eventually this will be a one stop shop for determining where the storybook instance you want to load is
// based on the environment you're in. We'll eventually have links for both web and mobile storybooks and potentially
// others as we bring them in. Originally there was an optional 'type' parameter that defaulted to 'legacy'
// but when I commented that out because it's future code, I got a warning that the parameter was unused so add a 'type'
// param back in when you're ready to support Storybook 8.0 and beyond.
export const getStorybookUrl = (path: string, type?: "web" | "mobile") => {
  let hostname = (window as AtlantisWindow)?.env?.VITE_STORYBOOK_URL;

  if (import.meta.env.DEV) {
    if (type === "web") {
      // Storybook v9 (components)
      hostname = "http://localhost:6007/";
    } else if (type === "mobile") {
      // Storybook v9 (components-native)
      hostname = "http://localhost:6008/";
    } else {
      // Storybook v7
      hostname = "http://localhost:6005/";
    }
  } else if (!hostname) {
    const prefix = (type && pathPrefixes[type]) || "";
    hostname = `https://${window.location.hostname}/${prefix}/`;
  }

  return `${hostname}${path}`;
};
