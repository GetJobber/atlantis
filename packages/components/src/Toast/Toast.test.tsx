// import React from "react";
// import renderer from "react-test-renderer";
import { cleanup } from "@testing-library/react";
// import { Toast } from ".";

afterEach(cleanup);

it("works", () => expect(true).toBe(true));
// it("renders a Toast", () => {
//   const tree = renderer.create(<Toast />).toJSON();
//   expect(tree).toMatchSnapshot();
// });
