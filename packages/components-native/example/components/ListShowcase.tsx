import React from "react";
import { Content, Flex, Heading, TextList } from "@jobber/components-native";
import { View } from "react-native";

export function ListShowcase() {
  return (
    <>
      <View style={{ marginVertical: 20, paddingHorizontal: 24 }}>
        <Heading>List Variations</Heading>
      </View>
      <Flex template={["grow"]}>
        <Content>
          <TextList items={["Item uno", "Item dos", "Item tres"]} />
        </Content>
      </Flex>
    </>
  );
}
