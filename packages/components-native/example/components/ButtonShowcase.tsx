import React from "react";
import { Button, Content, Flex, Heading } from "@jobber/components-native";
import { View } from "react-native";

export function ButtonShowcase() {
  return (
    <>
      <View style={{ marginVertical: 20, paddingHorizontal: 24 }}>
        <Heading>Button Variations</Heading>
      </View>
      <Flex template={["grow", "grow"]}>
        <Content>
          <Button variation="work" label="work" onPress={() => console.log("work")} />
          <Button variation="destructive" label="destructive" onPress={() => console.log("destructive")} />
        </Content>
        <Content>
          <Button variation="learning" label="learning" onPress={() => console.log("learning")} />
          <Button variation="cancel" label="cancel" onPress={() => console.log("cancel")} />
        </Content>
      </Flex>
    </>
  )
}
