import { isAlreadyUpdated } from "./useCollectionQuery";

const existingNode = {
  id: "123",
  __typename: "Conversation",
};

const newNode = {
  id: "124",
  __typename: "Conversation",
};

const collection = {
  conversations: {
    totalCount: 2,
    edges: [
      {
        node: existingNode,
        cursor: "MQ",
      },
    ],
    pageInfo: {
      endCursor: "MM",
      startCursor: "MQ",
      hasNextPage: true,
    },
  },
};

describe("#isAlreadyUpdated", () => {
  describe("when hook receives update from item not in collection", () => {
    it("it should add new item to collection", async () => {
      const result = isAlreadyUpdated(collection.conversations, existingNode);
      expect(result).toBeTruthy();
    });
  });

  describe("when hook receives update from item already in collection", () => {
    it("it should return the existing collection", async () => {
      const result = isAlreadyUpdated(collection.conversations, newNode);
      expect(result).toBeFalsy();
    });
  });
});
