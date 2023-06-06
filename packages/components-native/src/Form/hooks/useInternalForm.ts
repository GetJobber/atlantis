import { MutableRefObject, RefObject } from "react";
import {
  FieldValues,
  UseFormHandleSubmit,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { InternalFormProps } from "../types";
import { useAtlantisContext } from "../../AtlantisContext";
import { LocalCacheKeys } from "../../hooks/useLocalCache";

type UseInternalFormProps<T extends FieldValues, SubmitResponseType> = Pick<
  InternalFormProps<T, SubmitResponseType>,
  | "mode"
  | "reValidateMode"
  | "initialValues"
  | "formRef"
  | "localCacheKey"
  | "localCacheExclude"
  | "localCacheId"
> & {
  scrollViewRef?: RefObject<KeyboardAwareScrollView>;
  readonly saveButtonHeight: number;
  readonly messageBannerHeight: number;
};

interface UseInternalForm<T extends FieldValues> {
  readonly formMethods: UseFormReturn<T>;
  readonly handleSubmit: UseFormHandleSubmit<T>;
  readonly isSubmitting: boolean;
  readonly isDirty: boolean;
  readonly removeListenerRef: MutableRefObject<() => void>;
  readonly setLocalCache: Pick<
    UseLocalCacheShape,
    "setLocalCache"
  >["setLocalCache"];
}

export function useInternalForm<T extends FieldValues, SubmitResponseType>({
  mode,
  reValidateMode,
  initialValues,
  formRef,
  localCacheKey,
  localCacheId,
  scrollViewRef,
  saveButtonHeight,
  messageBannerHeight,
}: UseInternalFormProps<T, SubmitResponseType>): UseInternalForm<T> {
  const formMethods = useForm<T>({
    mode,
    reValidateMode,
    defaultValues: initialValues,
    shouldFocusError: false,
  });

  const { isOnline } = useAtlantisContext();

  const clientSideSaveOn =
    localCacheKey && localCacheKey !== LocalCacheKeys.INVALID;

  const { setLocalCache, removeLocalCache } = useInternalFormLocalCache(
    formMethods,
    localCacheKey,
    { id: localCacheId },
  );

  return { formMethods, setLocalCache };
}
