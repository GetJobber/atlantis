import { MAX_DEPTH, baseUnit } from "../scripts/tokenServices/tokenConstants";
import {
  parseOverrides,
  recurseTokenTree,
  resetRecurseCounter,
} from "../scripts/tokenServices/tokenParsing";
import { ParsedTokens } from "../scripts/tokenServices/tokenTypes";
import {
  createTokenFileContentsForPlatform,
  parseToJs,
} from "../scripts/tokenServices/tokenConvienence";

describe("Token Override Parsing", () => {
  it("Parses a basic override token", () => {
    const MyTestValue = "TestValue";
    const tokens: ParsedTokens = parseOverrides(
      {
        platformOverrides: {
          ios: {
            myToken: {
              $value: MyTestValue,
            },
          },
          android: {},
        },
      },
      "ios",
    );
    expect(tokens.myToken).toBe(MyTestValue);
  });
  it("Parses and transforms a basic override js token", () => {
    const MyTestValue = "10px";
    const MyTestValueWithoutPxAsNum = MyTestValue.replace("px", "");
    const tokens: ParsedTokens = parseOverrides(
      {
        platformOverrides: {
          ios: {
            myToken: {
              $type: "dimension",
              $value: MyTestValue,
            },
          },
          android: {},
        },
      },
      "ios",
      "js",
    );
    expect(tokens.myToken).toBe(MyTestValueWithoutPxAsNum);
  });
  it("Parses and transforms a basic override css token", () => {
    const MyTestValue = "10px";
    const tokens: ParsedTokens = parseOverrides(
      {
        platformOverrides: {
          ios: {
            myToken: {
              $type: "dimension",
              $value: MyTestValue,
            },
          },
          android: {},
        },
      },
      "ios",
    );
    expect(tokens.myToken).toBe(MyTestValue);
  });
  it("Parses a more complicated android override token", () => {
    const MyIOSTestValue = "TestValueIos";
    const MyAndroidTestValue = "TestValueAndroid";
    const tokens: ParsedTokens = parseOverrides(
      {
        platformOverrides: {
          ios: {
            myToken: {
              mySuperToken: {
                "mySuperCoolToken-": {
                  $value: MyIOSTestValue,
                },
              },
            },
          },
          android: {
            myToken: {
              "mySuperCoolToken-": {
                mySuperToken: {
                  $value: MyAndroidTestValue,
                },
              },
            },
          },
        },
      },
      "android",
    );
    expect(tokens["myToken-mySuperCoolToken--mySuperToken"]).toBe(
      MyAndroidTestValue,
    );
  });

  it("Parses a more complicated ios override token", () => {
    const MyIOSTestValue = "TestValueIos";
    const MyAndroidTestValue = "TestValueAndroid";
    const tokens: ParsedTokens = parseOverrides(
      {
        platformOverrides: {
          ios: {
            myToken: {
              "mySuperCoolToken-": {
                mySuperToken: {
                  $value: MyIOSTestValue,
                },
              },
            },
          },
          android: {
            myToken: {
              "mySuperCoolToken-": {
                mySuperToken: {
                  $value: MyAndroidTestValue,
                },
              },
            },
          },
        },
      },
      "ios",
    );
    expect(tokens["myToken-mySuperCoolToken--mySuperToken"]).toBe(
      MyIOSTestValue,
    );
  });
  it("Errors out after the maximum depth is achieved", () => {
    const MyTestValue = "TestValue";
    const overrideConfig = {
      platformOverrides: {
        ios: {
          myToken: {
            value: MyTestValue,
          },
        },
        android: {},
      },
    };
    let message: string = "";

    try {
      parseOverrides(overrideConfig, "ios");
    } catch (e) {
      message = e.message;
    }

    expect(message).toBe(
      `Maximum depth of ${MAX_DEPTH} nested groups reached. Are you missing a $value key?`,
    );
  });
});

describe("Token Parsing", () => {
  it("Can parse a basic token", () => {
    resetRecurseCounter();
    const tokens = recurseTokenTree(
      { color: { $type: "color", $value: "red" } },
      "",
      {},
      undefined,
      true,
      "css",
    );
    expect(tokens.color).toBe("red");
  });

  it("Can parse a slightly more advanced token", () => {
    const color = "green";
    resetRecurseCounter();
    const tokens = recurseTokenTree(
      { color: { $type: "color", background: { $value: color } } },
      "",
      {},
      undefined,
      true,
      "css",
    );
    expect(tokens["color-background"]).toBe(color);
  });
  it("Can parse an even more advanced token", () => {
    const color = "#333";
    resetRecurseCounter();
    const tokens = recurseTokenTree(
      {
        color: {
          $type: "color",
          "background-": { superbackground: { $value: color } },
        },
      },
      "",
      {},
      undefined,
      true,
      "css",
    );
    expect(tokens["color-background--superbackground"]).toBe(color);
  });
});

describe("the basic token set", () => {
  it("has a base unit token inside the string", () => {
    const jsTokens = createTokenFileContentsForPlatform("web");
    expect(jsTokens).toContain(`"base-unit": "${baseUnit}"`);
  });
  it("has a base unit token", () => {
    const jsTokens = parseToJs("web");
    expect(jsTokens["base-unit"]).toBe(baseUnit);
  });
  it("has a surface token", () => {
    const jsTokens = parseToJs("web");
    expect(jsTokens["color-surface"]).toBeDefined();
  });
  it("has a surface background token", () => {
    const jsTokens = parseToJs("web");
    expect(jsTokens["color-surface--background"]).toBeDefined();
  });
  it("has a surface background hover token", () => {
    const jsTokens = parseToJs("web");
    expect(jsTokens["color-surface--background--hover"]).toBeDefined();
  });
});
