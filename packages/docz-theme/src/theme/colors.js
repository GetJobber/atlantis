import colors from "@jobber/design/colors";

const jobberColors = createColors();

// eslint-disable-next-line import/no-default-export
export default {
  ...jobberColors,
  background: jobberColors.white,
  blockquote: {
    border: jobberColors.greyLight,
  },
  sidebar: {
    navLink: jobberColors.red,
  },
  playground: {
    border: jobberColors.greyLight,
  },
};

/**
 * Creates an array of all the colors used in @jobber/design
 */
function createColors() {
  const { customProperties } = colors;
  const colorArray = [];
  Object.keys(customProperties).forEach(val => {
    let name = val.replace("--color-", "");
    name = name.split("--");
    name.forEach((value, index) => {
      if (index !== 0) {
        name[index] = value.charAt(0).toUpperCase() + value.slice(1);
      }
    });
    name = name.join("");

    colorArray[name] = `var(${val})`;
  });

  return colorArray;
}
