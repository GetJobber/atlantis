import {
  convertJSTokensToCSS,
  convertJSTokensToObjectString,
  convertJSTokensToTheme,
  replaceTokenAliasesWithActualValues,
} from "../scripts/tokenServices/tokenFileGeneration";

describe("the basic token set", () => {
  it("Can generate a basic theme file", () => {
    const tokens = convertJSTokensToTheme(
      { "color-beep-boop": "green" },
      "value",
      [
        {
          key: "data-other",
          value: "enabled",
          tokens: { "color-beep-boop": "red" },
        },
      ],
    );
    expect(tokens).toContain(':root[data-theme="value"]');
  });

  it("Can generate a slightly more complicated theme file", () => {
    const tokens = convertJSTokensToTheme(
      { "color-beep-boop": "green" },
      "value",
      [
        {
          key: "data-other",
          value: "enabled",
          tokens: { "color-beep-boop": "red" },
        },
      ],
    );
    expect(tokens).toContain(
      '[data-other="enabled"] {\n  --color-beep-boop: red;\n}\n',
    );
  });

  it("Can convert an JS Token Object to a CSS File", () => {
    const tokens = convertJSTokensToCSS({ "color-beep-boop": "green" });
    expect(tokens).toContain(":root {\n  --color-beep-boop: green;\n}\n");
  });

  it("can convert a JS Token Object to a CSS file with multiple tokens", () => {
    const tokens = convertJSTokensToCSS({
      "color-beep-boop": "green",
      "color-boop-beep": "blue",
    });
    expect(tokens).toContain(
      ":root {\n  --color-beep-boop: green;\n  --color-boop-beep: blue;\n}\n",
    );
  });

  it("can convert a js token object to an esm object string, ready to be written to a file", () => {
    const tokens = convertJSTokensToObjectString({
      "color-beep-boop": "green",
    });
    expect(tokens).toContain("export default {");
  });

  it("can convert a js token object to a cjs object string, ready to be written to a file", () => {
    const tokens = convertJSTokensToObjectString(
      {
        "color-beep-boop": "green",
      },
      false,
    );
    expect(tokens).toContain("module.exports");
  });

  it("can replace a token alias with a legit value", () => {
    const tokens = replaceTokenAliasesWithActualValues({
      "color-boop-beep": "blue",
      "color-beep-boop": "{color.boop.beep}",
    });
    expect(tokens["color-beep-boop"]).toBe("blue");
  });

  it("can replace a more complex token alias with a legit value", () => {
    const tokens = replaceTokenAliasesWithActualValues({
      "my-long-super--verbose-value": "24px",
      "short-val": "{my.long.super-.verbose.value}",
    });
    expect(tokens["short-val"]).toBe("24px");
  });
});
