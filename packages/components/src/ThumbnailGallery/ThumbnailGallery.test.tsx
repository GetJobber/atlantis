import React from "react";
import renderer from "react-test-renderer";
import { cleanup } from "@testing-library/react";
import { ThumbnailGallery } from ".";

afterEach(cleanup);

it("renders a ThumbnailGallery", () => {
  const tree = renderer
    .create(
      <ThumbnailGallery
        attachments={[
          {
            name: "puppy1",
            type: "image/jpeg",
            size: 12345,
            url:
              "https://p7.hiclipart.com/preview/318/270/427/shar-pei-puppy-boxer-french-bulldog-puppy-thumbnail.jpg",
          },
        ]}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
