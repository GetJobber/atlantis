import React from "react";
import { Story as Context } from "@storybook/api";
import { Text } from "@jobber/components/Text";
import { Emphasis } from "@jobber/components/Emphasis";
import styles from "./StoryDetails.css";

interface StoryDetailsProps {
  readonly Story: any;
  readonly context: Context;
}

export function StoryDetails({ Story, context }: StoryDetailsProps) {

  return (
    <div className={styles.container}>
      <div className={styles.story}>
        <Story />
      </div>

      {context.parameters?.showNativeOnWebDisclaimer && (
        <div className={styles.notice}>
          <Text size="small">
            <Emphasis variation="italic">
              Due to distinctions between web and native platform, this does not
              render accurately in a web browser.
            </Emphasis>
          </Text>
        </div>
      )}
    </div>
  );
}
