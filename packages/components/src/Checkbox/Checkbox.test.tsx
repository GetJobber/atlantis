import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Checkbox } from ".";
import { Text } from "../Text";

afterEach(cleanup);

it("renders a Checkbox", () => {
  const tree = renderer
    .create(<Checkbox label="Send me spam?" name="send_me_span" value="spam" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a disabled Checkbox", () => {
  const tree = renderer
    .create(<Checkbox label="Dont click me" disabled={true} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a checkbox with an empty element", () => {
  const tree = renderer
    .create(
      <Checkbox>
        <></>
      </Checkbox>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a checkbox with children", () => {
  const childContent = <Text>Content</Text>;
  const tree = renderer.create(<Checkbox>{childContent}</Checkbox>).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders each variation of checked, defaultChecked and indeterminate", () => {
  const variations = [
    { checked: true, indeterminate: true },
    { checked: false, indeterminate: true },
    { checked: true, indeterminate: false },
    { checked: false, indeterminate: false },

    { defaultChecked: true, indeterminate: true },
    { defaultChecked: false, indeterminate: true },
    { defaultChecked: true, indeterminate: false },
    { defaultChecked: false, indeterminate: false },
  ];

  variations.forEach(variation => {
    expect(
      renderer.create(<Checkbox label="Foo" {...variation} />).toJSON(),
    ).toMatchSnapshot();
  });
});

it("renders a description when set", () => {
  const { getByText } = render(<Checkbox description="Checkers" />);
  const description = getByText("Checkers");
  expect(description).toBeInstanceOf(HTMLParagraphElement);
});

it("should still fire the onClick within the children", () => {
  const handleLinkClick = jest.fn();
  const { getByText } = render(
    <Checkbox description="Checkers">
      <Text>
        I agree to the
        <a onClick={handleLinkClick}>Terms of Service</a>
      </Text>
    </Checkbox>,
  );
  const TOSAnchorElement = getByText("Terms of Service");
  expect(TOSAnchorElement).toBeInTheDocument();
  fireEvent.click(TOSAnchorElement);
  expect(handleLinkClick).toHaveBeenCalled();
});

describe("Clicking the checkbox it should call the handler", () => {
  test("with a true value", () => {
    const clickHandler = jest.fn();

    const { getByLabelText } = render(
      <Checkbox checked={false} onChange={clickHandler} label="foo" />,
    );

    fireEvent.click(getByLabelText("foo"));
    expect(clickHandler).toHaveBeenCalledWith(true);
  });

  test("with a false value", () => {
    const clickHandler = jest.fn();

    const { getByLabelText } = render(
      <Checkbox checked={true} onChange={clickHandler} label="foo" />,
    );

    fireEvent.click(getByLabelText("foo"));
    expect(clickHandler).toHaveBeenCalledWith(false);
  });
});
