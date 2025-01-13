import { Button, Tooltip, showToast } from "@jobber/components";

export function CopyCodeButton({ code }: { readonly code: string }) {
  return (
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
  );
}
