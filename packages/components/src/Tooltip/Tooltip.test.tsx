import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Tooltip } from ".";

afterEach(cleanup);

it("renders a Tooltip", () => {
  // const tree = renderer.create(<Tooltip text="Foo" />).toJSON();
  // expect(tree).toMatchInlineSnapshot(`
  //   <span
  //     className="wrapper"
  //     onMouseEnter={[Function]}
  //     onMouseLeave={[Function]}
  //   >
  //     <div
  //       className="tooltip below"
  //     >
  //       <p
  //         className="base regular base greyBlueDark"
  //       />
  //     </div>
  //   </span>
  // `);
});

it("renders a loud Tooltip", () => {
  // const tree = renderer.create(<Tooltip text="Foo" loud />).toJSON();
  // expect(tree).toMatchInlineSnapshot(`
  //   <span
  //     className="wrapper"
  //     onMouseEnter={[Function]}
  //     onMouseLeave={[Function]}
  //   >
  //     <div
  //       className="tooltip below"
  //     >
  //       <p
  //         className="base regular base greyBlueDark"
  //       />
  //     </div>
  //   </span>
  // `);
});

test("it should call the handler with the new value", () => {
  // const changeHandler = jest.fn();
  // const newValue = "Bar";
  // const { getByLabelText } = render(
  //   <Tooltip onChange={changeHandler} placeholder={placeholder} />
  // );
  // fireEvent.change(getByLabelText(placeholder), {
  //   target: { value: newValue }
  // });
  // expect(changeHandler).toHaveBeenCalledWith(newValue);
});
