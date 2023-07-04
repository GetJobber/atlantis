import React from "react";
import { InputText, InputNumber, Content, Flex, Heading } from "@jobber/components-native";
import { View } from "react-native";

export function InputTextShowcase() {
  return (
    <>
      <View style={{ marginVertical: 20, paddingHorizontal: 24 }}>
        <Heading>InputText Variations</Heading>
      </View>
      <Flex template={["grow", "grow"]}>
        <Content>
          <InputText placeholder="Favourite fruit" defaultValue="Banana" />
          <InputNumber assistiveText="Need help?" value={1337} />
        </Content>
      </Flex>
    </>
  )
}
