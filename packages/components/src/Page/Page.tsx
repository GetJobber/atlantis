import type { ReactNode } from "react";
import React, { useState } from "react";
import classnames from "classnames";
import type { XOR } from "ts-xor";
import {
  Breakpoints,
  useResizeObserver,
} from "@jobber/hooks/useResizeObserver";
import styles from "./Page.module.css";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { Content } from "../Content";
import { Markdown } from "../Markdown";
import { Button, type ButtonProps } from "../Button";
import { Menu, type SectionProps } from "../Menu";
import { Emphasis } from "../Emphasis";
import { Autocomplete } from "../Autocomplete";
import type { OptionLike } from "../Autocomplete/Autocomplete.types";
import { InputText } from "../InputText";

export type ButtonActionProps = ButtonProps & {
  ref?: React.RefObject<HTMLDivElement>;
};

interface PageFoundationProps {
  readonly children: ReactNode | ReactNode[];

  /**
   * Title of the page.
   *
   * Supports any React node. If a string is provided, it will be rendered as an H1 heading.
   * Otherwise it will be rendered as is.
   *
   * **Important**: If you're passing a custom element, it must include an H1-level heading within it.
   * Ideally <Heading level={1}> should be used here.
   */
  readonly title: ReactNode;

  /**
   * TitleMetaData component to be displayed
   * next to the title. Only compatible with string titles.
   */
  readonly titleMetaData?: ReactNode;

  /**
   * Subtitle of the page.
   */
  readonly subtitle?: string;

  /**
   * Determines the width of the page.
   *
   * Fill makes the width grow to 100%.
   *
   * Standard caps out at 1280px.
   *
   * Narrow caps out at 1024px.
   *
   * @default standard
   */
  readonly width?: "fill" | "standard" | "narrow";

  /**
   * Page title primary action button settings.
   */
  readonly primaryAction?: ButtonActionProps;

  /**
   * Page title secondary action button settings.
   */
  readonly secondaryAction?: ButtonActionProps;

  /**
   * Page title Action menu.
   */
  readonly moreActionsMenu?: SectionProps[];
}

interface PageWithIntroProps extends PageFoundationProps {
  /**
   * Content of the page. This supports basic markdown node types
   * such as `_italic_`, `**bold**`, and `[link name](url)`.
   */
  readonly intro: string;

  /**
   * Causes any markdown links in the `intro` prop to open in a new
   * tab, i.e. with `target="_blank"`.
   *
   * Can only be used if `intro` prop is also specified.
   *
   * Defaults to `false`.
   */
  readonly externalIntroLinks?: boolean;
}

export type PageProps = XOR<PageFoundationProps, PageWithIntroProps>;

export function Page({
  title,
  titleMetaData,
  intro,
  externalIntroLinks,
  subtitle,
  children,
  width = "standard",
  primaryAction,
  secondaryAction,
  moreActionsMenu = [],
}: PageProps) {
  const pageStyles = classnames(styles.page, styles[width]);
  const [titleBarRef, { width: titleBarWidth = Breakpoints.large }] =
    useResizeObserver<HTMLDivElement>();

  const titleBarClasses = classnames(styles.titleBar, {
    [styles.small]: titleBarWidth > Breakpoints.smaller,
    [styles.medium]: titleBarWidth > Breakpoints.small,
    [styles.large]: titleBarWidth > Breakpoints.base,
  });

  const showMenu = moreActionsMenu.length > 0;
  const showActionGroup = showMenu || primaryAction || secondaryAction;

  if (primaryAction != undefined) {
    primaryAction = Object.assign({ fullWidth: true }, primaryAction);
  }

  if (secondaryAction != undefined) {
    secondaryAction = Object.assign(
      { type: "secondary", fullWidth: true },
      secondaryAction,
    );
  }

  if (secondaryAction != undefined) {
    secondaryAction = Object.assign(
      { type: "secondary", fullWidth: true },
      secondaryAction,
    );
  }

  interface Animal extends OptionLike {
    value: string;
    description?: string;
    id: number;
  }

  const animals: Animal[] = [
    {
      id: 2,
      label: "Cat",
      value: "cat",
      description: "A cat is a small animal",
    },
    {
      id: 3,
      label: "Dog",
      value: "dog",
      description: "A dog is a small animal",
    },
    {
      id: 4,
      label: "Bird",
      value: "bird",
      description: "A bird is a small animal",
    },
    {
      id: 5,
      label: "Fish",
      value: "fish",
      description: "A fish is a small animal",
    },
    {
      id: 6,
      label: "Horse",
      value: "horse",
      description: "A horse is a small animal",
    },
    {
      id: 7,
      label: "Rabbit",
      value: "rabbit",
      description: "A rabbit is a small animal",
    },
    {
      id: 8,
      label: "Snake",
      value: "snake",
      description: "A snake is a small animal",
    },
    {
      id: 9,
      label: "Tiger",
      value: "tiger",
      description: "A tiger is a small animal",
    },
  ];

  const simpleOptions: OptionLike[] = [
    { label: "One" },
    { label: "Two" },
    { label: "Three" },
  ];

  interface ComplexOption extends OptionLike {
    complex: boolean;
    id: number;
  }

  const complexOptions: ComplexOption[] = [
    { id: 1, label: "One", complex: true },
    { id: 2, label: "Two", complex: true },
    { id: 3, label: "Three", complex: true },
  ];

  const [animalValue, setAnimalValue] = useState<Animal | undefined>(undefined);
  const [f1Input, setF1Input] = useState("");
  const [defaultValue, setDefaultValue] = useState<OptionLike | undefined>(
    undefined,
  );
  const [f2Input, setF2Input] = useState("");
  const [complexValue, setComplexValue] = useState<ComplexOption | undefined>(
    undefined,
  );
  const [f3Input, setF3Input] = useState("");
  const [complexValue2, setComplexValue2] = useState<ComplexOption | undefined>(
    undefined,
  );
  const [f4Input, setF4Input] = useState("");

  const [freeFormValue, setFreeFormValue] = useState<OptionLike | undefined>(
    undefined,
  );
  const [freeFormInput, setFreeFormInput] = useState("");

  return (
    <div className={pageStyles}>
      {<h1>{freeFormValue?.label}</h1>}
      <Content>
        <Content>
          <div className={titleBarClasses} ref={titleBarRef}>
            <div>
              {typeof title === "string" && titleMetaData ? (
                <div className={styles.titleRow}>
                  <Heading level={1}>{title}</Heading>
                  {titleMetaData}
                </div>
              ) : typeof title === "string" ? (
                <Heading level={1}>{title}</Heading>
              ) : (
                title
              )}
              {subtitle && (
                <div className={styles.subtitle}>
                  <Text size="large" variation="subdued">
                    <Emphasis variation="bold">
                      <Markdown content={subtitle} basicUsage={true} />
                    </Emphasis>
                  </Text>
                </div>
              )}
            </div>
            {showActionGroup && (
              <div className={styles.actionGroup}>
                {primaryAction && (
                  <div className={styles.primaryAction} ref={primaryAction.ref}>
                    <Button {...getActionProps(primaryAction)} />
                  </div>
                )}
                {secondaryAction && (
                  <div
                    className={styles.actionButton}
                    ref={secondaryAction.ref}
                  >
                    <Button {...getActionProps(secondaryAction)} />
                  </div>
                )}
                {showMenu && (
                  <div className={styles.actionButton}>
                    <Menu items={moreActionsMenu}></Menu>
                  </div>
                )}
              </div>
            )}
          </div>
          {intro && (
            <Text size="large">
              <Markdown
                content={intro}
                basicUsage={true}
                externalLink={externalIntroLinks}
              />
            </Text>
          )}
        </Content>
        <Content>
          <Text variation="subdued">Default Options</Text>
          <Autocomplete
            version={2}
            value={defaultValue}
            onChange={setDefaultValue}
            inputValue={f1Input}
            onInputChange={setF1Input}
            menu={[{ type: "options", options: simpleOptions }]}
            filterOptions={(o, i) =>
              o.label.toLowerCase().includes(i.toLowerCase())
            }
            getOptionLabel={o => o.label}
            getOptionKey={o => o.label}
          />

          <Text variation="subdued">Custom Options</Text>
          <Autocomplete
            version={2}
            value={animalValue}
            onChange={setAnimalValue}
            inputValue={f2Input}
            onInputChange={setF2Input}
            menu={[{ type: "options", options: animals }]}
            filterOptions={(o, i) =>
              o.label.toLowerCase().includes(i.toLowerCase())
            }
            getOptionLabel={o => o.label}
            getOptionKey={o => o.value}
            renderOption={o => (
              <span>
                {o.label} — {o.description}
              </span>
            )}
            isOptionEqualToValue={(a, b) => a.id === b.id}
          />

          <Text variation="subdued">Custom Options with nested data</Text>
          <Autocomplete
            version={2}
            value={complexValue}
            onChange={setComplexValue}
            inputValue={f3Input}
            onInputChange={setF3Input}
            menu={[
              {
                type: "section",
                id: "complex",
                label: "Complex",
                options: complexOptions,
                actionsBottom: [
                  {
                    type: "action",
                    id: "add",
                    label: "Add",
                    onClick: () => {
                      console.log("adding");
                    },
                  },
                ],
              },
            ]}
            filterOptions={(o, i) =>
              o.label.toLowerCase().includes(i.toLowerCase())
            }
            getOptionLabel={o => o.label}
            getOptionKey={o => o.id}
          />

          <Text variation="subdued">
            Custom Options, custom input with nested data
          </Text>
          <Autocomplete
            version={2}
            value={complexValue2}
            onChange={setComplexValue2}
            inputValue={f4Input}
            onInputChange={setF4Input}
            openOnFocus={true}
            menu={[
              {
                type: "section",
                id: "complex2",
                label: "Complex",
                options: complexOptions,
                actionsBottom: [
                  {
                    type: "action",
                    id: "add2",
                    label: "Add",
                    shouldClose: false,
                    onClick: () => {
                      console.log("adding");
                    },
                  },
                ],
              },
            ]}
            renderInput={({ inputRef, inputProps }) => (
              <InputText
                ref={inputRef}
                {...inputProps}
                suffix={{
                  icon: "arrowDown",
                }}
              />
            )}
            filterOptions={(o, i) =>
              o.label.toLowerCase().includes(i.toLowerCase())
            }
            getOptionLabel={o => o.label}
            getOptionKey={o => o.id}
          />
          <Text variation="subdued">Free Form</Text>
          <Autocomplete
            version={2}
            value={freeFormValue}
            onChange={setFreeFormValue}
            inputValue={freeFormInput}
            onInputChange={setFreeFormInput}
            allowFreeForm={true}
            createFreeFormValue={input => ({
              label: input,
              id: Math.random().toString(),
            })}
            menu={[
              {
                type: "section",
                id: "complex2",
                label: "Complex",
                options: complexOptions,
                actionsBottom: [
                  {
                    type: "action",
                    id: "add2",
                    label: "Add",
                    shouldClose: false,
                    onClick: () => {
                      console.log("adding");
                    },
                  },
                ],
              },
            ]}
            renderInput={({ inputRef, inputProps }) => (
              <InputText
                ref={inputRef}
                {...inputProps}
                suffix={{
                  icon: "arrowDown",
                }}
              />
            )}
            filterOptions={(o, i) =>
              o.label.toLowerCase().includes(i.toLowerCase())
            }
            getOptionLabel={o => o.label}
            getOptionKey={o => o.label}
          />
        </Content>
      </Content>
    </div>
  );
}

export const getActionProps = (actionProps: ButtonActionProps): ButtonProps => {
  const buttonProps = { ...actionProps };
  if (actionProps.ref) delete buttonProps.ref;

  return buttonProps;
};
