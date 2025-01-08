import { Box, Button, Heading } from "@jobber/components";
import { useState } from "react";

/**
 * FeedbackBanner
 *
 * Yeah the huge gross inline style isn't great, but this is going away soon
 * so why clutter up with a bunch of files.
 *
 * @returns
 */
export const FeedbackBanner = () => {
  const [innerState, setInnerState] = useState(true);
  const hideFeedbackBanner = localStorage.getItem("hideFeedbackBanner");

  if (hideFeedbackBanner || !innerState) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        bottom: -20,
        width: "375px",
        backgroundColor: "var(--color-surface)",
        color: "white",
        left: 0,
        right: 0,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        border: "1px solid var(--color-border)",
        borderTopLeftRadius: "var(--radius-base)",
        borderTopRightRadius: "var(--radius-base)",
        boxShadow: "var(--shadow-base)",
        padding: "var(--space-base)",
        paddingBottom: "var(--space-base)",
      }}
    >
      <Box
        direction="row"
        justifyContent="space-between"
        width="100%"
        margin={{ bottom: "base" }}
        alignItems="center"
      >
        <Heading level={4}>Welcome to the new site</Heading>
        <Button
          icon="remove"
          ariaLabel="remove"
          variation="subtle"
          type="secondary"
          onClick={() => {
            localStorage.setItem("hideFeedbackBanner", "true");
            setInnerState(false);
          }}
        />
      </Box>
      <Box direction="row" alignItems="center">
        <Button
          type="secondary"
          url="/GOOGLEFORMLINK"
          label="Give feedback"
        ></Button>
        <Button
          type="tertiary"
          variation="subtle"
          onClick={() => {
            localStorage.setItem("nolikeynewsite", "true");
            window.location.href = "/storybook/?path=/docs/introduction--docs";
          }}
          label="Back to old site"
        />
      </Box>
    </div>
  );
};
