import * as fs from "fs/promises";
import * as allExports from "../../index";

jest.mock("../../AutoLink/clipboard", () => {
  return {
    copyTextToClipboard: jest.fn(),
  };
});

describe("meta", () => {
  // If this test fails, please update meta.json accordingly.
  it("verifies that the meta.json file is up to date", async () => {
    const meta = await fs.readFile(`${__dirname}/meta.json`, "utf-8");
    const allNames = findComponentNamesDeep(allExports);
    allNames.sort();

    expect(JSON.parse(meta)).toStrictEqual({
      exportedComponents: allNames,
    });
  });
});

// NOTE: Keep this in sync with components/src/utils/meta/meta.test.tsx
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isComponent(name: string, value: any): boolean {
  const isFirstLetterUppercase = /^[A-Z]/.test(name);
  const isFunctionComponent = typeof value === "function";

  return isFirstLetterUppercase && isFunctionComponent;
}

// NOTE: Keep this in sync with components/src/utils/meta/meta.test.tsx
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isContext(value: any): boolean {
  return (
    value &&
    typeof value === "object" &&
    Object.prototype.hasOwnProperty.call(value, "Provider") &&
    Object.prototype.hasOwnProperty.call(value, "Consumer")
  );
}

// NOTE: Keep this in sync with components/src/utils/meta/meta.test.tsx
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isForwardedRef(name: string, value: any): boolean {
  const isFirstLetterUppercase = /^[A-Z]/.test(name);

  return (
    isFirstLetterUppercase &&
    value &&
    typeof value === "object" &&
    typeof value.render === "function"
  );
}

// NOTE: Keep this in sync with components/src/utils/meta/meta.test.tsx
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isMemoizedComponent(name: string, value: any): boolean {
  const isFirstLetterUppercase = /^[A-Z]/.test(name);

  return (
    isFirstLetterUppercase &&
    value &&
    typeof value === "object" &&
    typeof value.$$typeof === "symbol" &&
    value.$$typeof.toString() === "Symbol(react.memo)" &&
    typeof value.type === "function"
  );
}

// NOTE: Keep this in sync with components/src/utils/meta/meta.test.tsx
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function findComponentNamesDeep(objectOrFunction: any, name?: string) {
  const entries = [...Object.entries(objectOrFunction)];

  return entries.reduce<string[]>((allNames, [k, v]) => {
    if (isContext(v)) {
      allNames.push(`${k}.Provider`, `${k}.Consumer`);
    } else if (isForwardedRef(k, v) || isMemoizedComponent(k, v)) {
      const thisName = name ? `${name}.${k}` : k;
      allNames.push(thisName);
    } else if (isComponent(k, v)) {
      const thisName = name ? `${name}.${k}` : k;
      allNames.push(thisName);

      const childComponents = findComponentNamesDeep(v, k);
      allNames.push(...childComponents);
    }

    return allNames;
  }, []);
}
