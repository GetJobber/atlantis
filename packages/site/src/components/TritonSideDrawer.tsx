import {
  Box,
  Button,
  Content,
  // Heading,
  InputPassword,
  InputText,
  InputValidation,
  SideDrawer,
  Text,
} from "@jobber/components";
import { useState } from "react";
import { TritonConversation } from "./TritonConversation";
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
    loading,
  } = useTritonChat();

  const saveAndValidateApiKey = async () => {
    try {
      await setApiKey(apiKey);
      setValidationError("");
      // Success - will automatically show chat due to hasApiKey being true
    } catch (error) {
      console.log("API key is invalid");
      setValidationError("Invalid API key");
      // Stay on auth screen since hasApiKey remains false
    }
  };

  const [apiKey, setLocalApiKey] = useState("");
  const [validationError, setValidationError] = useState("");

  return (
    <SideDrawer open={tritonOpen} onRequestClose={onCloseTriton}>
      <SideDrawer.Toolbar>
        {hasApiKey ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "calc(100vh - 80px)",
              gap: 16,
            }}
          >
            <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
              <TritonConversation />
            </div>
            <div
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  sendSearch();
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
            >
              <InputText
                placeholder="Ask a Question"
                multiline={true}
                value={question}
                onChange={d => setQuestion(d as string)}
                toolbarVisibility="always"
                toolbar={
                  <div style={{ marginLeft: "auto" }}>
                    <Button
                      onClick={() => sendSearch()}
                      label="Ask"
                      loading={loading}
                    />
                  </div>
                }
              />
            </div>
          </div>
        ) : (
          <Box margin={{ bottom: "base" }}>
            <Content>
              <Text>
                To authenticate with Triton, paste the secret API key below.
              </Text>
              <InputPassword
                value={apiKey}
                onChange={d => {
                  setLocalApiKey(d as string);
                  if (!d) setValidationError("");
                }}
              />
              {validationError && <InputValidation message={validationError} />}
              <Button label="Save" onClick={saveAndValidateApiKey} />
            </Content>
          </Box>
        )}
      </SideDrawer.Toolbar>
    </SideDrawer>
  );
}
