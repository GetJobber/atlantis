import { Box, Content, Heading, Icon, Text } from "@jobber/components";
import ReactMarkdown from "react-markdown";
import { useTritonChat } from "../providers/TritonProvider";

export function TritonConversation() {
  const { responses, questions } = useTritonChat();

  if (responses.length === 0) {
    return (
      <Content>
        <Heading level={2}>Welcome!</Heading>

        <div style={{ marginBottom: 80 }}>
          <Text>
            I am an early-stage AI that can help you build with Atlantis
            components. You can ask me questions, I will generate custom
            component code and you can test it all out in the live preview.
          </Text>
        </div>
      </Content>
    );
  }

  return (
    <div style={{ height: "100%", overflow: "auto" }}>
      {responses.map((response, index) => (
        <div key={index}>
          <Box
            background="surface"
            padding="small"
            radius="base"
            margin={{ bottom: "small" }}
          >
            <Text>{questions[index]}</Text>
          </Box>
          <div style={{ display: "flex", gap: "small", marginBottom: "large" }}>
            <Icon name="sparkles" size="small" color="interactiveSubtle" />
            <div style={{ width: "100%" }}>
              <ReactMarkdown
                components={{
                  p: ({ children }) => <Text>{children}</Text>,
                }}
              >
                {response}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
