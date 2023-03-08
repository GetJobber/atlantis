import React, { useState } from "react";
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
            <Text>I want to make a change that...</Text>
            <Select value={type} onChange={(val: string) => setType(val)}>
              <Option value="fix">fixes a bug</Option>
              <Option value="feat">adds a new feature</Option>
              <Option value="docs">adds or updates documentation only</Option>
              <Option value="build">improves the build system</Option>
              <Option value="chore">doesn't modify src or test files</Option>
              <Option value="refactor">doesn't fix a bug or introduce a new feature</Option>
            </Select>
            <Text>in our...</Text>
            <Select value={type} onChange={(val: string) => setScope(val)}>
              <Option value="---">---</Option>
              <Option value="components">component library</Option>
              <Option value="hooks">hooks library</Option>
              <Option value="design">design foundation system</Option>
              <Option value="eslint-config">eslint config</Option>
              <Option value="stylelint-config">stylelint config</Option>
              <Option value="generators">generators</Option>
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
      <Heading level={2}>Your pull request title:</Heading>
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
    navigator.clipboard.writeText(title);
    showToast({
      message: "Copied PR title to clipboard",
    });
  }
}
