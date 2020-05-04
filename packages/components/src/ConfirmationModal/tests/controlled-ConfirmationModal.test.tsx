import React, { ReactPortal, RefObject, useRef } from "react";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import { ConfirmationModal, ConfirmationModalRef } from "..";
import { Button } from "../../Button";

beforeEach(() => {
  ReactDOM.createPortal = jest.fn(element => {
    return element as ReactPortal;
  });
});

afterEach(() => {
  (ReactDOM.createPortal as jest.Mock).mockClear();
});

it("renders a Controlled ConfirmationModal", () => {
  const tree = renderer.create(<ControlledConfirm />).toJSON();
  expect(tree).toMatchSnapshot();

  function ControlledConfirm() {
    const confirmationModalRef = useRef() as RefObject<ConfirmationModalRef>;
    const users = [
      {
        id: 1,
        name: "Bob",
      },
      {
        id: 2,
        name: "Donald",
      },
    ];

    return (
      <>
        {users.map(user => {
          return (
            <Button
              key={user.id}
              label={`Confirm ${user.name}`}
              onClick={() => jest.fn()}
            />
          );
        })}
        <ConfirmationModal ref={confirmationModalRef} />
      </>
    );
  }
});
