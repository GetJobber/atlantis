import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Banner } from ".";

afterEach(cleanup);

it("renders a success banner", () => {
  const tree = renderer
    .create(<Banner type="success">Success</Banner>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="flash success"
    >
      <p
        className="base regular base greyBlueDark"
      >
        Success
      </p>
      <button
        aria-label="Close"
        className="closeButton"
        onClick={[Function]}
      >
        <svg
          className="icon base"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="green"
            d="M512 451.669l-225.835-225.835c-8.047-7.772-18.825-12.073-30.012-11.976s-21.888 4.585-29.799 12.495c-7.911 7.911-12.398 18.612-12.495 29.799s4.204 21.964 11.976 30.012l225.835 225.835-225.835 225.835c-7.772 8.047-12.073 18.825-11.976 30.012s4.585 21.888 12.495 29.798c7.91 7.91 18.612 12.399 29.799 12.497s21.965-4.203 30.012-11.977l225.835-225.835 225.835 225.835c8.047 7.774 18.825 12.075 30.012 11.977s21.888-4.587 29.798-12.497c7.91-7.91 12.399-18.611 12.497-29.798 0.094-11.187-4.203-21.965-11.977-30.012l-225.835-225.835 225.835-225.835c4.075-3.936 7.326-8.644 9.562-13.85s3.413-10.804 3.46-16.469c0.051-5.665-1.028-11.284-3.174-16.527s-5.312-10.007-9.318-14.013c-4.006-4.006-8.772-7.174-14.016-9.319-5.239-2.146-10.859-3.225-16.525-3.176s-11.264 1.226-16.469 3.462c-5.205 2.236-9.916 5.487-13.85 9.562l-225.835 225.835z"
          />
        </svg>
      </button>
    </div>
  `);
});

it("renders an error banner", () => {
  const tree = renderer.create(<Banner type="error">Fail</Banner>).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="flash error"
    >
      <p
        className="base regular base greyBlueDark"
      >
        Fail
      </p>
      <button
        aria-label="Close"
        className="closeButton"
        onClick={[Function]}
      >
        <svg
          className="icon base"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="red"
            d="M512 451.669l-225.835-225.835c-8.047-7.772-18.825-12.073-30.012-11.976s-21.888 4.585-29.799 12.495c-7.911 7.911-12.398 18.612-12.495 29.799s4.204 21.964 11.976 30.012l225.835 225.835-225.835 225.835c-7.772 8.047-12.073 18.825-11.976 30.012s4.585 21.888 12.495 29.798c7.91 7.91 18.612 12.399 29.799 12.497s21.965-4.203 30.012-11.977l225.835-225.835 225.835 225.835c8.047 7.774 18.825 12.075 30.012 11.977s21.888-4.587 29.798-12.497c7.91-7.91 12.399-18.611 12.497-29.798 0.094-11.187-4.203-21.965-11.977-30.012l-225.835-225.835 225.835-225.835c4.075-3.936 7.326-8.644 9.562-13.85s3.413-10.804 3.46-16.469c0.051-5.665-1.028-11.284-3.174-16.527s-5.312-10.007-9.318-14.013c-4.006-4.006-8.772-7.174-14.016-9.319-5.239-2.146-10.859-3.225-16.525-3.176s-11.264 1.226-16.469 3.462c-5.205 2.236-9.916 5.487-13.85 9.562l-225.835 225.835z"
          />
        </svg>
      </button>
    </div>
  `);
});

it("renders a notice banner", () => {
  const tree = renderer
    .create(<Banner type="notice">Notice me</Banner>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="flash notice"
    >
      <p
        className="base regular base greyBlueDark"
      >
        Notice me
      </p>
      <button
        aria-label="Close"
        className="closeButton"
        onClick={[Function]}
      >
        <svg
          className="icon base"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="lightBlue"
            d="M512 451.669l-225.835-225.835c-8.047-7.772-18.825-12.073-30.012-11.976s-21.888 4.585-29.799 12.495c-7.911 7.911-12.398 18.612-12.495 29.799s4.204 21.964 11.976 30.012l225.835 225.835-225.835 225.835c-7.772 8.047-12.073 18.825-11.976 30.012s4.585 21.888 12.495 29.798c7.91 7.91 18.612 12.399 29.799 12.497s21.965-4.203 30.012-11.977l225.835-225.835 225.835 225.835c8.047 7.774 18.825 12.075 30.012 11.977s21.888-4.587 29.798-12.497c7.91-7.91 12.399-18.611 12.497-29.798 0.094-11.187-4.203-21.965-11.977-30.012l-225.835-225.835 225.835-225.835c4.075-3.936 7.326-8.644 9.562-13.85s3.413-10.804 3.46-16.469c0.051-5.665-1.028-11.284-3.174-16.527s-5.312-10.007-9.318-14.013c-4.006-4.006-8.772-7.174-14.016-9.319-5.239-2.146-10.859-3.225-16.525-3.176s-11.264 1.226-16.469 3.462c-5.205 2.236-9.916 5.487-13.85 9.562l-225.835 225.835z"
          />
        </svg>
      </button>
    </div>
  `);
});

it("renders a warning banner", () => {
  const tree = renderer.create(<Banner type="warning">Warn</Banner>).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="flash warning"
    >
      <p
        className="base regular base greyBlueDark"
      >
        Warn
      </p>
      <button
        aria-label="Close"
        className="closeButton"
        onClick={[Function]}
      >
        <svg
          className="icon base"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="yellow"
            d="M512 451.669l-225.835-225.835c-8.047-7.772-18.825-12.073-30.012-11.976s-21.888 4.585-29.799 12.495c-7.911 7.911-12.398 18.612-12.495 29.799s4.204 21.964 11.976 30.012l225.835 225.835-225.835 225.835c-7.772 8.047-12.073 18.825-11.976 30.012s4.585 21.888 12.495 29.798c7.91 7.91 18.612 12.399 29.799 12.497s21.965-4.203 30.012-11.977l225.835-225.835 225.835 225.835c8.047 7.774 18.825 12.075 30.012 11.977s21.888-4.587 29.798-12.497c7.91-7.91 12.399-18.611 12.497-29.798 0.094-11.187-4.203-21.965-11.977-30.012l-225.835-225.835 225.835-225.835c4.075-3.936 7.326-8.644 9.562-13.85s3.413-10.804 3.46-16.469c0.051-5.665-1.028-11.284-3.174-16.527s-5.312-10.007-9.318-14.013c-4.006-4.006-8.772-7.174-14.016-9.319-5.239-2.146-10.859-3.225-16.525-3.176s-11.264 1.226-16.469 3.462c-5.205 2.236-9.916 5.487-13.85 9.562l-225.835 225.835z"
          />
        </svg>
      </button>
    </div>
  `);
});

test("it should call the handler with a number value", () => {
  const changeHandler = jest.fn();

  const { getByLabelText } = render(
    <Banner type="success" onDismiss={changeHandler}>
      Close me
    </Banner>,
  );

  fireEvent.click(getByLabelText("Close"));
  expect(changeHandler).toHaveBeenCalledTimes(1);
});
