import { Route, Switch } from "react-router";
import { VisualTestAutocompletePage } from "./VisualTestAutocompletePage";
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
import { VisualTestModalPage } from "./VisualTestModalPage";
import { VisualTestPopoverPage } from "./VisualTestPopoverPage";
import { VisualTestProgressBarPage } from "./VisualTestProgressBarPage";
import { VisualTestRadioGroupPage } from "./VisualTestRadioGroupPage";
import { VisualTestSegmentedControlPage } from "./VisualTestSegmentedControlPage";
import { VisualTestSelectPage } from "./VisualTestSelectPage";
import { VisualTestSideDrawerPage } from "./VisualTestSideDrawerPage";
import { VisualTestSpinnerPage } from "./VisualTestSpinnerPage";
import { VisualTestSwitchPage } from "./VisualTestSwitchPage";
import { VisualTestTablePage } from "./VisualTestTablePage";
import { VisualTestDataTablePage } from "./VisualTestDataTablePage";
import { VisualTestTooltipPage } from "./VisualTestTooltipPage";
import { VisualTestTypographyPage } from "./VisualTestTypographyPage";
import { VisualTestTabsPage } from "./VisualTestTabsPage";
import { VisualTestToastPage } from "./VisualTestToastPage";

export const VisualTestRouter = () => {
  return (
    <Switch>
      <Route
        path="/visual-tests/components"
        exact={true}
        component={VisualTestComponentPage}
      />
      <Route
        path="/visual-tests/layout"
        exact={true}
        component={VisualTestLayoutPage}
      />
      <Route
        path="/visual-tests/modal"
        exact={true}
        component={VisualTestModalPage}
      />
      <Route
        path="/visual-tests/datalist"
        exact={true}
        component={VisualTestDataListPage}
      />
      <Route
        path="/visual-tests/autocomplete"
        exact={true}
        component={VisualTestAutocompletePage}
      />
      <Route
        path="/visual-tests/chip"
        exact={true}
        component={VisualTestChipPage}
      />
      <Route
        path="/visual-tests/chips"
        exact={true}
        component={VisualTestChipsPage}
      />
      <Route
        path="/visual-tests/combobox"
        exact={true}
        component={VisualTestComboboxPage}
      />
      <Route
        path="/visual-tests/datepicker"
        exact={true}
        component={VisualTestDatePickerPage}
      />
      <Route
        path="/visual-tests/description-list"
        exact={true}
        component={VisualTestDescriptionListPage}
      />
      <Route
        path="/visual-tests/disclosure"
        exact={true}
        component={VisualTestDisclosurePage}
      />
      <Route
        path="/visual-tests/divider"
        exact={true}
        component={VisualTestDividerPage}
      />
      <Route
        path="/visual-tests/emphasis"
        exact={true}
        component={VisualTestEmphasisPage}
      />
      <Route
        path="/visual-tests/drawer"
        exact={true}
        component={VisualTestDrawerPage}
      />
      <Route
        path="/visual-tests/feature-switch"
        exact={true}
        component={VisualTestFeatureSwitchPage}
      />
      <Route
        path="/visual-tests/form-field"
        exact={true}
        component={VisualTestFormFieldPage}
      />
      <Route
        path="/visual-tests/gallery"
        exact={true}
        component={VisualTestGalleryPage}
      />
      <Route
        path="/visual-tests/glimmer"
        exact={true}
        component={VisualTestGlimmerPage}
      />
      <Route
        path="/visual-tests/grid"
        exact={true}
        component={VisualTestGridPage}
      />
      <Route
        path="/visual-tests/heading"
        exact={true}
        component={VisualTestHeadingPage}
      />
      <Route
        path="/visual-tests/icon"
        exact={true}
        component={VisualTestIconPage}
      />
      <Route
        path="/visual-tests/inline-label"
        exact={true}
        component={VisualTestInlineLabelPage}
      />
      <Route
        path="/visual-tests/input-date"
        exact={true}
        component={VisualTestInputDatePage}
      />
      <Route
        path="/visual-tests/input-email"
        exact={true}
        component={VisualTestInputEmailPage}
      />
      <Route
        path="/visual-tests/input-file"
        exact={true}
        component={VisualTestInputFilePage}
      />
      <Route
        path="/visual-tests/input-group"
        exact={true}
        component={VisualTestInputGroupPage}
      />
      <Route
        path="/visual-tests/input-number"
        exact={true}
        component={VisualTestInputNumberPage}
      />
      <Route
        path="/visual-tests/input-password"
        exact={true}
        component={VisualTestInputPasswordPage}
      />
      <Route
        path="/visual-tests/input-phone-number"
        exact={true}
        component={VisualTestInputPhoneNumberPage}
      />
      <Route
        path="/visual-tests/input-text"
        exact={true}
        component={VisualTestInputTextPage}
      />
      <Route
        path="/visual-tests/input-time"
        exact={true}
        component={VisualTestInputTimePage}
      />
      <Route
        path="/visual-tests/input-validation"
        exact={true}
        component={VisualTestInputValidationPage}
      />
      <Route
        path="/visual-tests/lightbox"
        exact={true}
        component={VisualTestLightBoxPage}
      />
      <Route
        path="/visual-tests/link"
        exact={true}
        component={VisualTestLinkPage}
      />
      <Route
        path="/visual-tests/list"
        exact={true}
        component={VisualTestListPage}
      />
      <Route
        path="/visual-tests/markdown"
        exact={true}
        component={VisualTestMarkdownPage}
      />
      <Route
        path="/visual-tests/menu"
        exact={true}
        component={VisualTestMenuPage}
      />
      <Route
        path="/visual-tests/popover"
        exact={true}
        component={VisualTestPopoverPage}
      />
      <Route
        path="/visual-tests/progress-bar"
        exact={true}
        component={VisualTestProgressBarPage}
      />
      <Route
        path="/visual-tests/radio-group"
        exact={true}
        component={VisualTestRadioGroupPage}
      />
      <Route
        path="/visual-tests/segmented-control"
        exact={true}
        component={VisualTestSegmentedControlPage}
      />
      <Route
        path="/visual-tests/select"
        exact={true}
        component={VisualTestSelectPage}
      />
      <Route
        path="/visual-tests/side-drawer"
        exact={true}
        component={VisualTestSideDrawerPage}
      />
      <Route
        path="/visual-tests/spinner"
        exact={true}
        component={VisualTestSpinnerPage}
      />
      <Route
        path="/visual-tests/switch"
        exact={true}
        component={VisualTestSwitchPage}
      />
      <Route
        path="/visual-tests/table"
        exact={true}
        component={VisualTestTablePage}
      />
      <Route
        path="/visual-tests/data-table"
        exact={true}
        component={VisualTestDataTablePage}
      />
      <Route
        path="/visual-tests/tabs"
        exact={true}
        component={VisualTestTabsPage}
      />
      <Route
        path="/visual-tests/toast"
        exact={true}
        component={VisualTestToastPage}
      />
      <Route
        path="/visual-tests/tooltip"
        exact={true}
        component={VisualTestTooltipPage}
      />
      <Route
        path="/visual-tests/typography"
        exact={true}
        component={VisualTestTypographyPage}
      />
    </Switch>
  );
};
