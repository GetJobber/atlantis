import { Box, Content, Heading, Icon, Text } from "@jobber/components";
import ReactMarkdown from "react-markdown";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
import styles from "./TritonConversation.module.css";
import { CopyCodeButton } from "./CodeCopyButton";
import { componentMap, getComponentPath } from "../utils/TritonLinks";
import { useTritonChat } from "../providers/TritonProvider";

const WelcomeMessage = () => (
  <Content>
    <Heading level={3}>Welcome!</Heading>
    <div style={{ marginBottom: 80 }}>
      <Text>
        I am an early-stage AI that can help you build with Atlantis components.
        You can ask me questions, I will generate custom component code and you
        can test it all out in the live preview.
      </Text>
    </div>
  </Content>
);

interface MessageProps {
  readonly question: string;
  readonly response: string;
}

const Message = ({ question, response }: MessageProps) => (
  <div>
    <div style={{ width: "100%", display: "flex" }}>
      <Box
        background="surface--background"
        padding="small"
        radius="base"
        margin={{ bottom: "base" }}
      >
        <Text>{question}</Text>
      </Box>
    </div>
    <div style={{ display: "flex", gap: 6, marginBottom: "large" }}>
      <Icon name="sparkles" size="small" color="interactiveSubtle" />
      <div style={{ flex: 1, marginBottom: 40 }}>
        <Content spacing="base">
          <ReactMarkdown
            components={{
              a: ({ children }) => {
                const text = String(children);
                const key = Object.keys(componentMap).find(mapKey =>
                  text.toLowerCase().includes(mapKey.toLowerCase()),
                );

                return <Link to={getComponentPath(key || "")}>{children}</Link>;
              },
              p: ({ children }) => <Text>{children}</Text>,
              pre: ({ children, ...props }) => {
                const codeContent =
                  (children as ReactElement)?.props?.children || "";

                return (
                  <div style={{ position: "relative" }}>
                    <pre className={styles.codeWrapper} tabIndex={0} {...props}>
                      {children}
                    </pre>
                    <CopyCodeButton code={codeContent} />
                  </div>
                );
              },
            }}
          >
            {response}
          </ReactMarkdown>
        </Content>
      </div>
    </div>
  </div>
);

export function TritonConversation() {
  const { responses, questions } = useTritonChat();

  if (responses.length === 0) {
    return <WelcomeMessage />;
  }

  return (
    <div style={{ paddingRight: "var(--space-base)" }}>
      {responses.map((response, index) => (
        <Message key={index} question={questions[index]} response={response} />
      ))}
    </div>
  );
}
