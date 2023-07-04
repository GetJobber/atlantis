import React from "react";
import { ActionLabel, Content, Flex, Heading } from "@jobber/components-native";
import { View } from "react-native";

export function ActionLabelShowCase() {
  return (
    <>
      <View style={{ marginVertical: 20, paddingHorizontal: 24 }}>
        <Heading>ActionLabel Variations</Heading>
      </View>
      <Flex template={["grow", "grow"]}>
        <Content>
          <ActionLabel variation="interactive">Interactive</ActionLabel>
          <ActionLabel variation="subtle">Subtle</ActionLabel>
          <ActionLabel variation="destructive">Destructive</ActionLabel>
        </Content>
        <Content>
          <ActionLabel variation="learning">learning</ActionLabel>
          <ActionLabel variation="onPrimary">onPrimary</ActionLabel>
        </Content>
      </Flex>
    </>
  )
}
