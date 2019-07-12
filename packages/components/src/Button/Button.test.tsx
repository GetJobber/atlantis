import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react";
import { Button } from ".";

it("renders a Button", () => {
  const tree = renderer.create(<Button label="Submit" />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
                        <button
                          className="button base work primary"
                          disabled={false}
                        >
                          <span
                            className="base small extraBold uppercase white"
                          >
                            Submit
                          </span>
                        </button>
            `);
});

it("renders a secondary Button", () => {
  const tree = renderer
    .create(<Button label="Submit" type="secondary" />)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
                        <button
                          className="button base work secondary"
                          disabled={false}
                        >
                          <span
                            className="base small extraBold uppercase green"
                          >
                            Submit
                          </span>
                        </button>
            `);
});

it("renders a tertiary Button", () => {
  const tree = renderer
    .create(<Button label="Submit" type="tertiary" />)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
                        <button
                          className="button base work tertiary"
                          disabled={false}
                        >
                          <span
                            className="base small extraBold uppercase green"
                          >
                            Submit
                          </span>
                        </button>
            `);
});

it("renders a destructuve Button", () => {
  const tree = renderer
    .create(<Button label="Submit" variation="destructive" />)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
                        <button
                          className="button base destructive primary"
                          disabled={false}
                        >
                          <span
                            className="base small extraBold uppercase white"
                          >
                            Submit
                          </span>
                        </button>
            `);
});

it("renders a learning Button", () => {
  const tree = renderer
    .create(<Button label="Submit" variation="learning" />)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
                        <button
                          className="button base learning primary"
                          disabled={false}
                        >
                          <span
                            className="base small extraBold uppercase white"
                          >
                            Submit
                          </span>
                        </button>
            `);
});

it("renders a cancel Button", () => {
  const tree = renderer
    .create(<Button label="Submit" variation="cancel" />)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
                        <button
                          className="button base cancel primary"
                          disabled={false}
                        >
                          <span
                            className="base small extraBold uppercase greyBlue"
                          >
                            Submit
                          </span>
                        </button>
            `);
});

it("renders a disabled Button", () => {
  const tree = renderer
    .create(<Button label="Submit" disabled={true} />)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
                        <button
                          className="button base work primary disabled"
                          disabled={true}
                        >
                          <span
                            className="base small extraBold uppercase grey"
                          >
                            Submit
                          </span>
                        </button>
            `);
});

it("renders a Button with a link and opens in new tab", () => {
  const tree = renderer
    .create(<Button label="Submit" url="💩.com" external={true} />)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
                    <a
                      className="button base work primary"
                      disabled={false}
                      href="💩.com"
                      target="_blank"
                    >
                      <span
                        className="base small extraBold uppercase white"
                      >
                        Submit
                      </span>
                    </a>
          `);
});

it("renders a Button with an icon", () => {
  const tree = renderer.create(<Button label="Add" icon="add" />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <button
      className="button base hasIcon work primary"
      disabled={false}
    >
      <div
        className="icon add base"
      />
      <span
        className="base small extraBold uppercase white"
      >
        Add
      </span>
    </button>
  `);
});

it("renders a Button with an icon on the right", () => {
  const tree = renderer
    .create(<Button label="Add" icon="add" iconOnRight={true} />)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <button
      className="button base hasIcon iconOnRight work primary"
      disabled={false}
    >
      <div
        className="icon add base"
      />
      <span
        className="base small extraBold uppercase white"
      >
        Add
      </span>
    </button>
  `);
});

it("renders a small Button", () => {
  const tree = renderer.create(<Button label="Add" size="small" />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
            <button
              className="button small work primary"
              disabled={false}
            >
              <span
                className="base smaller extraBold uppercase white"
              >
                Add
              </span>
            </button>
      `);
});

it("renders a large Button", () => {
  const tree = renderer.create(<Button label="Add" size="large" />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
            <button
              className="button large work primary"
              disabled={false}
            >
              <span
                className="base base extraBold uppercase white"
              >
                Add
              </span>
            </button>
      `);
});

test("it should call the handler on click", () => {
  const label = "Click Me";
  const clickHandler = jest.fn();
  const { getByText } = render(<Button label={label} onClick={clickHandler} />);

  fireEvent.click(getByText(label));
  expect(clickHandler).toHaveBeenCalledTimes(1);
});

test("it shouldn't call the handler on click when disabled", () => {
  const label = "I'm disabled";
  const clickHandler = jest.fn();
  const { getByText } = render(
    <Button label={label} disabled={true} onClick={clickHandler} />,
  );

  fireEvent.click(getByText(label));
  expect(clickHandler).toHaveBeenCalledTimes(0);
});
