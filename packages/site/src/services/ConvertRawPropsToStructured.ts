import { FormattedProp, PropStructure } from "../types/services";

export const ConvertRawPropsToStructured = (
  unformatted: Array<PropStructure>,
) => {
  const formatted: Array<FormattedProp> = [];

  let index = 0;

  for (const form of unformatted) {
    for (const key in form.props) {
      if (Object.hasOwn(form.props, key)) {
        index++;
        const prop = form.props[key];

        convertItem(prop, formatted, index, key);
      }
    }
  }

  return formatted;
};

function convertItem(
  prop: { type: { name: string }; description: string },
  formatted: FormattedProp[],
  index: number,
  key: string,
) {
  if (prop.type.name === "string" || prop.type.name === "any") {
    formatted.push({
      id: "string" + String(index),
      key,
      description: prop.description,
      type: "string",
    });
  } else if (prop.type.name === "boolean") {
    formatted.push({
      id: "boolean" + String(index),
      key,
      description: prop.description,
      type: "boolean",
    });
  } else if (/"([^"]+)"(\s*\|\s*"([^"]+)")*/.test(prop.type.name)) {
    const options = prop.type.name
      .replace(/"/g, "")
      .split("|")
      .map(d => d.trim());
    formatted.push({
      id: String(index),
      key,
      description: prop.description,
      options,
      type: "option",
    });
  } else if (/\(\s*.*?\s*\)\s*=>\s*.*/.test(prop.type.name)) {
    formatted.push({
      id: String(index),
      key,
      description: prop.description,
      type: "callback",
    });
  } else {
    formatted.push({
      id: String(index),
      key,
      description: prop.description,
      type: "unknown",
    });
  }
}
