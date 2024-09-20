import { Box, Button, showToast } from "@jobber/components";

export const CodeViewer = ({ code }: { readonly code: string }) => {
  return (
    <Box>
      <Box width={"100%"} alignItems="start">
        <Box width={"100%"}>
          <pre className="root-pre type-javascript">
            <code className="root-code type-javascript">{code}</code>
          </pre>
        </Box>

        <Box width="100%" direction="row" justifyContent="end">
          <Button
            label="Copy"
            type="tertiary"
            size="small"
            onClick={() => {
              navigator.clipboard.writeText(code);
              showToast({
                message: "Copied code to clipboard",
              });
            }}
          ></Button>
        </Box>
      </Box>
    </Box>
  );
};
