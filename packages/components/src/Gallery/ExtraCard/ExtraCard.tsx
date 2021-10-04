import React from "react";
import classnames from "classnames";
import { Icon, IconNames } from "../../Icon";
import { Content } from "../../Content";
import { Text } from "../../Text";
import { Card } from "../../Card";

interface ExtraCardProps {
  number: number;
}

export function ExtraCard({ number }: ExtraCardProps) {
  return (
    <Card
      onClick={() => {
        console.log("Do something");
      }}
    >
      <div
        style={{
          width: "56px",
          height: "56px",
        }}
      >
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ maxHeight: "fit-content" }}>
            <Text>+{number}</Text>
          </div>
        </div>
      </div>
    </Card>
  );
}
