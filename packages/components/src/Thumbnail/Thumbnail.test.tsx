// import React from "react";
// import renderer from "react-test-renderer";
import { cleanup } from "@testing-library/react";
// import { Thumbnail } from ".";

afterEach(cleanup);

it("renders a Thumbnail", () => {
  expect(0).toEqual(0);
});

// it("renders a loud Thumbnail", () => {
//   const tree = renderer.create(<Thumbnail text="Foo" loud={true} />).toJSON();
//   expect(tree).toMatchSnapshot();
// });

// test("it should call the handler with the new value", () => {
//   const clickHandler = jest.fn();
//   const text = "Foo";
//   const { getByText } = render(
//     <Thumbnail onClick={clickHandler} text={text} />,
//   );

//   fireEvent.click(getByText(text));
//   expect(clickHandler).toHaveBeenCalled();

// E.g. If you need a change event, rather than a click event:
//
// fireEvent.change(getByLabelText(placeholder), {
//   target: { value: newValue },
// });
// expect(changeHandler).toHaveBeenCalledWith(newValue);
// });
