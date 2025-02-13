import {
  Box,
  Button,
  Content,
  Heading,
  InputPassword,
  InputText,
  SideDrawer,
  Text,
} from "@jobber/components";
import { useState } from "react";
import { useTritonChat } from "../providers/TritonProvider";

export function TritonSideDrawer() {
  const {
    tritonOpen,
    onCloseTriton,
    question,
    setQuestion,
    sendSearch,
    hasApiKey,
    setApiKey,
  } = useTritonChat();

  const saveAndValidateApiKey = async () => {
    try {
      await setApiKey(apiKey);
      // Success - will automatically show chat due to hasApiKey being true
    } catch (error) {
      console.log("API key is invalid");
      // Stay on auth screen since hasApiKey remains false
    }
  };

  const [apiKey, setLocalApiKey] = useState("");

  return (
    <SideDrawer open={tritonOpen} onRequestClose={onCloseTriton}>
      <SideDrawer.Toolbar>
        {hasApiKey ? (
          <Content>
            <Heading level={2}>Welcome personality!</Heading>

            <div style={{ marginBottom: 80 }}>
              <Text>
                I am an early-stage AI that can help you build with Atlantis
                components. You can ask me questions, I will generate custom
                component code and you can test it all out in the live preview.
              </Text>
            </div>
            <InputText
              placeholder="Ask a Question"
              multiline={true}
              value={question}
              onChange={d => setQuestion(d as string)}
              toolbarVisibility="always"
              toolbar={
                <div style={{ marginLeft: "auto" }}>
                  <Button onClick={() => sendSearch()} label="Ask" />
                </div>
              }
            />
          </Content>
        ) : (
          <Box margin={{ bottom: "base" }}>
            <Content>
              <Text>
                To authenticate with Triton, paste the secret API key below.
              </Text>
              <InputPassword
                value={apiKey}
                onChange={d => setLocalApiKey(d as string)}
              />
              <Button label="Save" onClick={saveAndValidateApiKey} />
            </Content>
          </Box>
        )}
      </SideDrawer.Toolbar>
    </SideDrawer>
  );
}
