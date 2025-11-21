import { filterDataAttributes } from "./filterDataAttributes";

describe("filterDataAttributes", () => {
  it("should filter and return only data-* attributes", () => {
    const props = {
      value: "test",
      onChange: () => jest.fn(),
      "data-test-id": "my-input",
      "data-loading": "true",
      placeholder: "Enter text",
      disabled: false,
    };

    const result = filterDataAttributes(props);

    expect(result).toEqual({
      "data-test-id": "my-input",
      "data-loading": "true",
    });
  });

  it("should return an empty object when no data attributes are present", () => {
    const props = {
      value: "test",
      onChange: () => jest.fn(),
      placeholder: "Enter text",
      disabled: false,
    };

    const result = filterDataAttributes(props);

    expect(result).toEqual({});
  });

  it("should handle data attributes with various value types", () => {
    const props = {
      "data-string": "value",
      "data-number": 123,
      "data-boolean": true,
      "data-null": null,
      "data-undefined": undefined,
      "data-object": { nested: "value" },
      normalProp: "excluded",
    };

    const result = filterDataAttributes(props);

    expect(result).toEqual({
      "data-string": "value",
      "data-number": 123,
      "data-boolean": true,
      "data-null": null,
      "data-undefined": undefined,
      "data-object": { nested: "value" },
    });
  });

  it("should handle props with hyphenated non-data attributes", () => {
    const props = {
      "data-test-id": "test",
      "aria-label": "label",
      "aria-describedby": "description",
      className: "my-class",
    };

    const result = filterDataAttributes(props);

    expect(result).toEqual({
      "data-test-id": "test",
    });
  });

  it("should handle data attributes with complex naming", () => {
    const props = {
      "data-test": "simple",
      "data-test-id": "hyphenated",
      "data-my-custom-long-attribute-name": "complex",
      "data-a": "single-letter",
      notData: "excluded",
    };

    const result = filterDataAttributes(props);

    expect(result).toEqual({
      "data-test": "simple",
      "data-test-id": "hyphenated",
      "data-my-custom-long-attribute-name": "complex",
      "data-a": "single-letter",
    });
  });

  it("should handle empty props object", () => {
    const props = {};

    const result = filterDataAttributes(props);

    expect(result).toEqual({});
  });

  it("should not mutate the original props object", () => {
    const props = {
      "data-test": "value",
      normalProp: "normal",
    };

    const originalProps = { ...props };
    filterDataAttributes(props);

    expect(props).toEqual(originalProps);
  });

  it("should handle props with data- prefix in value but not in key", () => {
    const props = {
      "data-test": "value",
      normalProp: "data-something",
      anotherProp: "data-",
    };

    const result = filterDataAttributes(props);

    expect(result).toEqual({
      "data-test": "value",
    });
  });
});
