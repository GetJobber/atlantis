import React from "react";
import renderer from "react-test-renderer";
import { Page } from ".";

it("renders a Page", () => {
  const tree = renderer
    .create(
      <Page
        title="Notifications"
        intro="Improve job completion rates, stop chasing payments, and boost your customer service by automatically communicating with your clients at key points before, during, and after a job. Read more about Notifications by visiting our [Help Center](https://help.getjobber.com/hc/en-us/articles/115009737128)."
      >
        Sup
      </Page>,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="page standard"
    >
      <div
        className="padded base"
      >
        <div
          className="padded large"
        >
          <div
            className="titleBar"
          >
            <h1
              className="base black jumbo uppercase blue"
            >
              Notifications
            </h1>
          </div>
          <p
            className="base regular larger greyBlueDark"
          >
            Improve job completion rates, stop chasing payments, and boost your customer service by automatically communicating with your clients at key points before, during, and after a job. Read more about Notifications by visiting our 
            <a
              href="https://help.getjobber.com/hc/en-us/articles/115009737128"
            >
              Help Center
            </a>
            .
          </p>
        </div>
        <div
          className="padded base"
        >
          Sup
        </div>
      </div>
    </div>
  `);
});
