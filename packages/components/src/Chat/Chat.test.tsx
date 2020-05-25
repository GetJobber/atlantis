import React from "react";
import renderer from "react-test-renderer";
import { cleanup } from "@testing-library/react";
import { Chat, ChatBubble } from ".";

afterEach(cleanup);

it("renders a Chat", () => {
  const tree = renderer
    .create(
      <Chat sendReplyHandler={() => alert("TODO: Implement onClick")}>
        <ChatBubble direction={"outbound"} message={"Hello bob!"} />
        <ChatBubble
          direction={"inbound"}
          message={"Oh hello jill! How are you?"}
        />
      </Chat>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
