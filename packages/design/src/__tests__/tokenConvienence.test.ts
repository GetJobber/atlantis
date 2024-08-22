import {
  buildFullCSS,
  convertRawTokensToCSSFile,
  convertRawTokensToJSFile,
  convertRawTokensToThemeFile,
  createCSSFileFromSubset,
  createTokenFileContentsForCSS,
  createTokenFileContentsForJS,
  createTokenFileContentsForPlatform,
  createTokenFileFromSubset,
  createTokenSubset,
  getRawTokens,
  parseAllTokenVariables,
  parseToJs,
  parseTokenNames,
  parseTokens,
} from "../scripts/tokenServices/tokenConvienence";

describe("Token Convienence", () => {
  it("Can parse all token variables, no matter how much nesting", () => {
    const tokens = parseAllTokenVariables({
      "color-beep-boop": "green",
      "color-first-step": "{color.beep.boop}",
      "color-second-step": "{color.first.step}",
    });
    expect(tokens["color-second-step"]).toEqual("green");
  });

  it("can parse all the tokens to a js object", () => {
    const tokens = parseToJs("web");
    expect(tokens["base-unit"]).toBe("16px");
  });

  it("can parse all the tokens to a js object, but for android", () => {
    const tokens = parseToJs("android");
    expect(tokens["typography--fontSize-jumbo"]).toBe(32);
  });

  it("can parse all the tokens to a js object, but for ios", () => {
    const tokens = parseToJs("ios");
    expect(tokens["typography--fontSize-jumbo"]).toBe(32);
  });

  it("can generate a js object file, ready for writing", () => {
    const tokens = createTokenFileContentsForPlatform("web");
    expect(tokens).toContain("export default {");
    expect(tokens).toContain(`"base-unit": "16px"`);
  });

  it("create a subset of tokens", () => {
    const elevationTokens = createTokenSubset(["elevation"]);
    expect(elevationTokens).toHaveProperty("elevation-base");
    expect(elevationTokens).not.toHaveProperty("color-surface");
  });
  it("can create token file contents for css", () => {
    const cssElevationTokens = createTokenFileContentsForCSS(["space"]);
    expect(cssElevationTokens["space-minuscule"]).toBe("1px");
  });
  it("can create token file contents for js", () => {
    const cssElevationTokens = createTokenFileContentsForJS(["space"]);
    expect(cssElevationTokens["space-minuscule"]).toBe("1");
  });
  it("can create a token file from a subset", () => {
    const contents = createTokenFileFromSubset(["space"]);
    expect(contents).toContain("export default {");
  });

  it("can create a css file from a subset", () => {
    const contents = createCSSFileFromSubset(["space"]);
    expect(contents).toContain(":root {");
  });
});

describe("Token Convienence Parsing", () => {
  it("can parse Tokens", () => {
    const contents = parseTokens(["color"], false, "js");
    expect(contents["color-base-black"]).toBe("{color.black}");
  });

  it("can parse token names", () => {
    const tokenNames = parseTokenNames(["color"]);
    expect(tokenNames).toContain("color-base-black");
  });

  it("can convert raw tokens to js file", () => {
    const tokens = convertRawTokensToJSFile({ "color-beep-boop": "green" });
    expect(tokens).toContain(`export default {\n  "color-beep-boop": "green`);
  });
  it("can convert raw tokens to css file", () => {
    const tokens = convertRawTokensToCSSFile({ "color-beep-boop": "green" });
    expect(tokens).toContain(`:root {\n  --color-beep-boop: green`);
  });
  it("can convert raw tokens to theme file", () => {
    const tokens = convertRawTokensToThemeFile(
      { "color-beep-boop": "green" },
      "my-theme-name",
      [],
    );
    expect(tokens).toContain(`@media screen {`);
    expect(tokens).toContain(`my-theme-name`);
    expect(tokens).toContain(`green`);
  });

  it("can retrieve raw tokens", () => {
    const tokens = getRawTokens(true, "css");
    expect(tokens).toHaveProperty("color-surface--background--subtle");
  });
  it("can build a full css file", () => {
    const fullCSS = buildFullCSS();
    expect(fullCSS).toContain(":root {");
    expect(fullCSS).toContain("@import");
  });
});
