import React, { useState } from "react";
import copy from "copy-text-to-clipboard";
import { Card } from "@jobber/components/Card";
import { Content } from "@jobber/components/Content";
import { Text } from "@jobber/components/Text";
import { Option, Select } from "@jobber/components/Select";
import { InputText } from "@jobber/components/InputText";
import { Heading } from "@jobber/components/Heading";
import { Banner } from "@jobber/components/Banner";
import { Divider } from "@jobber/components/Divider";
import { showToast } from "@jobber/components/Toast";

export function PullRequestGenerator() {
  const [type, setType] = useState("fix");
  const [scope, setScope] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [issue, setIssue] = useState<string>();

  // eslint-disable-next-line prettier/prettier
  const title = `${type}${scope ? `(${scope})` : ``}: ${description ? description : ``} ${issue ? `[${issue}]` : ``}`;

  return (
    <Content>
      <Card title="Tell us about your pull request">
        <Content spacing="large">
          <Content spacing="small">
            <Text>I want to...</Text>
            <Select value={type} onChange={(val: string) => setType(val)}>
              <Option value="fix">fix something that&apos;s broken</Option>
              <Option value="feat">add some new functionality</Option>
              <Option value="docs">write documentation</Option>
              <Option value="build">improve the build system</Option>
              <Option value="chore">do something else important</Option>
            </Select>
            <Text>in our...</Text>
            <Select value={type} onChange={(val: string) => setScope(val)}>
              <Option value="---">---</Option>
              <Option value="components">component library</Option>
              <Option value="hooks">hooks library</Option>
              <Option value="design">design foundation system</Option>
              <Option value="docz-tools">internal docz tools</Option>
              <Option value="eslint-config">eslint config</Option>
              <Option value="stylelint-config">stylelint config</Option>
            </Select>
          </Content>
          <Divider />
          <Content>
            <InputText
              placeholder="Description"
              multiline
              rows={2}
              onChange={(val: string) => setDescription(val)}
            />
            <InputText
              placeholder="Issue ID"
              onChange={(val: string) => setIssue(val)}
            />
          </Content>
        </Content>
      </Card>
      <Heading level={2}>Your Pull Request Title:</Heading>
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
