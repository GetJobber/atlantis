import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Chip } from "@jobber/components/Chip";
import { Content } from "@jobber/components/Content";
import { Typography } from "@jobber/components/Typography";
import { Avatar } from "@jobber/components/Avatar";
import { Icon } from "@jobber/components/Icon";

export default {
  title: "Components/Selections/Chip/Web/Comparisons",
  component: Chip,
  subcomponents: { Chip },
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
        extraImports: {
          "@jobber/components/Chip": ["Chip"],
        },
      },
    },
  },
} as ComponentMeta<typeof Chip>;

const AllTemplate: ComponentStory<typeof Chip> = () => {
  const longLabel =
    "This is a very long chip label that will definitely need to be truncated";
  const longHeading =
    "This is a very long heading that will need truncation as well";
  const shortLabel = "Short Label";
  const shortHeading = "Short Heading";

  return (
    <Content>
      <div style={{ display: "flex", gap: 12 }}>
        <div>
          <Typography>Base</Typography>
          <Typography>Base Default</Typography>
          <Chip label="Chip Label" />
          <Typography>Base Disabled</Typography>
          <Chip label="Chip Label" disabled />
          <Typography>Subtle</Typography>
          <Chip label="Chip Label" variation="subtle" />
          <Typography>Subtle Disabled</Typography>
          <Chip label="Chip Label" variation="subtle" disabled />
          <Typography>Invalid</Typography>
          <Chip label="Chip Label" invalid />
          <Typography>Invalid Disabled</Typography>
          <Chip label="Chip Label" invalid disabled />
          <Typography>Subtle Invalid</Typography>
          <Chip label="Chip Label" variation="subtle" invalid />
          <Typography>Subtle Invalid Disabled</Typography>
          <Chip label="Chip Label" variation="subtle" invalid disabled />
          <Typography>Base Heading</Typography>
          <Chip label="Chip Label" heading="Heading" />
          <Typography>Base Heading Disabled</Typography>
          <Chip label="Chip Label" heading="Heading" disabled />
          <Typography>Subtle Heading</Typography>
          <Chip label="Chip Label" heading="Heading" variation="subtle" />
          <Typography>Subtle Heading Disabled</Typography>
          <Chip
            label="Chip Label"
            heading="Heading"
            variation="subtle"
            disabled
          />
          <Typography>Invalid Heading</Typography>
          <Chip
            label="Chip Label"
            heading="Heading"
            variation="subtle"
            invalid
          />
          <Typography>Invalid Heading Disabled</Typography>
          <Chip
            label="Chip Label"
            heading="Heading"
            variation="subtle"
            invalid
            disabled
          />
        </div>
        <div>
          <Typography>Only Prefix</Typography>
          <Typography>Base Default</Typography>
          <Chip label="Chip Label">
            <Chip.Prefix>
              <Avatar initials="st" size="small" />
            </Chip.Prefix>
          </Chip>
          <Typography>Base Disabled</Typography>
          <Chip label="Chip Label" disabled>
            <Chip.Prefix>
              <Avatar initials="st" size="small" />
            </Chip.Prefix>
          </Chip>
          <Typography>Subtle</Typography>
          <Chip label="Chip Label" variation="subtle">
            <Chip.Prefix>
              <Avatar initials="st" size="small" />
            </Chip.Prefix>
          </Chip>
          <Typography>Subtle Disabled</Typography>
          <Chip label="Chip Label" variation="subtle" disabled>
            <Chip.Prefix>
              <Avatar initials="st" size="small" />
            </Chip.Prefix>
          </Chip>
          <Typography>Invalid</Typography>
          <Chip label="Chip Label" invalid>
            <Chip.Prefix>
              <Avatar initials="st" size="small" />
            </Chip.Prefix>
          </Chip>
          <Typography>Invalid Disabled</Typography>
          <Chip label="Chip Label" invalid disabled>
            <Chip.Prefix>
              <Avatar initials="st" size="small" />
            </Chip.Prefix>
          </Chip>
          <Typography>Subtle Invalid</Typography>
          <Chip label="Chip Label" variation="subtle" invalid>
            <Chip.Prefix>
              <Avatar initials="st" size="small" />
            </Chip.Prefix>
          </Chip>
          <Typography>Subtle Invalid Disabled</Typography>
          <Chip label="Chip Label" variation="subtle" invalid disabled>
            <Chip.Prefix>
              <Avatar initials="st" size="small" />
            </Chip.Prefix>
          </Chip>
          <Typography>Base Heading</Typography>
          <Chip label="Chip Label" heading="Heading">
            <Chip.Prefix>
              <Avatar initials="st" size="small" />
            </Chip.Prefix>
          </Chip>
          <Typography>Base Heading Disabled</Typography>
          <Chip label="Chip Label" heading="Heading" disabled>
            <Chip.Prefix>
              <Avatar initials="st" size="small" />
            </Chip.Prefix>
          </Chip>
          <Typography>Subtle Heading</Typography>
          <Chip label="Chip Label" heading="Heading" variation="subtle">
            <Chip.Prefix>
              <Avatar initials="st" size="small" />
            </Chip.Prefix>
          </Chip>
          <Typography>Subtle Heading Disabled</Typography>
          <Chip
            label="Chip Label"
            heading="Heading"
            variation="subtle"
            disabled
          >
            <Chip.Prefix>
              <Avatar initials="st" size="small" />
            </Chip.Prefix>
          </Chip>
          <Typography>Invalid Heading</Typography>
          <Chip label="Chip Label" heading="Heading" variation="subtle" invalid>
            <Chip.Prefix>
              <Avatar initials="st" size="small" />
            </Chip.Prefix>
          </Chip>
          <Typography>Invalid Heading Disabled</Typography>
          <Chip
            label="Chip Label"
            heading="Heading"
            variation="subtle"
            invalid
            disabled
          >
            <Chip.Prefix>
              <Avatar initials="st" size="small" />
            </Chip.Prefix>
          </Chip>
        </div>
        <div>
          <Typography>Only Suffix</Typography>
          <Typography>Base Default</Typography>
          <Chip label="Chip Label">
            <Chip.Suffix>
              <Icon name="cross" size="small" color="interactiveSubtle" />
            </Chip.Suffix>
          </Chip>
          <Typography>Base Disabled</Typography>
          <Chip label="Chip Label" disabled>
            <Chip.Suffix>
              <Icon name="cross" size="small" color="interactiveSubtle" />
            </Chip.Suffix>
          </Chip>
          <Typography>Subtle</Typography>
          <Chip label="Chip Label" variation="subtle">
            <Chip.Suffix>
              <Icon name="cross" size="small" color="interactiveSubtle" />
            </Chip.Suffix>
          </Chip>
          <Typography>Subtle Disabled</Typography>
          <Chip label="Chip Label" variation="subtle" disabled>
            <Chip.Suffix>
              <Icon name="cross" size="small" color="interactiveSubtle" />
            </Chip.Suffix>
          </Chip>
          <Typography>Invalid</Typography>
          <Chip label="Chip Label" invalid>
            <Chip.Suffix>
              <Icon name="cross" size="small" color="interactiveSubtle" />
            </Chip.Suffix>
          </Chip>
          <Typography>Invalid Disabled</Typography>
          <Chip label="Chip Label" invalid disabled>
            <Chip.Suffix>
              <Icon name="cross" size="small" color="interactiveSubtle" />
            </Chip.Suffix>
          </Chip>
          <Typography>Subtle Invalid</Typography>
          <Chip label="Chip Label" variation="subtle" invalid>
            <Chip.Suffix>
              <Icon name="cross" size="small" color="interactiveSubtle" />
            </Chip.Suffix>
          </Chip>
          <Typography>Subtle Invalid Disabled</Typography>
          <Chip label="Chip Label" variation="subtle" invalid disabled>
            <Chip.Suffix>
              <Icon name="cross" size="small" color="interactiveSubtle" />
            </Chip.Suffix>
          </Chip>
          <Typography>Base Heading</Typography>
          <Chip label="Chip Label" heading="Heading">
            <Chip.Suffix>
              <Icon name="cross" size="small" color="interactiveSubtle" />
            </Chip.Suffix>
          </Chip>
          <Typography>Base Heading Disabled</Typography>
          <Chip label="Chip Label" heading="Heading" disabled>
            <Chip.Suffix>
              <Icon name="cross" size="small" color="interactiveSubtle" />
            </Chip.Suffix>
          </Chip>
          <Typography>Subtle Heading</Typography>
          <Chip label="Chip Label" heading="Heading" variation="subtle">
            <Chip.Suffix>
              <Icon name="cross" size="small" color="interactiveSubtle" />
            </Chip.Suffix>
          </Chip>
          <Typography>Subtle Heading Disabled</Typography>
          <Chip
            label="Chip Label"
            heading="Heading"
            variation="subtle"
            disabled
          >
            <Chip.Suffix>
              <Icon name="cross" size="small" color="interactiveSubtle" />
            </Chip.Suffix>
          </Chip>
          <Typography>Invalid Heading</Typography>
          <Chip label="Chip Label" heading="Heading" variation="subtle" invalid>
            <Chip.Suffix>
              <Icon name="cross" size="small" color="interactiveSubtle" />
            </Chip.Suffix>
          </Chip>
          <Typography>Invalid Heading Disabled</Typography>
          <Chip
            label="Chip Label"
            heading="Heading"
            variation="subtle"
            invalid
            disabled
          >
            <Chip.Suffix>
              <Icon name="cross" size="small" color="interactiveSubtle" />
            </Chip.Suffix>
          </Chip>
        </div>
        <div>
          <Typography>Suffix & Prefix</Typography>
          <Typography>Base Default</Typography>
          <Chip label="Chip Label">
            <Chip.Prefix>
              <Avatar initials="st" size="small" />
            </Chip.Prefix>
            <Chip.Suffix>
              <Icon name="cross" size="small" color="interactiveSubtle" />
            </Chip.Suffix>
          </Chip>
          <Typography>Base Disabled</Typography>
          <Chip label="Chip Label" disabled>
            <Chip.Prefix>
              <Avatar initials="st" size="small" />
            </Chip.Prefix>
            <Chip.Suffix>
              <Icon name="cross" size="small" color="interactiveSubtle" />
            </Chip.Suffix>
          </Chip>
          <Typography>Subtle</Typography>
          <Chip label="Chip Label" variation="subtle">
            <Chip.Prefix>
              <Avatar initials="st" size="small" />
            </Chip.Prefix>
            <Chip.Suffix>
              <Icon name="cross" size="small" color="interactiveSubtle" />
            </Chip.Suffix>
          </Chip>
          <Typography>Subtle Disabled</Typography>
          <Chip label="Chip Label" variation="subtle" disabled>
            <Chip.Prefix>
              <Avatar initials="st" size="small" />
            </Chip.Prefix>
            <Chip.Suffix>
              <Icon name="cross" size="small" color="interactiveSubtle" />
            </Chip.Suffix>
          </Chip>
          <Typography>Invalid</Typography>
          <Chip label="Chip Label" invalid>
            <Chip.Prefix>
              <Avatar initials="st" size="small" />
            </Chip.Prefix>
            <Chip.Suffix>
              <Icon name="cross" size="small" color="interactiveSubtle" />
            </Chip.Suffix>
          </Chip>
          <Typography>Invalid Disabled</Typography>
          <Chip label="Chip Label" invalid disabled>
            <Chip.Prefix>
              <Avatar initials="st" size="small" />
            </Chip.Prefix>
            <Chip.Suffix>
              <Icon name="cross" size="small" color="interactiveSubtle" />
            </Chip.Suffix>
          </Chip>
          <Typography>Subtle Invalid</Typography>
          <Chip label="Chip Label" variation="subtle" invalid>
            <Chip.Prefix>
              <Avatar initials="st" size="small" />
            </Chip.Prefix>
            <Chip.Suffix>
              <Icon name="cross" size="small" color="interactiveSubtle" />
            </Chip.Suffix>
          </Chip>
          <Typography>Subtle Invalid Disabled</Typography>
          <Chip label="Chip Label" variation="subtle" invalid disabled>
            <Chip.Prefix>
              <Avatar initials="st" size="small" />
            </Chip.Prefix>
            <Chip.Suffix>
              <Icon name="cross" size="small" color="interactiveSubtle" />
            </Chip.Suffix>
          </Chip>
          <Typography>Base Heading</Typography>
          <Chip label="Chip Label" heading="Heading">
            <Chip.Prefix>
              <Avatar initials="st" size="small" />
            </Chip.Prefix>
            <Chip.Suffix>
              <Icon name="cross" size="small" color="interactiveSubtle" />
            </Chip.Suffix>
          </Chip>
          <Typography>Base Heading Disabled</Typography>
          <Chip label="Chip Label" heading="Heading" disabled>
            <Chip.Prefix>
              <Avatar initials="st" size="small" />
            </Chip.Prefix>
            <Chip.Suffix>
              <Icon name="cross" size="small" color="interactiveSubtle" />
            </Chip.Suffix>
          </Chip>
          <Typography>Subtle Heading</Typography>
          <Chip label="Chip Label" heading="Heading" variation="subtle">
            <Chip.Prefix>
              <Avatar initials="st" size="small" />
            </Chip.Prefix>
            <Chip.Suffix>
              <Icon name="cross" size="small" color="interactiveSubtle" />
            </Chip.Suffix>
          </Chip>
          <Typography>Subtle Heading Disabled</Typography>
          <Chip
            label="Chip Label"
            heading="Heading"
            variation="subtle"
            disabled
          >
            <Chip.Prefix>
              <Avatar initials="st" size="small" />
            </Chip.Prefix>
            <Chip.Suffix>
              <Icon name="cross" size="small" color="interactiveSubtle" />
            </Chip.Suffix>
          </Chip>
          <Typography>Invalid Heading</Typography>
          <Chip label="Chip Label" heading="Heading" variation="subtle" invalid>
            <Chip.Prefix>
              <Avatar initials="st" size="small" />
            </Chip.Prefix>
            <Chip.Suffix>
              <Icon name="cross" size="small" color="interactiveSubtle" />
            </Chip.Suffix>
          </Chip>
          <Typography>Invalid Heading Disabled</Typography>
          <Chip
            label="Chip Label"
            heading="Heading"
            variation="subtle"
            invalid
            disabled
          >
            <Chip.Prefix>
              <Avatar initials="st" size="small" />
            </Chip.Prefix>
            <Chip.Suffix>
              <Icon name="cross" size="small" color="interactiveSubtle" />
            </Chip.Suffix>
          </Chip>
        </div>
        <div style={{ maxWidth: "300px" }}>
          <Typography>Truncation Examples</Typography>
          <Typography>Long Label Only</Typography>
          <Chip label={longLabel} />
          <Typography>Long Label with Prefix</Typography>
          <Chip label={longLabel}>
            <Chip.Prefix>
              <Avatar initials="st" size="small" />
            </Chip.Prefix>
          </Chip>
          <Typography>Long Label with Suffix</Typography>
          <Chip label={longLabel}>
            <Chip.Suffix>
              <Icon name="cross" size="small" color="interactiveSubtle" />
            </Chip.Suffix>
          </Chip>
          <Typography>Long Label with Both</Typography>
          <Chip label={longLabel}>
            <Chip.Prefix>
              <Avatar initials="st" size="small" />
            </Chip.Prefix>
            <Chip.Suffix>
              <Icon name="cross" size="small" color="interactiveSubtle" />
            </Chip.Suffix>
          </Chip>
          <Typography>Long Heading with Short Label</Typography>
          <Chip label={shortLabel} heading={longHeading} />
          <Typography>Short Heading with Long Label</Typography>
          <Chip label={longLabel} heading={shortHeading} />
          <Typography>Long Heading and Long Label</Typography>
          <Chip label={longLabel} heading={longHeading} />
          <Typography>Long Everything with Prefix and Suffix</Typography>
          <Chip label={longLabel} heading={longHeading}>
            <Chip.Prefix>
              <Avatar initials="st" size="small" />
            </Chip.Prefix>
            <Chip.Suffix>
              <Icon name="cross" size="small" color="interactiveSubtle" />
            </Chip.Suffix>
          </Chip>
          <Typography>Subtle Variation with Long Text</Typography>
          <Chip label={longLabel} heading={longHeading} variation="subtle">
            <Chip.Prefix>
              <Avatar initials="st" size="small" />
            </Chip.Prefix>
            <Chip.Suffix>
              <Icon name="cross" size="small" color="interactiveSubtle" />
            </Chip.Suffix>
          </Chip>
          <Typography>Invalid with Long Text</Typography>
          <Chip label={longLabel} heading={longHeading} invalid>
            <Chip.Prefix>
              <Avatar initials="st" size="small" />
            </Chip.Prefix>
            <Chip.Suffix>
              <Icon name="cross" size="small" color="interactiveSubtle" />
            </Chip.Suffix>
          </Chip>
          <Typography>Disabled with Long Text</Typography>
          <Chip label={longLabel} heading={longHeading} disabled>
            <Chip.Prefix>
              <Avatar initials="st" size="small" />
            </Chip.Prefix>
            <Chip.Suffix>
              <Icon name="cross" size="small" color="interactiveSubtle" />
            </Chip.Suffix>
          </Chip>
        </div>
      </div>
    </Content>
  );
};

export const All = AllTemplate.bind({});
All.args = {};
