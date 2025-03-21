import {
  Box,
  Button,
  Heading,
  Icon,
  InputPassword,
  InputText,
  InputValidation,
  SegmentedControl,
  SideDrawer,
  Text,
  Tooltip,
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
    <Box
      padding="larger"
      gap="base"
      alignItems="center"
      margin={{ bottom: "base" }}
      background="surface--background--subtle"
      radius="base"
    >
      <Box gap="small" alignItems="center">
        <Icon name="warning" size="large" />
        <Heading level={3}>Authentication required</Heading>
      </Box>
      <Text align="center">
        Enter your Atlantis AI API key to access Triton
      </Text>
      <InputPassword
        value={apiKey}
        align="center"
        placeholder="API key"
        onChange={value => {
          setApiKey(value as string);
          if (!value) setValidationError("");
        }}
      />
      {validationError && <InputValidation message={validationError} />}
      <Button label="Submit" onClick={handleSubmit} loading={loading} />
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
        flex: 1,
        minHeight: 0,
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
          placeholder="Ask a question"
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
    personality,
    setPersonality,
  } = useTritonChat();

  useEffect(() => {
    validateApiKey();
  }, []);

  return (
    <SideDrawer open={tritonOpen} onRequestClose={onCloseTriton}>
      <SideDrawer.Title>Triton</SideDrawer.Title>
      <SideDrawer.Actions>
        <Tooltip message="Visit Triton Site">
          <Button
            ariaLabel="Visit Triton Site"
            icon="export"
            type="secondary"
            variation="subtle"
            url="https://atlantis-ai.jobber.dev"
          />
        </Tooltip>
      </SideDrawer.Actions>
      {isValidKey && (
        <SideDrawer.Toolbar>
          <SegmentedControl
            selectedValue={personality}
            onSelectValue={setPersonality}
            size="small"
          >
            <SegmentedControl.Option value="developer">
              Developer
            </SegmentedControl.Option>
            <SegmentedControl.Option value="designer">
              Designer
            </SegmentedControl.Option>
          </SegmentedControl>
        </SideDrawer.Toolbar>
      )}
      <Box
        padding={{ left: "base", right: "base", bottom: "base" }}
        direction="column"
        height="grow"
      >
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
      </Box>
    </SideDrawer>
  );
}
