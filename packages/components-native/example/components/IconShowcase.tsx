import React from "react";
import { Content, Flex, Heading, Icon } from "@jobber/components-native";
import { View } from "react-native";

export function IconShowcase() {
  return (
    <>
      <View style={{ marginVertical: 20, paddingHorizontal: 24 }}>
        <Heading>Icon Variations</Heading>
      </View>
      <Flex template={["grow", "grow"]}>
        <Content direction="horizontal">
          <Icon name="add" />
          <Icon name="addNote" />
          <Icon name="address" />
          <Icon name="alert" />
          <Icon name="angieslist" />
          <Icon name="apple" />
        </Content>
      </Flex>
    </>
  );
}
