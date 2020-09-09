import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { InputPassword } from ".";

afterEach(cleanup);

it("renders an input type number", () => {
  const tree = renderer.create(<InputPassword value="123" />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="wrapper"
      style={
        Object {
          "--formField-maxLength": undefined,
        }
      }
    >
      <label
        className="label"
        htmlFor="123e4567-e89b-12d3-a456-426655440001"
      >
         
      </label>
      <input
        className="formField"
        id="123e4567-e89b-12d3-a456-426655440001"
        onBlur={[Function]}
        onChange={[Function]}
        onFocus={[Function]}
        onKeyDown={[Function]}
        type="password"
        value="123"
      />
      <pre
        style={
          Object {
            "fontSize": "13px",
          }
        }
      >
        isDirty: 
        no
        ,
        <br />
        dirtyFields: 
        {}
        ,
        <br />
        isSubmitted: 
        no
        ,
        <br />
        submitCount: 
        no
        ,
        <br />
        touched: 
        yes
        ,
        <br />
        isSubmitting: 
        no
        ,
        <br />
        isValid: 
        yes
        ,
        <br />
      </pre>
    </div>
  `);
});

it("renders an error", () => {
  const tree = renderer
    .create(<InputPassword value="p" errorMessage="Not long enough" />)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    Array [
      <p
        className="base regular base red"
      >
        Not long enough
      </p>,
      <div
        className="wrapper invalid"
        style={
          Object {
            "--formField-maxLength": undefined,
          }
        }
      >
        <label
          className="label"
          htmlFor="123e4567-e89b-12d3-a456-426655440002"
        >
           
        </label>
        <input
          className="formField"
          id="123e4567-e89b-12d3-a456-426655440002"
          onBlur={[Function]}
          onChange={[Function]}
          onFocus={[Function]}
          onKeyDown={[Function]}
          type="password"
          value="p"
        />
        <pre
          style={
            Object {
              "fontSize": "13px",
            }
          }
        >
          isDirty: 
          no
          ,
          <br />
          dirtyFields: 
          {}
          ,
          <br />
          isSubmitted: 
          no
          ,
          <br />
          submitCount: 
          no
          ,
          <br />
          touched: 
          yes
          ,
          <br />
          isSubmitting: 
          no
          ,
          <br />
          isValid: 
          yes
          ,
          <br />
        </pre>
      </div>,
    ]
  `);
});

test("it should call the handler with a value", () => {
  const changeHandler = jest.fn();
  const newValue = "password";
  const placeholder = "Count";

  const { getByLabelText } = render(
    <InputPassword
      onChange={changeHandler}
      placeholder={placeholder}
      name={placeholder}
    />,
  );

  fireEvent.change(getByLabelText(placeholder), {
    target: { value: newValue },
  });
  expect(changeHandler).toHaveBeenCalledWith(newValue);
});
