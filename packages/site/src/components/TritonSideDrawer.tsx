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
    await setApiKey(apiKey);
    validateApiKey();
  };

  const validateApiKey = async () => {
    const response = await fetch("http://localhost:8788/auth", {
      headers: {
        "Content-Type": "application/json",
        "Triton-Api-Key": localStorage.getItem("tritonApiKey") || "",
      },
      method: "POST",
    });

    if (response.ok) {
      console.log("API key is valid");
    } else {
      console.log("API key is invalid, ", response.status);
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
