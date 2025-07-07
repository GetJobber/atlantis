import {
  Box,
  Cluster,
  Container,
  Heading,
  Icon,
  StatusIndicator,
  Text,
  Typography,
} from "@jobber/components";
import {
  BaseMenuOption,
  CustomOptionsMenuProp,
  KeyboardAction,
  getRequestedIndexChange,
  useCustomKeyboardNavigation,
} from "@jobber/components/Autocomplete";
import { useCallbackRef } from "@jobber/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { HomeDepotIcon } from "./HomeDepotIcon";
import styles from "./CustomMenuContent.module.css";

export interface CustomOption {
  value?: number;
  label: string;
  description?: string;
  cost?: number;
  section?: string;
  type?: "switch";
  to?: "default" | "catalog";
}

// eslint-disable-next-line max-statements
export function CustomMenuContent({
  options,
  selectedOption,
  onOptionSelect,
  inputFocused,
  inputRef,
  MenuWrapper,
  handleUpdateOptions,
  menuRef,
}: CustomOptionsMenuProp<CustomOption, CustomOption>) {
  console.log("selectedOption", selectedOption, inputRef);
  // Set to -1 to account for the footer being the first option when options are being initialized
  const INITIAL_HIGHLIGHTED_OPTION_INDEX = 0;
  const [activeView, setActiveView] = useState<"default" | "catalog">(
    "default",
  );
  const [highlightedOptionIndex, setHighlightedOptionIndex] = useState(
    INITIAL_HIGHLIGHTED_OPTION_INDEX,
  );
  // Length of options + 1 to account for the footer
  const maxIndex = options.length - 1;

  // We need to track the footer focus state because it can be focused instead of just the Input
  const [footerFocused, setFooterFocused] = useState(false);
  const footerElement = document.querySelector("#footerElement") as HTMLElement;

  const footerFocusedCallback = useCallbackRef(() => {
    setFooterFocused(true);
  });
  const footerBlurCallback = useCallbackRef(() => {
    setFooterFocused(false);
  });

  useEffect(() => {
    footerElement?.addEventListener("focus", footerFocusedCallback);
    footerElement?.addEventListener("blur", footerBlurCallback);

    return () => {
      footerElement?.removeEventListener("focus", footerFocusedCallback);
      footerElement?.removeEventListener("blur", footerBlurCallback);
    };
  }, [footerElement, footerFocusedCallback, footerBlurCallback]);

  const menuVisible = useMemo(
    () => inputFocused || footerFocused,
    [inputFocused, footerFocused],
  );

  const onRequestHighlightChange = useCallback(
    // eslint-disable-next-line max-statements
    (event: KeyboardEvent, direction: KeyboardAction) => {
      const indexChange = getRequestedIndexChange({
        event,
        options,
        direction,
        highlightedIndex: highlightedOptionIndex,
      });
      const newPreviousIndex = Math.max(
        -1,
        highlightedOptionIndex + indexChange,
      );
      const newNextIndex = Math.min(
        maxIndex,
        highlightedOptionIndex + indexChange,
      );
      if (!menuVisible) return;

      switch (direction) {
        case KeyboardAction.Previous:
          setHighlightedOptionIndex(newPreviousIndex);
          menuRef?.children[newPreviousIndex]?.scrollIntoView?.({
            behavior: "smooth",
          });

          break;
        case KeyboardAction.Next: {
          setHighlightedOptionIndex(newNextIndex);

          if (newNextIndex === highlightedOptionIndex) {
            setHighlightedOptionIndex(-1);
            requestAnimationFrame(() => {
              menuRef?.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            });
          }
          const nextElement = menuRef?.children[newNextIndex];
          const footerHeight = footerElement?.offsetHeight || 0;

          if (nextElement) {
            const rect = nextElement.getBoundingClientRect();
            const menuRect = menuRef.getBoundingClientRect();

            // If element is hidden behind footer
            if (rect.bottom > menuRect.bottom - footerHeight) {
              // Calculate exact scroll position needed
              const scrollOffset =
                rect.bottom - (menuRect.bottom - footerHeight);
              menuRef.scrollTop += scrollOffset;
            } else {
              nextElement.scrollIntoView({
                behavior: "smooth",
              });
            }
          }

          break;
        }

        case KeyboardAction.Select:
          if (highlightedOptionIndex === -1) {
            footerElement?.click();
          } else {
            highlightedOptionIndex !== -1 &&
              onOptionSelect(options[highlightedOptionIndex]);

            menuRef?.children[highlightedOptionIndex]?.scrollIntoView?.({
              behavior: "smooth",
              block: "nearest",
              inline: "start",
            });
          }
          break;
      }
    },
    [highlightedOptionIndex, options, onOptionSelect],
  );
  useCustomKeyboardNavigation({ onRequestHighlightChange });

  function handleButton(
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) {
    e.preventDefault();
    handleUpdateOptions({
      type: "switch",
      to: activeView === "default" ? "catalog" : "default",
    });
    setActiveView(av => {
      const res = av === "default" ? "catalog" : "default";

      return res;
    });
  }

  return (
    <MenuWrapper visible={menuVisible}>
      <button
        id="footerElement"
        type="button"
        className={styles.footerButton}
        onKeyDown={e => {
          if (e.key === "Enter") {
            handleButton(e);
          }
        }}
        onMouseDown={handleButton}
        onClick={handleButton}
      >
        <Container name="autocomplete-header">
          <Cluster justify="space-between">
            <Box
              padding={{
                top: "base",
                bottom: "base",
                left: activeView === "default" ? "base" : "smaller",
                right: "base",
              }}
              width="100%"
            >
              {activeView === "default" && (
                <Cluster justify="space-between">
                  <Heading level={4}>{"My products & services"}</Heading>
                  <Cluster
                    dataAttributes={{
                      "data-button-spot":
                        highlightedOptionIndex == -1 ? "active" : "inactive",
                    }}
                    UNSAFE_className={{ container: styles.headerClick }}
                  >
                    <HomeDepotIcon />
                    <Typography size="large">More</Typography>
                    <Icon name="arrowRight" />
                  </Cluster>
                </Cluster>
              )}
              {activeView === "catalog" && (
                <Cluster autoWidth justify="start">
                  <Cluster
                    UNSAFE_className={{ container: styles.headerClick }}
                    dataAttributes={{
                      "data-button-spot":
                        highlightedOptionIndex == -1 ? "active" : "inactive",
                    }}
                  >
                    <Icon name="arrowLeft" />
                    <HomeDepotIcon />
                    <Heading level={4}>{"The Home Depot"}</Heading>
                  </Cluster>
                </Cluster>
              )}
            </Box>
          </Cluster>
        </Container>
      </button>
      {options.map((option, index) => {
        return (
          <BaseMenuOption
            addSeparators={false}
            isHighlighted={index === highlightedOptionIndex}
            onOptionSelect={onOptionSelect}
            option={option}
            key={option.label}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                paddingTop: option.section ? "var(--space-base)" : "0",
              }}
            >
              <Cluster
                UNSAFE_className={{ container: styles.baseMenuOption }}
                dataAttributes={{ "data-index": `${index}` }}
              >
                <Box width="100%">
                  <div
                    style={{
                      position: "absolute",
                      backgroundColor: "white",
                      width: "calc(100% - 4px)",
                      top: "-25px",
                      left: -8,
                      paddingLeft: "20px",
                    }}
                  >
                    <Text>{option.section}</Text>
                  </div>
                  <Box padding={{ left: "base" }}>
                    <Cluster justify="space-between">
                      <Cluster>
                        {activeView === "catalog" && (
                          <Box>
                            <svg
                              width="48"
                              height="48"
                              viewBox="0 0 48 48"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4 0.5H44C45.933 0.5 47.5 2.067 47.5 4V44C47.5 45.933 45.933 47.5 44 47.5H4C2.067 47.5 0.5 45.933 0.5 44V4C0.5 2.067 2.067 0.5 4 0.5Z"
                                fill="#D3E3CE"
                                stroke="#97C08C"
                              />
                            </svg>
                            {option.cost && option.cost > 100 && (
                              <div
                                style={{
                                  position: "absolute",
                                  bottom: -5,
                                  right: -3,
                                }}
                              >
                                <StatusIndicator status="success" />
                              </div>
                            )}
                          </Box>
                        )}

                        <Box>
                          <Text>{option.label}</Text>
                          <Text>{option.description}</Text>
                        </Box>
                      </Cluster>
                      <Cluster>
                        <Text>
                          {Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(option.cost || 0)}
                        </Text>
                      </Cluster>
                    </Cluster>
                  </Box>
                </Box>
              </Cluster>
            </div>
          </BaseMenuOption>
        );
      })}
    </MenuWrapper>
  );
}
