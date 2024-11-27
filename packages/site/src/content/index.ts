import AnimatedPresenceContent from "./AnimatedPresence";
import AnimatedSwitcherContent from "./AnimatedSwitcher";
import AutoCompleteContent from "./Autocomplete";
import BannerContent from "./Banner";
import ButtonContent from "./Button";
import ButtonDismissContent from "./ButtonDismiss";
import CardContent from "./Card";
import ChipContent from "./Chip";
import ChipsContent from "./Chips";
import CheckboxContent from "./Checkbox";
import CountdownContent from "./Countdown";
import DisclosureContent from "./Disclosure";
import EmphasisContent from "./Emphasis";
import HeadingContent from "./Heading";
import IconContent from "./Icon";
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
  Card: {
    ...CardContent,
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
  Icon: {
    ...IconContent,
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
