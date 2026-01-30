import type { ReactElement } from "react";
import { useParams } from "@tanstack/react-router";
import { VisualTestAutocompletePage } from "./VisualTestAutocompletePage";
import { VisualTestCardPage } from "./VisualTestCardPage";
import { VisualTestAutocompleteV2Page } from "./VisualTestAutocompleteV2Page";
import { VisualTestChipPage } from "./VisualTestChipPage";
import { VisualTestChipsPage } from "./VisualTestChipsPage";
import { VisualTestComboboxPage } from "./VisualTestComboboxPage";
import { VisualTestComponentPage } from "./VisualTestComponentPage";
import { VisualTestDataListPage } from "./VisualTestDataListPage";
import { VisualTestDatePickerPage } from "./VisualTestDatePickerPage";
import { VisualTestDescriptionListPage } from "./VisualTestDescriptionListPage";
import { VisualTestDisclosurePage } from "./VisualTestDisclosurePage";
import { VisualTestDividerPage } from "./VisualTestDividerPage";
import { VisualTestDrawerPage } from "./VisualTestDrawerPage";
import { VisualTestEmphasisPage } from "./VisualTestEmphasisPage";
import { VisualTestFeatureSwitchPage } from "./VisualTestFeatureSwitchPage";
import { VisualTestFormFieldPage } from "./VisualTestFormFieldPage";
import { VisualTestGalleryPage } from "./VisualTestGalleryPage";
import { VisualTestGlimmerPage } from "./VisualTestGlimmerPage";
import { VisualTestGridPage } from "./VisualTestGridPage";
import { VisualTestHeadingPage } from "./VisualTestHeadingPage";
import { VisualTestIconPage } from "./VisualTestIconPage";
import { VisualTestInlineLabelPage } from "./VisualTestInlineLabelPage";
import { VisualTestInputDatePage } from "./VisualTestInputDatePage";
import { VisualTestInputEmailPage } from "./VisualTestInputEmailPage";
import { VisualTestInputFilePage } from "./VisualTestInputFilePage";
import { VisualTestInputGroupPage } from "./VisualTestInputGroupPage";
import { VisualTestInputNumberPage } from "./VisualTestInputNumberPage";
import { VisualTestInputPasswordPage } from "./VisualTestInputPasswordPage";
import { VisualTestInputPhoneNumberPage } from "./VisualTestInputPhoneNumberPage";
import { VisualTestInputTextPage } from "./VisualTestInputTextPage";
import { VisualTestInputTimePage } from "./VisualTestInputTimePage";
import { VisualTestInputValidationPage } from "./VisualTestInputValidationPage";
import { VisualTestLayoutPage } from "./VisualTestLayoutPage";
import { VisualTestLightBoxPage } from "./VisualTestLightBoxPage";
import { VisualTestLinkPage } from "./VisualTestLinkPage";
import { VisualTestListPage } from "./VisualTestListPage";
import { VisualTestMarkdownPage } from "./VisualTestMarkdownPage";
import { VisualTestMenuPage } from "./VisualTestMenuPage";
import {
  VisualTestMenuSmallPage,
  VisualTestMenuSmallStickyPage,
} from "./VisualTestMenuSmallPage";
import { VisualTestModalPage } from "./VisualTestModalPage";
import { VisualTestPopoverPage } from "./VisualTestPopoverPage";
import { VisualTestProgressBarPage } from "./VisualTestProgressBarPage";
import { VisualTestRadioGroupPage } from "./VisualTestRadioGroupPage";
import { VisualTestSegmentedControlPage } from "./VisualTestSegmentedControlPage";
import { VisualTestSelectPage } from "./VisualTestSelectPage";
import { VisualTestSelectV2Page } from "./VisualTestSelectV2Page";
import { VisualTestSideDrawerPage } from "./VisualTestSideDrawerPage";
import { VisualTestSpinnerPage } from "./VisualTestSpinnerPage";
import { VisualTestSwitchPage } from "./VisualTestSwitchPage";
import { VisualTestTablePage } from "./VisualTestTablePage";
import { VisualTestDataTablePage } from "./VisualTestDataTablePage";
import { VisualTestDataTableAtomsPage } from "./VisualTestDataTableAtomsPage";
import { VisualTestTooltipPage } from "./VisualTestTooltipPage";
import { VisualTestTypographyPage } from "./VisualTestTypographyPage";
import { VisualTestTabsPage } from "./VisualTestTabsPage";
import { VisualTestToastPage } from "./VisualTestToastPage";
import { VisualTestBannerPage } from "./VisualTestBannerPage";
import { VisualTestThemePage } from "./VisualTestThemePage";

const visualTestPages: Record<string, () => ReactElement> = {
  components: VisualTestComponentPage,
  layout: VisualTestLayoutPage,
  modal: VisualTestModalPage,
  datalist: VisualTestDataListPage,
  autocomplete: VisualTestAutocompletePage,
  "autocomplete-v2": VisualTestAutocompleteV2Page,
  banner: VisualTestBannerPage,
  card: VisualTestCardPage,
  chip: VisualTestChipPage,
  chips: VisualTestChipsPage,
  combobox: VisualTestComboboxPage,
  "date-picker": VisualTestDatePickerPage,
  "description-list": VisualTestDescriptionListPage,
  disclosure: VisualTestDisclosurePage,
  divider: VisualTestDividerPage,
  drawer: VisualTestDrawerPage,
  emphasis: VisualTestEmphasisPage,
  "feature-switch": VisualTestFeatureSwitchPage,
  "form-field": VisualTestFormFieldPage,
  gallery: VisualTestGalleryPage,
  glimmer: VisualTestGlimmerPage,
  grid: VisualTestGridPage,
  heading: VisualTestHeadingPage,
  icon: VisualTestIconPage,
  "inline-label": VisualTestInlineLabelPage,
  "input-date": VisualTestInputDatePage,
  "input-email": VisualTestInputEmailPage,
  "input-file": VisualTestInputFilePage,
  "input-group": VisualTestInputGroupPage,
  "input-number": VisualTestInputNumberPage,
  "input-password": VisualTestInputPasswordPage,
  "input-phone-number": VisualTestInputPhoneNumberPage,
  "input-text": VisualTestInputTextPage,
  "input-time": VisualTestInputTimePage,
  "input-validation": VisualTestInputValidationPage,
  lightbox: VisualTestLightBoxPage,
  link: VisualTestLinkPage,
  list: VisualTestListPage,
  markdown: VisualTestMarkdownPage,
  menu: VisualTestMenuPage,
  "menu-small": VisualTestMenuSmallPage,
  "menu-small-sticky": VisualTestMenuSmallStickyPage,
  popover: VisualTestPopoverPage,
  "progress-bar": VisualTestProgressBarPage,
  "radio-group": VisualTestRadioGroupPage,
  "segmented-control": VisualTestSegmentedControlPage,
  select: VisualTestSelectPage,
  "select-v2": VisualTestSelectV2Page,
  "side-drawer": VisualTestSideDrawerPage,
  spinner: VisualTestSpinnerPage,
  switch: VisualTestSwitchPage,
  table: VisualTestTablePage,
  "data-table": VisualTestDataTablePage,
  "data-table-atoms": VisualTestDataTableAtomsPage,
  tabs: VisualTestTabsPage,
  toast: VisualTestToastPage,
  tooltip: VisualTestTooltipPage,
  typography: VisualTestTypographyPage,
  theme: VisualTestThemePage,
};

export const VisualTestRouter = () => {
  const { path } = useParams({ from: "/visual-tests/$path" });
  const PageComponent = path ? visualTestPages[path] : null;

  return PageComponent ? <PageComponent /> : <VisualTestLinkPage />;
};
