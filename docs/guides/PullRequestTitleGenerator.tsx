import React, { useState } from "react";
import copy from "copy-text-to-clipboard";
import { Card } from "@jobber/components/Card";
import { Content } from "@jobber/components/Content";
import { Text } from "@jobber/components/Text";
import { Option, Select } from "@jobber/components/Select";
import { InputText } from "@jobber/components/InputText";
import { Heading } from "@jobber/components/Heading";
import { Banner } from "@jobber/components/Banner";
import { showToast } from "@jobber/components/Toast";

export function PullRequestTitleGenerator() {
  const [type, setType] = useState("fix");
  const [scope, setScope] = useState();
  const [description, setDescription] = useState();
  const [issue, setIssue] = useState();

  // eslint-disable-next-line prettier/prettier
  const title = `${type}${scope ? `(${scope})` : ``}: ${description ? description : ``} ${issue ? `[${issue}]` : ``}`;
  return (
    <Content>
      <Card title="Tell us about your PR">
        <Content spacing="large">
          <Text>
            I want to{" "}
            <Select inline value={type} onChange={val => setType(val)}>
              <Option value="fix">fix something that&apos;s broken</Option>
              <Option value="feat">add some new functionality</Option>
              <Option value="docs">write documentation</Option>
              <Option value="build">improve the build system</Option>
              <Option value="chore">do something else important</Option>
            </Select>{" "}
            in our{" "}
            <Select inline value={type} onChange={val => setScope(val)}>
              <Option value="components">component library</Option>
              <Option value="hooks">hooks library</Option>
              <Option value="design">design foundation system</Option>
              <Option value="docz-tools">internal docz tools</Option>
              <Option value="eslint-config">eslint config</Option>
              <Option value="stylelint-config">stylelint config</Option>
            </Select>
          </Text>
          <Heading level={5}>Description</Heading>
          <InputText multiline rows={2} onChange={val => setDescription(val)} />
          <Heading level={5}>Issue ID</Heading>
          <InputText onChange={val => setIssue(val)} />
        </Content>
      </Card>
      <Heading level={4}>Your Pull Request Title:</Heading>
      <Banner
        type="success"
        dismissible={false}
        primaryAction={{
          label: "Copy to clipboard",
          icon: "task",
          onClick: handleCopy,
        }}
      >
        {title}
      </Banner>
    </Content>
  );

  function handleCopy() {
    copy(title);
    showToast({
      message: "Copied PR title to clipboard",
    });
  }
}
