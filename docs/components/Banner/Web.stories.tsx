import React, { useEffect, useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Banner } from "@jobber/components/Banner";
import { Button } from "@jobber/components/Button";
import { Text } from "@jobber/components/Text";
import { Content } from "@jobber/components/Content";
import { Banner as Banner1 } from "@jobber/components/Banner/Banner1";
import { useAtlantisTheme } from "@jobber/components/AtlantisThemeContext";

export default {
  title: "Components/Status and Feedback/Banner/Web",
  component: Banner,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Banner>;

const BasicTemplate: ComponentStory<typeof Banner> = () => {
  // const [counter, setCount] = useState(1);

  return (
    <Content>
      <Banner type="success">Your account was upgraded successfully</Banner>
      <Banner type="notice">
        Jobber will be performing scheduled maintenance on Feb. 21
      </Banner>
      <Banner
        type="warning"
        controlledVisiblity={true}
        primaryAction={{
          label: "View Plans",
          onClick: () => alert("Plans"),
        }}
        onDismiss={() => alert("Dismissed")}
      >
        Changes to this visit will not be applied to future visits
      </Banner>
      <Banner type="error">
        Payment could not be processed because of a network error
      </Banner>
    </Content>
  );
};

const ActionsTemplate: ComponentStory<typeof Banner> = args => (
  <>
    <Banner
      type="notice"
      primaryAction={{
        label: "View Plans",
        onClick: () => alert("Plans"),
      }}
      dismissible={false}
    >
      Your trial has been extended!
    </Banner>
    <Banner
      {...args}
      primaryAction={{
        label: "Refresh",
        onClick: () => alert("Refreshing"),
      }}
      icon="offline"
    >
      Network is unavailable. Please check your internet connection.
    </Banner>
  </>
);

const SuccessTemplate: ComponentStory<typeof Banner> = args => (
  <Banner
    primaryAction={{
      label: "View clients",
      onClick: () => alert("🎉 Woo hoo"),
    }}
    {...args}
  >
    Your client import is complete
  </Banner>
);

const ControlledTemplate: ComponentStory<typeof Banner> = args => {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <>
      <div>
        <Banner
          {...args}
          onDismiss={() => setShowBanner(_val => !_val)}
          controlledVisiblity={showBanner}
        >
          Your import is in progress
        </Banner>
      </div>
      <Button
        onClick={() => setShowBanner(_val => !_val)}
        label="Toggle Banner"
      ></Button>
    </>
  );
};

const ComposedTemplate: ComponentStory<typeof Banner> = () => {
  const { tokens } = useAtlantisTheme();

  return (
    <Content>
      <Banner1.Provider type="success">
        <Banner1.ContentWrapper>
          <Banner1.Icon />
          <Banner1.Content>
            <Text>Default banner style</Text>
          </Banner1.Content>
        </Banner1.ContentWrapper>
        <Banner1.DismissButton onDismiss={() => alert("Dismissed")} />
      </Banner1.Provider>

      <Banner1.Provider type="notice">
        <Banner1.ContentWrapper>
          <Banner1.Icon
            name="job"
            color="blue"
            backgroundColor="base-purple--400"
          />
          <Banner1.Content>
            <Text>With Banner1.Content</Text>
            <Text>
              Custom icon and color, override dismiss button onClick lasdjfalk
              sflasjdfkajsflkasflkajsdfkasjdfsdf sdasj kasdjkasd sda sd sadk
              sadkj asdfskld asdkjfaskjfskd asd ksdjfkasjfksdalj akslskdf asdfks
              jadklfd ksadf asdkjfaskjfskd asd ksdjfkasjfksdalj akslskdf asdfks
              jadklfd ksadf lasdjfalk sflasjdfkajsflkasflkajsdfkasjdfsdf sdasj
              kasdjkasd sda sd sadk sadkj asdfskld asdkjfaskjfskd asd
              ksdjfkasjfksdalj akslskdf asdfks jadklfd ksadf asdkjfaskjfskd asd
              ksdjfkasjfksdalj akslskdf asdfks jadklfd ksadf
            </Text>
            <a href="https://www.google.com">Google</a>
          </Banner1.Content>
          <Banner1.Action
            label="More info"
            onClick={() => alert("More info...")}
          />
        </Banner1.ContentWrapper>
        <Banner1.DismissButton onClick={() => alert("Run custom behaviour")} />
      </Banner1.Provider>

      <Banner1.Provider type="notice">
        <Banner1.ContentWrapper>
          <Banner1.Icon
            name="sparkles"
            customColor={tokens["color-base-purple--700"]}
            backgroundColor="base-purple--400"
          />
          <Banner1.Content>
            <Text>Without Banner1.Content</Text>
            <Text>
              Custom icon and color, override dismiss button onClick lasdjfalk
              sflasjdfkajsflkasflkajsdfkasjdfsdf sdasj kasdjkasd sda sd sadk
              sadkj asdfskld asdkjfaskjfskd asd ksdjfkasjfksdalj akslskdf asdfks
              jadklfd ksadf asdkjfaskjfskd asd ksdjfkasjfksdalj akslskdf asdfks
              jadklfd ksadf lasdjfalk sflasjdfkajsflkasflkajsdfkasjdfsdf sdasj
              kasdjkasd sda sd sadk sadkj asdfskld asdkjfaskjfskd asd
              ksdjfkasjfksdalj akslskdf asdfks jadklfd ksadf asdkjfaskjfskd asd
              ksdjfkasjfksdalj akslskdf asdfks jadklfd ksadf
            </Text>
            <a href="https://www.google.com">Google</a>
          </Banner1.Content>
        </Banner1.ContentWrapper>
        <Banner1.DismissButton onClick={() => alert("Run custom behaviour")} />
      </Banner1.Provider>

      <Banner1.Provider type="warning">
        <Banner1.ContentWrapper>
          <Banner1.Icon />
          <Banner1.Content>
            <Text>With Banner1.Content</Text>
            <Text>
              Action button lasdjfalk sflasjdfkajsflkasflkajsdfkasjdfsdf sdasj
              kasdjkasd sda sd sadk sadkj asdfskld asdkjfaskjfskd asd
              ksdjfkasjfksdalj akslskdf asdfks jadklfd ksadf asdkjfaskjfskd asd
              ksdjfkasjfksdalj akslskdf asdfks jadklfd ksadf lasdjfalk
              sflasjdfkajsflkasflkajsdfkasjdfsdf sdasj kasdjkasd sda sd sadk
              sadkj asdfskld asdkjfaskjfskd asd ksdjfkasjfksdalj akslskdf asdfks
              jadklfd ksadf asdkjfaskjfskd asd ksdjfkasjfksdalj akslskdf asdfks
              jadklfd ksadf
            </Text>
            <a href="https://www.google.com">Google</a>
          </Banner1.Content>
          <Banner1.Action
            label="More info"
            onClick={() => alert("More info...")}
          />
        </Banner1.ContentWrapper>
        <Banner1.DismissButton onDismiss={() => alert("Dismissed")} />
      </Banner1.Provider>

      <Banner1.Provider type="warning">
        <Banner1.ContentWrapper>
          <Banner1.Icon />
          <Banner1.Content>
            <Text>Without Banner1.Content</Text>
            <Text>
              Action button lasdjfalk sflasjdfkajsflkasflkajsdfkasjdfsdf sdasj
              kasdjkasd sda sd sadk sadkj asdfskld asdkjfaskjfskd asd
              ksdjfkasjfksdalj akslskdf asdfks jadklfd ksadf asdkjfaskjfskd asd
              ksdjfkasjfksdalj akslskdf asdfks jadklfd ksadf lasdjfalk
              sflasjdfkajsflkasflkajsdfkasjdfsdf sdasj kasdjkasd sda sd sadk
              sadkj asdfskld asdkjfaskjfskd asd ksdjfkasjfksdalj akslskdf asdfks
              jadklfd ksadf asdkjfaskjfskd asd ksdjfkasjfksdalj akslskdf asdfks
              jadklfd ksadf
            </Text>
            <a href="https://www.google.com">Google</a>
          </Banner1.Content>
          <Banner1.Action
            label="More info"
            onClick={() => alert("More info...")}
          />
        </Banner1.ContentWrapper>
        <Banner1.DismissButton onDismiss={() => alert("Dismissed")} />
      </Banner1.Provider>

      <Banner1.Provider type="error">
        <Banner1.ContentWrapper>
          <Banner1.Icon />
          <Banner1.Content>
            <Text>With Banner1.Content</Text>
            <Text>
              Custom button lasdjfalk sflasjdfkajsflkasflkajsdfkasjdfsdf sdasj
              kasdjkasd sda sd sadk sadkj asdfskld asdkjfaskjfskd asd
              ksdjfkasjfksdalj akslskdf asdfks jadklfd ksadf asdkjfaskjfskd asd
              ksdjfkasjfksdalj akslskdf asdfks jadklfd ksadf lasdjfalk
              sflasjdfkajsflkasflkajsdfkasjdfsdf sdasj kasdjkasd sda sd sadk
              sadkj asdfskld asdkjfaskjfskd asd ksdjfkasjfksdalj akslskdf asdfks
              jadklfd ksadf asdkjfaskjfskd asd ksdjfkasjfksdalj akslskdf asdfks
              jadklfd ksadf
            </Text>
            <a href="https://www.google.com">Google</a>
          </Banner1.Content>
          <Button onClick={() => alert("Custom button...")}>
            <Button.Label>Custom button</Button.Label>
          </Button>
        </Banner1.ContentWrapper>
        <Banner1.DismissButton onDismiss={() => alert("Dismissed")} />
      </Banner1.Provider>

      <Banner1.Provider type="error">
        <Banner1.ContentWrapper>
          <Banner1.Icon />
          <Banner1.Content>
            <Text>Without Banner1.Content</Text>
            <Text>
              Custom button lasdjfalk sflasjdfkajsflkasflkajsdfkasjdfsdf sdasj
              kasdjkasd sda sd sadk sadkj asdfskld asdkjfaskjfskd asd
              ksdjfkasjfksdalj akslskdf asdfks jadklfd ksadf asdkjfaskjfskd asd
              ksdjfkasjfksdalj akslskdf asdfks jadklfd ksadf lasdjfalk
              sflasjdfkajsflkasflkajsdfkasjdfsdf sdasj kasdjkasd sda sd sadk
              sadkj asdfskld asdkjfaskjfskd asd ksdjfkasjfksdalj akslskdf asdfks
              jadklfd ksadf asdkjfaskjfskd asd ksdjfkasjfksdalj akslskdf asdfks
              jadklfd ksadf
            </Text>
            <a href="https://www.google.com">Google</a>
          </Banner1.Content>
          <Button onClick={() => alert("Custom button...")}>
            <Button.Label>Custom button</Button.Label>
          </Button>
        </Banner1.ContentWrapper>
        <Banner1.DismissButton onDismiss={() => alert("Dismissed")} />
      </Banner1.Provider>
    </Content>
  );
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  type: "notice",
};

export const ActionsInBanners = ActionsTemplate.bind({});
ActionsInBanners.args = {
  type: "error",
};

export const Success = SuccessTemplate.bind({});
Success.args = {
  type: "success",
  dismissible: false,
};

export const Controlled = ControlledTemplate.bind({});
Controlled.args = {
  type: "notice",
};

export const Composed = ComposedTemplate.bind({});
Composed.args = {
  type: "notice",
};
