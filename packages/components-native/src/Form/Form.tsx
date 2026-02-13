import React, { useCallback, useEffect, useState } from "react";
import type { FieldValues } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import {
  KeyboardAwareScrollView,
  KeyboardEvents,
} from "react-native-keyboard-controller";
import type { KeyboardEventData } from "react-native-keyboard-controller";
import type { LayoutChangeEvent } from "react-native";
import { Keyboard, Platform, View, findNodeHandle } from "react-native";
import { useStyles } from "./Form.style";
import { FormErrorBanner } from "./components/FormErrorBanner";
import { KEYBOARD_SAVE_BUTTON_DISTANCE } from "./constants";
import { FormMessageBanner } from "./components/FormMessageBanner";
import type {
  FormErrors,
  FormProps,
  FormValues,
  InternalFormProps,
} from "./types";
import { FormSubmitErrorType } from "./types";
import { FormMask } from "./components/FormMask";
import { useInternalForm } from "./hooks/useInternalForm";
import { useFormViewRefs } from "./hooks/useFormViewRefs";
import { useScreenInformation } from "./hooks/useScreenInformation";
import { FormMessage } from "./components/FormMessage";
import { FormBody, useBottomPadding } from "./components/FormBody";
import { useOfflineHandler } from "./hooks/useOfflineHandler";
import { useScrollToError } from "./hooks/useScrollToError";
import { FormSaveButton } from "./components/FormSaveButton";
import { useSaveButtonPosition } from "./hooks/useSaveButtonPosition";
import { FormCache } from "./components/FormCache/FormCache";
import { useAtlantisFormContext } from "./context/AtlantisFormContext";
import { IOSKeyboardAwareScrollViewSpacer } from "./components/IOSKeyboardAwareScrollViewSpacer/IOSKeyboardAwareScrollViewSpacer";
import { InputAccessoriesProvider } from "../InputText";
import { tokens } from "../utils/design";
import { ErrorMessageProvider } from "../ErrorMessageWrapper";

export function Form<T extends FieldValues, S>({
  initialLoading,
  ...rest
}: FormProps<T, S>) {
  const child = initialLoading ? <FormMask /> : <InternalForm {...rest} />;

  return (
    <InputAccessoriesProvider>
      <ErrorMessageProvider>{child}</ErrorMessageProvider>
    </InputAccessoriesProvider>
  );
}

// eslint-disable-next-line max-statements
function InternalForm<T extends FieldValues, S>({
  children,
  onBeforeSubmit,
  onSubmit,
  onSubmitError,
  onSubmitSuccess,
  bannerErrors,
  bannerMessages,
  initialValues,
  mode = "onTouched",
  reValidateMode = "onChange",
  formRef,
  saveButtonLabel,
  renderStickySection,
  localCacheKey,
  localCacheExclude,
  localCacheId,
  secondaryActions,
  saveButtonOffset,
  showStickySaveButton = false,
  disableKeyboardAwareScroll = false,
  renderFooter,
  UNSAFE_allowDiscardLocalCacheWhenOffline,
}: InternalFormProps<T, S>) {
  const { scrollViewRef, bottomViewRef, scrollToTop } = useFormViewRefs();
  const [saveButtonHeight, setSaveButtonHeight] = useState(0);
  const [messageBannerHeight, setMessageBannerHeight] = useState(0);
  const {
    formMethods,
    handleSubmit,
    isSubmitting,
    removeListenerRef,
    setLocalCache,
  } = useInternalForm<T, S>({
    mode,
    reValidateMode,
    initialValues,
    formRef,
    localCacheKey,
    localCacheExclude,
    localCacheId,
    scrollViewRef,
    saveButtonHeight,
    messageBannerHeight,
    UNSAFE_allowDiscardLocalCacheWhenOffline,
  });
  const { windowHeight, headerHeight } = useScreenInformation();
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [keyboardScreenY, setKeyboardScreenY] = useState(0);
  const [formContentHeight, setFormContentHeight] = useState(0);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const paddingBottom = useBottomPadding();

  const { saveButtonPosition } = useSaveButtonPosition({
    formContentHeight,
    isBottomSheetOpen,
    showStickySaveButton,
    keyboardHeight,
    keyboardScreenY,
  });

  const [isSecondaryActionLoading, setIsSecondaryActionLoading] =
    useState<boolean>(false);

  const extraViewHeight = paddingBottom + KEYBOARD_SAVE_BUTTON_DISTANCE;
  const calculatedKeyboardHeight = keyboardHeight - extraViewHeight;

  useScrollToError({
    formState: formMethods.formState,
    refNode: findNodeHandle(scrollViewRef.current),
    setFocus: formMethods.setFocus,
    scrollTo: scrollViewRef.current?.scrollTo,
  });

  const handleOfflineSubmit = useOfflineHandler();

  const handleKeyboardShow = useCallback(
    (event: KeyboardEventData) => {
      setKeyboardHeight(event.height);
      setKeyboardScreenY(windowHeight - event.height);
    },
    [windowHeight],
  );

  const handleKeyboardHide = useCallback(() => {
    bottomViewRef?.current?.measureInWindow(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (_x: number, y: number, _width: number, _height: number) => {
        // This fixes extra whitespace below the form if it was scrolled down while the keyboard was open
        // i.e. a View below the form is higher than the bottom of the window
        if (y < windowHeight) {
          scrollViewRef?.current?.scrollToEnd();
        }
      },
    );
    setKeyboardHeight(0);
    setKeyboardScreenY(0);
  }, [bottomViewRef, scrollViewRef, windowHeight]);

  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showListener = KeyboardEvents.addListener(
      showEvent,
      handleKeyboardShow,
    );
    const hideListener = KeyboardEvents.addListener(
      hideEvent,
      handleKeyboardHide,
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, [handleKeyboardHide, handleKeyboardShow]);

  const onLayout = (event: LayoutChangeEvent) => {
    setMessageBannerHeight(event.nativeEvent.layout.height);
  };

  const styles = useStyles();

  const { edgeToEdgeEnabled } = useAtlantisFormContext();

  return (
    <FormProvider {...formMethods}>
      <>
        {(isSubmitting || isSecondaryActionLoading) && <FormMask />}

        {/* FormCache isolates watching entire form value changes to only this component */}
        <FormCache
          localCacheKey={localCacheKey}
          localCacheExclude={localCacheExclude}
          setLocalCache={setLocalCache}
        />

        <FormBody
          keyboardHeight={calculateSaveButtonOffset()}
          submit={handleSubmit(internalSubmit)}
          isFormSubmitting={isSubmitting}
          saveButtonLabel={saveButtonLabel}
          shouldRenderActionBar={saveButtonPosition === "sticky"}
          renderStickySection={renderStickySection}
          secondaryActions={secondaryActions}
          setSecondaryActionLoading={setIsSecondaryActionLoading}
          setSaveButtonHeight={setSaveButtonHeight}
          saveButtonOffset={saveButtonOffset}
        >
          <KeyboardAwareScrollView
            disableScrollOnKeyboardHide={true}
            enabled={!disableKeyboardAwareScroll}
            keyboardShouldPersistTaps={"handled"}
            ref={scrollViewRef}
            bottomOffset={headerHeight}
            extraKeyboardSpace={edgeToEdgeEnabled ? tokens["space-large"] : 0}
            contentContainerStyle={
              !keyboardHeight && styles.scrollContentContainer
            }
          >
            <View
              onLayout={({ nativeEvent }) => {
                setFormContentHeight(nativeEvent.layout.height);
              }}
            >
              <View onLayout={onLayout}>
                <FormMessageBanner bannerMessages={bannerMessages} />
                <FormErrorBanner
                  networkError={bannerErrors?.networkError}
                  bannerError={bannerErrors?.bannerError}
                />
              </View>
              <View style={styles.formChildContainer}>
                <>
                  <View style={styles.formContent}>{children}</View>
                  {saveButtonPosition === "inline" && (
                    <View style={styles.fixedSaveButton}>
                      {renderStickySection ? (
                        renderStickySection(
                          handleSubmit(internalSubmit),
                          saveButtonLabel,
                          isSubmitting,
                        )
                      ) : (
                        <FormSaveButton
                          primaryAction={handleSubmit(internalSubmit)}
                          label={saveButtonLabel}
                          loading={isSubmitting}
                          secondaryActions={secondaryActions}
                          setSecondaryActionLoading={
                            setIsSecondaryActionLoading
                          }
                          onOpenBottomSheet={() => setIsBottomSheetOpen(true)}
                          onCloseBottomSheet={() => setIsBottomSheetOpen(false)}
                        />
                      )}
                      {disableKeyboardAwareScroll && (
                        <IOSKeyboardAwareScrollViewSpacer />
                      )}
                    </View>
                  )}
                  {renderFooter}
                </>
              </View>
            </View>
            <View style={styles.safeArea} ref={bottomViewRef} />
          </KeyboardAwareScrollView>
        </FormBody>
      </>
      <FormMessage />
    </FormProvider>
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function internalSubmit(data: FormValues<T>) {
    let performSubmit = true;

    if (onBeforeSubmit) {
      performSubmit = await onBeforeSubmit(data);
    }

    if (performSubmit) {
      Keyboard.dismiss();

      return onSubmit(data)
        .then((result: S) => {
          removeListenerRef.current?.();
          onSubmitSuccess(result);
        })
        .catch(handleSubmitCatch);
    }
  }

  function handleSubmitCatch(error: FormErrors) {
    // Scroll to top of form to see error
    scrollToTop();
    onSubmitError(error);

    if (error?.errorType === FormSubmitErrorType.NetworkError) {
      // @ts-expect-error We are making the form submission fail so that we can
      // prevent the isSubmitSuccess to be true
      formMethods.setError("offline", "Error saving form.");

      handleOfflineSubmit(handleRetry, clearFormErrors)();
    }
  }

  function clearFormErrors() {
    // @ts-expect-error  We are clearing the error that we previously set
    // when the form had no internet connection
    formMethods.clearErrors("offline");
  }

  function handleRetry() {
    clearFormErrors();

    return handleSubmit(internalSubmit)();
  }

  function calculateSaveButtonOffset() {
    if (saveButtonOffset) {
      // Included the space-base because it's the padding of the FormActionBar
      return calculatedKeyboardHeight - saveButtonOffset + tokens["space-base"];
    }

    return calculatedKeyboardHeight;
  }
}
