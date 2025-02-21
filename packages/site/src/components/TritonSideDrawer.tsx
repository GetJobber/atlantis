import {
  Box,
  Button,
  Content,
  InputPassword,
  InputText,
  InputValidation,
  SideDrawer,
  Text,
} from "@jobber/components";
import { useCallback, useEffect, useState } from "react";
import { TritonConversation } from "./TritonConversation";
import { useTritonChat } from "../providers/TritonProvider";

const ApiKeyForm = ({
  onSubmit,
  loading,
}: {
  readonly onSubmit: (key: string) => Promise<void>;
  readonly loading: boolean;
}) => {
  const [apiKey, setApiKey] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = async () => {
    try {
      await onSubmit(apiKey);
      setValidationError("");
    } catch {
      setValidationError("Invalid Triton API key");
    }
  };

  return (
    <Box margin={{ bottom: "base" }}>
      <Content>
        <Text>
          To authenticate with Triton, paste the secret API key below.
        </Text>
        <InputPassword
          value={apiKey}
          onChange={value => {
            setApiKey(value as string);
            if (!value) setValidationError("");
          }}
        />
        {validationError && <InputValidation message={validationError} />}
        <Button label="Save" onClick={handleSubmit} loading={loading} />
      </Content>
    </Box>
  );
};

const ChatInterface = ({
  question,
  setQuestion,
  sendSearch,
  loading,
}: {
  readonly question: string;
  readonly setQuestion: (q: string) => void;
  readonly sendSearch: () => void;
  readonly loading: boolean;
}) => {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        sendSearch();
        e.preventDefault();
        e.stopPropagation();
      }
    },
    [sendSearch],
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 80px)",
        gap: 16,
      }}
    >
      <div
        style={{ flex: 1, overflowY: "auto", minHeight: 0 }}
        data-conversation-container
      >
        <TritonConversation />
      </div>
      <div onKeyDown={handleKeyDown}>
        <InputText
          placeholder="Ask a Question"
          multiline={true}
          value={question}
          onChange={value => setQuestion(value as string)}
          toolbarVisibility="always"
          toolbar={
            <div style={{ marginLeft: "auto" }}>
              <Button
                label={loading ? "Asking..." : "Ask"}
                loading={loading}
                onClick={sendSearch}
              />
            </div>
          }
        />
      </div>
    </div>
  );
};

export function TritonSideDrawer() {
  const {
    tritonOpen,
    onCloseTriton,
    question,
    setQuestion,
    sendSearch,
    setApiKey,
    loading,
    validateApiKey,
    isValidKey,
  } = useTritonChat();

  useEffect(() => {
    validateApiKey();
  }, []);

  return (
    <SideDrawer open={tritonOpen} onRequestClose={onCloseTriton}>
      <SideDrawer.Toolbar>
        {isValidKey ? (
          <ChatInterface
            question={question}
            setQuestion={setQuestion}
            sendSearch={sendSearch}
            loading={loading}
          />
        ) : (
          <ApiKeyForm onSubmit={setApiKey} loading={loading} />
        )}
      </SideDrawer.Toolbar>
    </SideDrawer>
  );
}
