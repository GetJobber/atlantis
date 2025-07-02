import {
  AnyOption,
  GroupOption,
  Option,
  useKeyboardNavigation,
} from "@jobber/components/Autocomplete";
import { RefObject, useState } from "react";
import { InputTextRef } from "@jobber/components/InputText";
import {
  Box,
  Cluster,
  Container,
  Divider,
  Glimmer,
  Heading,
  Icon,
  Stack,
  Text,
  Typography,
} from "@jobber/components";
import styles from "./CatalogItem.module.css";
import { HomeDepotIcon } from "./HomeDepotIcon";

export function CatalogItems({
  MenuWrapper,
  inputFocused,
  onOptionSelect,
  options,
  menuRef,
}: CatalogItemsProps) {
  const [activeView, setActiveView] = useState("default");

  const { highlightedIndex } = useKeyboardNavigation({
    visible: inputFocused,
    options,
    onOptionSelect: onOptionSelect as (option?: Option) => void,
    menuRef,
  });

  return (
    <MenuWrapper visible={inputFocused}>
      <Box>
        {activeView == "default" && (
          <Box>
            <Cluster justify="space-between">
              <Box padding="base">
                <Heading level={4}>My products & services</Heading>
              </Box>
              <button
                type="button"
                className={styles.catalogItemButton}
                onMouseDown={e => {
                  e.preventDefault();
                  setActiveView("catalog");
                }}
              >
                <Cluster gap="small">
                  <Typography size="large">More</Typography>
                  <HomeDepotIcon />
                  <Icon name="arrowRight" />
                </Cluster>
              </button>
            </Cluster>
            <Divider />
            {(!options || options?.length === 0) && (
              <Box width={900}>
                <Cluster justify="space-between">
                  <Box width={300}>
                    <Stack gap="small" autoWidth>
                      <Glimmer></Glimmer>
                      <Glimmer></Glimmer>
                    </Stack>
                  </Box>
                  <Box width={500}>
                    <Cluster>
                      <Glimmer></Glimmer>
                      <Glimmer></Glimmer>
                    </Cluster>
                  </Box>
                </Cluster>
              </Box>
            )}
            {options.map((option, index) => {
              const isHighlighted = index === highlightedIndex;

              return (
                <Container
                  name="catalog-items"
                  className={[
                    styles.catalogItems,
                    isHighlighted && styles.catalogItemHighlighted,
                  ].join(" ")}
                  key={index}
                >
                  <Box>
                    <Box padding={{ top: "base", left: "base", right: "base" }}>
                      <Text size="large">{option.label}</Text>
                    </Box>

                    {(option as CatalogOption).entries?.map(entry => {
                      return (
                        <Container.Apply
                          key={entry.id}
                          className={styles.catalogItem}
                        >
                          <button
                            type="button"
                            onMouseDown={e => {
                              e.preventDefault();
                              onOptionSelect(entry as unknown as Option);
                            }}
                            style={{
                              backgroundColor: "transparent",
                              border: "0",
                              width: "100%",
                              textAlign: "left",
                            }}
                          >
                            <Box
                              padding={{
                                top: "small",
                                bottom: "small",
                                left: "base",
                                right: "base",
                              }}
                            >
                              <Cluster justify="space-between">
                                <Stack gap="small" autoWidth>
                                  <Text>{entry.name}</Text>
                                  <Text>{entry.description}</Text>
                                </Stack>
                                <Cluster>
                                  <Text size="large">
                                    {Intl.NumberFormat("en-US", {
                                      style: "currency",
                                      currency: "USD",
                                    }).format(Number(entry.price))}
                                  </Text>
                                </Cluster>
                              </Cluster>
                            </Box>
                          </button>
                        </Container.Apply>
                      );
                    })}
                  </Box>
                </Container>
              );
            })}
          </Box>
        )}
        {activeView === "catalog" && (
          <div>
            <button
              className={styles.catalogItemButton}
              type="button"
              onMouseDown={e => {
                e.preventDefault();
                setActiveView("default");
              }}
            >
              <Cluster>
                <Icon name="arrowLeft" />
                <HomeDepotIcon />
                <Heading level={4}>The Home Depot</Heading>
              </Cluster>
            </button>
          </div>
        )}
      </Box>
    </MenuWrapper>
  );
}
export type OptionInGroup<T extends AnyOption> = T extends GroupOption
  ? T["options"][number]
  : T;

type CatalogOptionValue = string;

export interface CatalogOption {
  value: CatalogOptionValue;
  entries?: Array<CatalogOptionEntry>;
  label: string;
  details?: string;
}

interface CatalogOptionEntry {
  id: string;
  name: string;
  description: string;
  price: string;
}

export interface CatalogItemsProps<
  GenericOption extends AnyOption = AnyOption,
  GenericOptionValue extends Option = Option,
> {
  /**
   * The options to display in the menu
   */
  readonly options: Array<OptionInGroup<CatalogOption> | GenericOption>;
  /**
   * The currently selected option
   */
  readonly selectedOption?: GenericOptionValue;
  /**
   * The HTML element that wraps the menu content. Used for handling keyboard scroll behavior.
   */
  readonly menuRef: HTMLElement | null | undefined;
  /**
   * Callback to select an option
   */
  readonly onOptionSelect: (chosenOption?: GenericOptionValue) => void;
  /**
   * Determine if the input is focused. Can be used to conditionally render the menu.
   */
  readonly inputFocused: boolean;
  /**
   * Ref to the TextInput element.
   */
  readonly inputRef: RefObject<InputTextRef | null>;
  /**
   * Component that wraps the menu content. Used for handling keyboard scroll behavior.
   */
  readonly MenuWrapper: (props: {
    children: React.ReactNode;
    visible: boolean;
  }) => React.ReactElement;
}
