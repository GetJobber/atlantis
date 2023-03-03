import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { FeatureSwitch } from ".";

afterEach(cleanup);

it("renders a full FeatureSwitch", () => {
  const { container } = render(
    <FeatureSwitch
      enabled={true}
      title="Quote follow-up"
      externalLink={true}
      description="Send a [notification](www.fakeurl.com) to your _client_ following up on an **outstanding quote**."
      hasSaveIndicator={true}
      onSwitch={() => {
        console.log("You clicked the switch");
      }}
      onEdit={() => {
        console.log("You clicked edit");
      }}
    >
      Dis dem content yo
    </FeatureSwitch>,
  );
  expect(container).toMatchSnapshot();
});

it("renders a subdued FeatureSwitch content", () => {
  const { container } = render(
    <FeatureSwitch
      enabled={false}
      description="Send a notification to your client following up on an outstanding quote."
    >
      Dis dem content yo
    </FeatureSwitch>,
  );
  expect(container).toMatchSnapshot();
});

test("it should not show description if absent", () => {
  const { container } = render(
    <FeatureSwitch enabled={false}>Dis dem content yo</FeatureSwitch>,
  );
  expect(container).toMatchSnapshot();
});

test("it should not show switch if onSwitch is absent", () => {
  const { container } = render(
    <FeatureSwitch
      enabled={false}
      description="Send a notification to your client following up on an outstanding quote."
    >
      Dis dem content yo
    </FeatureSwitch>,
  );
  expect(container).toMatchSnapshot();
});

test("it should call the switch handler with the new value", () => {
  const switchHandler = jest.fn();
  const content = "Send a thing?";
  const newValue = true;
  const { getByLabelText } = render(
    <FeatureSwitch onSwitch={switchHandler} description={content} />,
  );
  fireEvent.click(getByLabelText(content));
  expect(switchHandler).toHaveBeenCalledWith(newValue);
});

test("it should call the edit handler", () => {
  const editHandler = jest.fn();
  const content = "Send a thing?";
  const { getByText } = render(
    <FeatureSwitch onEdit={editHandler} description={content} />,
  );
  fireEvent.click(getByText("Edit"));
  expect(editHandler).toHaveBeenCalledTimes(1);
});
