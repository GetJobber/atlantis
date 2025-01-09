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
  const [isExpanded, setIsExpanded] = useState(true);
  const hideFeedbackBanner = localStorage.getItem("hideFeedbackBanner");

  if (hideFeedbackBanner) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
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
        padding: "var(--space-small)",
        transition: "transform 0.3s ease-in-out",
        transform: isExpanded
          ? "translateY(0)"
          : "translateY(calc(100% - 40px))",
      }}
    >
      <Box
        direction="row"
        justifyContent="space-between"
        width="100%"
        alignItems="center"
      >
        <Heading level={4}>Welcome to the new site</Heading>
        <Button
          icon={isExpanded ? "arrowDown" : "arrowUp"}
          ariaLabel={isExpanded ? "Collapse" : "Expand"}
          variation="subtle"
          type="secondary"
          onClick={() => setIsExpanded(!isExpanded)}
        />
      </Box>
      {isExpanded && (
        <Box direction="row" alignItems="center" margin={{ top: "base" }}>
          <Button
            type="secondary"
            url="/GOOGLEFORMLINK"
            label="Give feedback"
          />
          <Button
            type="tertiary"
            variation="subtle"
            onClick={() => {
              localStorage.setItem("nolikeynewsite", "true");
              window.location.href =
                "/storybook/?path=/docs/introduction--docs";
            }}
            label="Back to old site"
          />
        </Box>
      )}
    </div>
  );
};
