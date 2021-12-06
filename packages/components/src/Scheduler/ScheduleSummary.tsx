import React from "react";
import classNames from "classnames";
import styles from "./ScheduleSummary.css";
import { Heading } from "../Heading";
import { DescriptionList } from "../DescriptionList";
import { Text } from "../Text";

export const ScheduleSummary = (props: {
  disabled: boolean;
  startDate: string;
  endDate: string;
  totalOccurences: number;
  summaryString: string;
}) => {
  const containerClass = classNames(
    styles.summaryContainer,
    props.disabled ? styles.disabled : "",
  );

  return (
    <>
      <div className={containerClass}>
        <Heading level={5}>Summary</Heading>
        <Text>{props.summaryString}</Text>
        <DescriptionList
          data={[
            ["First", `${props.startDate}`],
            ["Last", `${props.endDate}`],
            ["Total visits", `${props.totalOccurences}`],
          ]}
        />
      </div>
    </>
  );
};
