import React from "react";
import { Description } from "@storybook/addon-docs";
import { Tab, Tabs } from "@jobber/components/Tabs";
import { Card } from "@jobber/components/Card";
import styles from "./ImportCodeSnippet.css";

interface ImportCodeSnippetProps {
  readonly name: string;
  readonly type: "all" | "webOnly" | "mobileOnly";
}

export function ImportCodeSnippet({
  name,
  type = "all",
}: ImportCodeSnippetProps) {
  const webSnippet = (
    <Description
      markdown={`\`\`\`ts\n\rimport { ${name} } from "@jobber/components/${name}";\`\`\``}
    />
  );
  const mobileSnippet = (
    <Description
      markdown={`\`\`\`ts\n\rimport { ${name} } from "@jobber/components-native";\`\`\``}
    />
  );

  if (type === "webOnly") {
    return webSnippet;
  }

  if (type === "mobileOnly") {
    return mobileSnippet;
  }

  return (
    <div className={styles.importCodeSnippet}>
      <Card>
        <Tabs>
          <Tab label="Web">{webSnippet}</Tab>
          <Tab label="Mobile">{mobileSnippet}</Tab>
        </Tabs>
      </Card>
    </div>
  );
}
