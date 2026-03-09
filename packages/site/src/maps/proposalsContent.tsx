import { ContentMapItems } from "../types/maps";
import ProposalAvatarComponent from "../content/guides/proposals/Avatar/README.md";
import ProposalBannerModsComponent from "../content/guides/proposals/BANNER_MODS.md";
import ProposalDisclosureComponent from "../content/guides/proposals/Disclosure/README.md";
import ProposalDrawerComponent from "../content/guides/proposals/Drawer/README.md";
import ProposalInputColorComponent from "../content/guides/proposals/InputColor/README.md";
import ProposalInputDateComponent from "../content/guides/proposals/InputDate.md";
import ProposalInputEmailComponent from "../content/guides/proposals/InputEmail/InputEmail.md";
import ProposalListPageComponent from "../content/guides/proposals/ListPage.md";
import ProposalMultiSelectComponent from "../content/guides/proposals/MultiSelect/MultiSelect.md";
import ProposalOptionListComponent from "../content/guides/proposals/OptionList/README.md";
import ProposalTextModsComponent from "../content/guides/proposals/Text/Text_Mods.md";
import ProposalRevealComponent from "../content/guides/proposals/reveal/README.md";

export const proposalsContentMap: ContentMapItems = {
  avatar: {
    intro: "Proposal: Avatar",
    title: "Proposal: Avatar",
    content: () => <ProposalAvatarComponent />,
  },
  "banner-mods": {
    intro: "Proposal: Banner mods",
    title: "Proposal: Banner mods",
    content: () => <ProposalBannerModsComponent />,
  },
  disclosure: {
    intro: "Proposal: Disclosure",
    title: "Proposal: Disclosure",
    content: () => <ProposalDisclosureComponent />,
  },
  drawer: {
    intro: "Proposal: Drawer",
    title: "Proposal: Drawer",
    content: () => <ProposalDrawerComponent />,
  },
  "input-color": {
    intro: "Proposal: Input color",
    title: "Proposal: Input color",
    content: () => <ProposalInputColorComponent />,
  },
  "input-date": {
    intro: "Proposal: Input date",
    title: "Proposal: Input date",
    content: () => <ProposalInputDateComponent />,
  },
  "input-email": {
    intro: "Proposal: Input email",
    title: "Proposal: Input email",
    content: () => <ProposalInputEmailComponent />,
  },
  "list-page": {
    intro: "Proposal: List page",
    title: "Proposal: List page",
    content: () => <ProposalListPageComponent />,
  },
  "multi-select": {
    intro: "Proposal: MultiSelect",
    title: "Proposal: MultiSelect",
    content: () => <ProposalMultiSelectComponent />,
  },
  "option-list": {
    intro: "Proposal: Option list",
    title: "Proposal: Option list",
    content: () => <ProposalOptionListComponent />,
  },
  "text-mods": {
    intro: "Proposal: Text mods",
    title: "Proposal: Text mods",
    content: () => <ProposalTextModsComponent />,
  },
  reveal: {
    intro: "Proposal: Reveal",
    title: "Proposal: Reveal",
    content: () => <ProposalRevealComponent />,
  },
};
