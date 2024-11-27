import AnimatedPresenceContent from "./AnimatedPresence";
import AnimatedSwitcherContent from "./AnimatedSwitcher";
import AutoCompleteContent from "./Autocomplete";
import BannerContent from "./Banner";
import ButtonContent from "./Button";
import ButtonDismissContent from "./ButtonDismiss";
import CheckboxContent from "./Checkbox";
import ChipContent from "./Chip";
import ChipsContent from "./Chips";
import CountdownContent from "./Countdown";
import DisclosureContent from "./Disclosure";
import EmphasisContent from "./Emphasis";
import HeadingContent from "./Heading";
import InlineLabelContent from "./InlineLabel";
import LinkContent from "./Link";
import StatusLabelContent from "./StatusLabel";
import SwitchContent from "./Switch";

import { ContentExport } from "../types/content";

export const SiteContent: Record<string, ContentExport> = {
  AnimatedPresence: {
    ...AnimatedPresenceContent,
  },
  AnimatedSwitcher: {
    ...AnimatedSwitcherContent,
  },
  Autocomplete: {
    ...AutoCompleteContent,
  },
  Banner: {
    ...BannerContent,
  },
  Button: {
    ...ButtonContent,
  },
  ButtonDismiss: {
    ...ButtonDismissContent,
  },
  Checkbox: {
    ...CheckboxContent,
  },
  Chip: {
    ...ChipContent,
  },
  Chips: {
    ...ChipsContent,
  },
  Countdown: {
    ...CountdownContent,
  },
  Disclosure: {
    ...DisclosureContent,
  },
  Emphasis: {
    ...EmphasisContent,
  },
  Heading: {
    ...HeadingContent,
  },
  InlineLabel: {
    ...InlineLabelContent,
  },
  Link: {
    ...LinkContent,
  },
  StatusLabel: {
    ...StatusLabelContent,
  },
  Switch: {
    ...SwitchContent,
  },

};
