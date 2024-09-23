export const getStorybookUrl = (path: string, type = "legacy") => {
  let hostname = "https://atlantis.getjobber.com/";

  if (import.meta.env.DEV && type === "legacy") {
    hostname = "http://localhost:6005/";
  } else if (import.meta.env.DEV && type === "web") {
    hostname = "http://localhost:6007/";
  } else if (import.meta.env.DEV && type === "mobile") {
    hostname = "http://localhost:6008/";
  }

  return `${hostname}${path}`;
};
