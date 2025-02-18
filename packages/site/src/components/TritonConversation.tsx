import { Box, Content, Heading, Icon, Link, Text } from "@jobber/components";
import ReactMarkdown from "react-markdown";
import styles from "./TritonConversation.module.css";
import { componentMap, getComponentPath } from "./TritonLinks";
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
    <div
      style={{
        paddingRight: "var(--space-base)",
      }}
    >
      {responses.map((response, index) => (
        <div key={index}>
          <div
            style={{
              width: "100%",
              display: "flex",
            }}
          >
            <Box
              background="surface--background"
              padding="small"
              radius="base"
              margin={{ bottom: "small" }}
            >
              <Text>{questions[index]}</Text>
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

                      return (
                        <Link
                          url={getComponentPath(key || "")}
                          external={false}
                        >
                          {children}
                        </Link>
                      );
                    },
                    p: ({ children }) => <Text>{children}</Text>,
                    pre: ({ children }) => (
                      <pre className={styles.codeWrapper} tabIndex={0}>
                        {children}
                      </pre>
                    ),
                  }}
                >
                  {response}
                </ReactMarkdown>
              </Content>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
