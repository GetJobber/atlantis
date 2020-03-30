import React from "react";
import renderer from "react-test-renderer";
import { cleanup } from "@testing-library/react";
import { CivilDate } from "@std-proposal/temporal";
import { FormatDate } from "./FormatDate";

afterEach(cleanup);

it("renders a FormatDate", () => {
  const tree = renderer
    .create(<FormatDate date={new CivilDate(2020, 2, 26)} />)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`"Feb 26, 2020"`);
});
