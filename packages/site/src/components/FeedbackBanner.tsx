import {
  Box,
  Button,
  Content,
  Disclosure,
  Emphasis,
  Heading,
  Text,
} from "@jobber/components";

/**
 * FeedbackBanner
 *
 * Yeah the huge gross inline style isn't great, but this is going away soon
 * so why clutter up with a bunch of files.
 *
 * @returns
 */
export const FeedbackBanner = () => {
  const hideFeedbackBanner = localStorage.getItem("hideFeedbackBanner");

  if (hideFeedbackBanner) {
    return null;
  }

  return (
    <div
      data-elevation="elevated"
      style={{
        position: "fixed",
        bottom: 0,
        width: "375px",
        backgroundColor: "var(--color-surface)",
        left: 0,
        right: 0,
        margin: "0 auto",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        border: "1px solid var(--color-border)",
        borderBottom: "none",
        borderTopLeftRadius: "var(--radius-base)",
        borderTopRightRadius: "var(--radius-base)",
        boxShadow: "var(--shadow-base)",
        padding: "var(--space-small)",
      }}
    >
      <Disclosure
        title={
          <Heading>
            Welcome to the <Emphasis variation="highlight">new</Emphasis>{" "}
            Atlantis docs site
          </Heading>
        }
      >
        <Content spacing="small">
          <Text size="small">
            We&apos;re excited to share our new docs site with you! Please take
            a moment to give us feedback so we can make it even better.
          </Text>
          <Box direction="row" alignItems="center" gap="small">
            <Button
              type="secondary"
              size="small"
              url="https://docs.google.com/forms/d/e/1FAIpQLSdP0Gx84AT9rD5Y2Snm4x-COzavhE4pjNyOfOjjbdEmycdsAQ/viewform?usp=sharing"
              label="Give feedback"
            />
            <Button
              type="tertiary"
              variation="subtle"
              size="small"
              onClick={() => {
                localStorage.setItem("nolikeynewsite", "true");
                window.location.href =
                  "/storybook/?path=/docs/introduction--docs";
              }}
              label="Back to old site"
            />
          </Box>
        </Content>
      </Disclosure>
    </div>
  );
};
