import { Box, Button, Tooltip, showToast } from "@jobber/components";

/**
 * Shows code with a copy button.
 *
 * @param param0 {code: string}
 * @returns ReactNode
 */
export const CodeViewer = ({ code }: { readonly code: string }) => {
  return (
    <Box>
      <Box width={"100%"} alignItems="start">
        <Box width={"100%"}>
          <pre className="root-pre type-javascript">
            <code className="root-code type-javascript">{code}</code>
          </pre>
        </Box>

        <div style={{ position: "absolute", bottom: "10px", right: "3px" }}>
          <Tooltip message="Copy code to clipboard">
            <Button
              ariaLabel="Copy"
              icon="copy"
              type="secondary"
              variation="subtle"
              size="small"
              onClick={() => {
                navigator.clipboard.writeText(code);
                showToast({
                  message: "Copied code to clipboard",
                });
              }}
            ></Button>
          </Tooltip>
        </div>
      </Box>
    </Box>
  );
};
