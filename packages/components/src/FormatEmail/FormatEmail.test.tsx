import React from "react";
import renderer from "react-test-renderer";
import { cleanup } from "@testing-library/react";
import { FormatEmail } from ".";

afterEach(cleanup);
it("renders a FormatEmail", () => {
  const tree = renderer
    .create(<FormatEmail email="email@address.me" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

// it("renders a FormatEmail in an address tag", () => {
//   const tree = renderer
//     .create(<FormatEmail email="email@address.me" />)
//     .toJSON();
//   expect(tree.type).toBe("address");
// });
