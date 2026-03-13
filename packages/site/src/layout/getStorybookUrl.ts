const storybookHosts = {
  web: "/storybook/web",
  mobile: "/storybook/mobile",
};

export const getStorybookUrl = (
  path: string,
  type: keyof typeof storybookHosts,
) => {
  return `${storybookHosts[type]}/${path}`;
};
