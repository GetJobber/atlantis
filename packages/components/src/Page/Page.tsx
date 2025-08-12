/* eslint-disable max-statements */
import React, { ReactNode, useState } from "react";
import classnames from "classnames";
import { XOR } from "ts-xor";
import {
  Breakpoints,
  useResizeObserver,
} from "@jobber/hooks/useResizeObserver";
import styles from "./Page.module.css";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { Content } from "../Content";
import { Markdown } from "../Markdown";
import { Button, ButtonProps } from "../Button";
import { Menu, SectionProps } from "../Menu";
import { Emphasis } from "../Emphasis";
import { Autocomplete, type Option } from "../Autocomplete";
import { OptionLike } from "../Autocomplete/Autocomplete.types";

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
  const [selected, setSelected] = useState<Animal | undefined>(undefined);
  const [selected2, setSelected2] = useState<Animal | undefined>(undefined);
  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");

  const [selected3, setSelected3] = useState<Option | undefined>(undefined);

  interface SectionExtra {
    icon: string;
    description: string;
  }
  interface ActionExtra {
    description: string;
  }

  return (
    <div className={pageStyles}>
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
          {/** Demo datasets */}
          {(() => {


            const simpleOptions: OptionLike[] = [
              { id: 1, label: "One" },
              { id: 2, label: "Two" },
              { id: 3, label: "Three" },
            ];


            const [f1Value, setF1Value] = useState<OptionLike | undefined>(
              undefined,
            );
            const [f1Input, setF1Input] = useState("");

            const [f2Value, setF2Value] = useState<Animal | undefined>(
              undefined,
            );
            const [f2Input, setF2Input] = useState("");

            const [f3Value, setF3Value] = useState<OptionLike | undefined>(
              undefined,
            );
            const [f3Input, setF3Input] = useState("");

            const [f4Value, setF4Value] = useState<Animal | undefined>(
              undefined,
            );
            const [f4Input, setF4Input] = useState("");

            const [f5Value, setF5Value] = useState<OptionLike | undefined>(
              undefined,
            );
            const [f5Input, setF5Input] = useState("");

            const [s1Value, setS1Value] = useState<OptionLike | undefined>(
              undefined,
            );
            const [s1Input, setS1Input] = useState("");

            const [s2Value, setS2Value] = useState<Animal | undefined>(
              undefined,
            );
            const [s2Input, setS2Input] = useState("");

            const [s3Value, setS3Value] = useState<OptionLike | undefined>(
              undefined,
            );
            const [s3Input, setS3Input] = useState("");

            const [s4Value, setS4Value] = useState<Animal | undefined>(
              undefined,
            );
            const [s4Input, setS4Input] = useState("");

            const [s5Value, setS5Value] = useState<OptionLike | undefined>(
              undefined,
            );
            const [s5Input, setS5Input] = useState("");

            return (
              <div>
                <Heading level={2}>Flat lists</Heading>
                <Text variation="subdued">1) Flat default options</Text>
                <Autocomplete
                  version={2}
                  value={f1Value}
                  onChange={setF1Value}
                  inputValue={f1Input}
                  onInputChange={setF1Input}
                  menu={[{ type: "options", options: simpleOptions }]}
                  filterOptions={(o, i) =>
                    o.label.toLowerCase().includes(i.toLowerCase())
                  }
                  getOptionLabel={o => o.label}
                  getOptionValue={o => o.id}
                />

                <Text variation="subdued">2) Flat custom options (Animal)</Text>
                <Autocomplete
                  version={2}
                  value={f2Value}
                  onChange={setF2Value}
                  inputValue={f2Input}
                  onInputChange={setF2Input}
                  menu={[{ type: "options", options: animals }]}
                  filterOptions={(o, i) =>
                    o.label.toLowerCase().includes(i.toLowerCase())
                  }
                  getOptionLabel={o => o.label}
                  getOptionValue={o => o.value}
                  renderOption={o => (
                    <span>
                      {o.label} — {o.description}
                    </span>
                  )}
                  isOptionEqualToValue={(a, b) => a.id === b.id}
                />

                <Text variation="subdued">
                  3) Flat default options with default actions
                </Text>
                <Autocomplete
                  version={2}
                  value={f3Value}
                  onChange={setF3Value}
                  inputValue={f3Input}
                  onInputChange={setF3Input}
                  menu={[
                    {
                      type: "options",
                      options: simpleOptions,
                      actionsBottom: [
                        {
                          type: "action",
                          id: "add",
                          label: "Add",
                          onClick: () => {},
                        },
                      ],
                    },
                  ]}
                  filterOptions={(o, i) =>
                    o.label.toLowerCase().includes(i.toLowerCase())
                  }
                  getOptionLabel={o => o.label}
                  getOptionValue={o => o.id}
                />

                <Text variation="subdued">
                  4) Flat custom options with custom actions
                </Text>
                <Autocomplete
                  version={2}
                  value={f4Value}
                  onChange={setF4Value}
                  inputValue={f4Input}
                  onInputChange={setF4Input}
                  menu={[
                    {
                      type: "options",
                      options: animals,
                      actionsBottom: [
                        {
                          type: "action",
                          id: "add",
                          label: "Add",
                          description: "Create a new animal",
                          onClick: () => {},
                        },
                      ],
                    },
                  ]}
                  renderAction={a => (
                    <span>
                      {a.label}: {a.description}
                    </span>
                  )}
                  renderOption={o => (
                    <span>
                      {o.label} — {o.description}
                    </span>
                  )}
                  filterOptions={(o, i) =>
                    o.label.toLowerCase().includes(i.toLowerCase())
                  }
                  getOptionLabel={o => o.label}
                  getOptionValue={o => o.value}
                  isOptionEqualToValue={(a, b) => a.id === b.id}
                />

                <Text variation="subdued">
                  5) Flat default options with custom actions
                </Text>
                <Autocomplete
                  version={2}
                  value={f5Value}
                  onChange={setF5Value}
                  inputValue={f5Input}
                  onInputChange={setF5Input}
                  menu={[
                    {
                      type: "options",
                      options: simpleOptions,
                      actionsBottom: [
                        {
                          type: "action",
                          id: "info",
                          label: "Info",
                          description: "About these options",
                          onClick: () => {},
                        },
                      ],
                    },
                  ]}
                  renderAction={a => (
                    <span>
                      {a.label}: {a.description}
                    </span>
                  )}
                  filterOptions={(o, i) =>
                    o.label.toLowerCase().includes(i.toLowerCase())
                  }
                  getOptionLabel={o => o.label}
                  getOptionValue={o => o.id}
                />

                <Heading level={2}>Sectioned lists</Heading>
                <Text variation="subdued">6) Sectioned default options</Text>
                <Autocomplete
                  version={2}
                  value={s1Value}
                  onChange={setS1Value}
                  inputValue={s1Input}
                  onInputChange={setS1Input}
                  menu={[
                    {
                      type: "section",
                      id: 1,
                      label: "Numbers",
                      options: simpleOptions,
                    },
                  ]}
                  filterOptions={(o, i) =>
                    o.label.toLowerCase().includes(i.toLowerCase())
                  }
                  getOptionLabel={o => o.label}
                  getOptionValue={o => o.id}
                />

                <Text variation="subdued">7) Sectioned custom options</Text>
                <Autocomplete
                  version={2}
                  value={s2Value}
                  onChange={setS2Value}
                  inputValue={s2Input}
                  onInputChange={setS2Input}
                  menu={[
                    {
                      type: "section",
                      id: 2,
                      label: "Animals",
                      options: animals,
                    },
                  ]}
                  renderOption={o => (
                    <span>
                      {o.label} — {o.description}
                    </span>
                  )}
                  filterOptions={(o, i) =>
                    o.label.toLowerCase().includes(i.toLowerCase())
                  }
                  getOptionLabel={o => o.label}
                  getOptionValue={o => o.value}
                  isOptionEqualToValue={(a, b) => a.id === b.id}
                />

                <Text variation="subdued">
                  8) Sectioned default options with default actions
                </Text>
                <Autocomplete
                  version={2}
                  value={s3Value}
                  onChange={setS3Value}
                  inputValue={s3Input}
                  onInputChange={setS3Input}
                  menu={[
                    {
                      type: "section",
                      id: 3,
                      label: "Numbers",
                      options: simpleOptions,
                      actionsBottom: [
                        {
                          type: "action",
                          id: "add",
                          label: "Add",
                          onClick: () => {},
                        },
                      ],
                    },
                  ]}
                  filterOptions={(o, i) =>
                    o.label.toLowerCase().includes(i.toLowerCase())
                  }
                  getOptionLabel={o => o.label}
                  getOptionValue={o => o.id}
                />

                <Text variation="subdued">
                  9) Sectioned custom options with custom actions
                </Text>
                <Autocomplete
                  version={2}
                  value={s4Value}
                  onChange={setS4Value}
                  inputValue={s4Input}
                  onInputChange={setS4Input}
                  menu={[
                    {
                      type: "section",
                      id: 4,
                      label: "Animals",
                      options: animals,
                      icon: "animal",
                      description: "Animals section",
                      actionsBottom: [
                        {
                          type: "action",
                          id: "add",
                          label: "Add",
                          description: "Add a new animal",
                          onClick: () => {},
                        },
                      ],
                    },
                  ]}
                  renderSection={s => (
                    <span>
                      {s.icon} — {s.description}
                    </span>
                  )}
                  renderAction={a => (
                    <span>
                      {a.label}: {a.description}
                    </span>
                  )}
                  renderOption={o => (
                    <span>
                      {o.label} — {o.description}
                    </span>
                  )}
                  filterOptions={(o, i) =>
                    o.label.toLowerCase().includes(i.toLowerCase())
                  }
                  getOptionLabel={o => o.label}
                  getOptionValue={o => o.value}
                  isOptionEqualToValue={(a, b) => a.id === b.id}
                />

                <Text variation="subdued">
                  10) Sectioned default options with custom actions
                </Text>
                <Autocomplete
                  version={2}
                  value={s5Value}
                  onChange={setS5Value}
                  inputValue={s5Input}
                  onInputChange={setS5Input}
                  menu={[
                    {
                      type: "section",
                      id: 5,
                      label: "Numbers",
                      options: simpleOptions,
                      actionsBottom: [
                        {
                          type: "action",
                          id: "info",
                          label: "Info",
                          description: "About this section",
                          onClick: () => {},
                        },
                      ],
                    },
                  ]}
                  renderAction={a => (
                    <span>
                      {a.label}: {a.description}
                    </span>
                  )}
                  filterOptions={(o, i) =>
                    o.label.toLowerCase().includes(i.toLowerCase())
                  }
                  getOptionLabel={o => o.label}
                  getOptionValue={o => o.id}
                />

                {/** No sections: missing custom options + default actions */}
                <Text variation="subdued">
                  11) Flat custom options with default actions
                </Text>
                <Autocomplete
                  version={2}
                  value={f2Value}
                  onChange={setF2Value}
                  inputValue={f2Input}
                  onInputChange={setF2Input}
                  menu={[
                    {
                      type: "options",
                      options: animals,
                      actionsBottom: [
                        {
                          type: "action",
                          id: "add2",
                          label: "Add",
                          onClick: () => {},
                        },
                      ],
                    },
                  ]}
                  filterOptions={(o, i) =>
                    o.label.toLowerCase().includes(i.toLowerCase())
                  }
                  getOptionLabel={o => o.label}
                  getOptionValue={o => o.value}
                  isOptionEqualToValue={(a, b) => a.id === b.id}
                />

                <Heading level={3}>
                  Sectioned (default section meta) — action combinations
                </Heading>
                <Text variation="subdued">
                  12) Simple opts — flat default actions only
                </Text>
                <Autocomplete
                  version={2}
                  value={s1Value}
                  onChange={setS1Value}
                  inputValue={s1Input}
                  onInputChange={setS1Input}
                  menu={[
                    {
                      type: "section",
                      id: 11,
                      label: "Numbers",
                      options: simpleOptions,
                    },
                  ]}
                  filterOptions={(o, i) =>
                    o.label.toLowerCase().includes(i.toLowerCase())
                  }
                  getOptionLabel={o => o.label}
                  getOptionValue={o => o.id}
                />
                <Text variation="subdued">
                  12 B) Simple opts — section default actions only
                </Text>
                <Autocomplete
                  version={2}
                  value={s1Value}
                  onChange={setS1Value}
                  inputValue={s1Input}
                  onInputChange={setS1Input}
                  menu={[
                    {
                      type: "options",
                      options: simpleOptions,
                      actionsBottom: [
                        {
                          type: "action",
                          id: "add3",
                          label: "Add",
                          onClick: () => {},
                        },
                      ],
                    },
                    {
                      type: "section",
                      id: 12,
                      label: "More Numbers",
                      options: simpleOptions,
                    },
                  ]}
                  filterOptions={(o, i) =>
                    o.label.toLowerCase().includes(i.toLowerCase())
                  }
                  getOptionLabel={o => o.label}
                  getOptionValue={o => o.id}
                />

                <Text variation="subdued">
                  13) Simple opts — section default actions only
                </Text>
                <Autocomplete
                  version={2}
                  value={s1Value}
                  onChange={setS1Value}
                  inputValue={s1Input}
                  onInputChange={setS1Input}
                  menu={[
                    {
                      type: "section",
                      id: 13,
                      label: "Numbers",
                      options: simpleOptions,
                      actionsBottom: [
                        {
                          type: "action",
                          id: "add4",
                          label: "Add",
                          onClick: () => {},
                        },
                      ],
                    },
                  ]}
                  filterOptions={(o, i) =>
                    o.label.toLowerCase().includes(i.toLowerCase())
                  }
                  getOptionLabel={o => o.label}
                  getOptionValue={o => o.id}
                />

                <Text variation="subdued">
                  14) Simple opts — flat default + section default actions
                </Text>
                <Autocomplete
                  version={2}
                  value={s1Value}
                  onChange={setS1Value}
                  inputValue={s1Input}
                  onInputChange={setS1Input}
                  menu={[
                    {
                      type: "options",
                      options: simpleOptions,
                      actionsBottom: [
                        {
                          type: "action",
                          id: "add5",
                          label: "Add",
                          onClick: () => {},
                        },
                      ],
                    },
                    {
                      type: "section",
                      id: 14,
                      label: "Numbers",
                      options: simpleOptions,
                      actionsBottom: [
                        {
                          type: "action",
                          id: "add6",
                          label: "Add",
                          onClick: () => {},
                        },
                      ],
                    },
                  ]}
                  filterOptions={(o, i) =>
                    o.label.toLowerCase().includes(i.toLowerCase())
                  }
                  getOptionLabel={o => o.label}
                  getOptionValue={o => o.id}
                />

                <Text variation="subdued">
                  15) Animal opts — flat custom + section custom actions
                </Text>
                <Autocomplete
                  version={2}
                  value={s4Value}
                  onChange={setS4Value}
                  inputValue={s4Input}
                  onInputChange={setS4Input}
                  menu={[
                    {
                      type: "options",
                      options: animals,
                      actionsBottom: [
                        {
                          type: "action",
                          id: "flat1",
                          label: "Add",
                          description: "Create",
                          onClick: () => {},
                        },
                      ],
                    },
                    {
                      type: "section",
                      id: 15,
                      label: "Animals",
                      options: animals,
                      icon: "animal",
                      description: "Animals section",
                      actionsBottom: [
                        {
                          type: "action",
                          id: "sec1",
                          label: "Add",
                          description: "Add animal",
                          onClick: () => {},
                        },
                      ],
                    },
                  ]}
                  renderSection={s => (
                    <span>
                      {s.icon} — {s.description}
                    </span>
                  )}
                  renderAction={a => (
                    <span>
                      {a.label}: {a.description}
                    </span>
                  )}
                  renderOption={o => (
                    <span>
                      {o.label} — {o.description}
                    </span>
                  )}
                  filterOptions={(o, i) =>
                    o.label.toLowerCase().includes(i.toLowerCase())
                  }
                  getOptionLabel={o => o.label}
                  getOptionValue={o => o.value}
                  isOptionEqualToValue={(a, b) => a.id === b.id}
                />

                <Text variation="subdued">
                  16) Animal opts — flat default + section custom actions
                </Text>
                <Autocomplete
                  version={2}
                  value={s4Value}
                  onChange={setS4Value}
                  inputValue={s4Input}
                  onInputChange={setS4Input}
                  menu={[
                    {
                      type: "options",
                      options: animals,
                      actionsBottom: [
                        {
                          type: "action",
                          id: "flat2",
                          label: "Add",
                          onClick: () => {},
                        },
                      ],
                    },
                    {
                      type: "section",
                      id: 16,
                      label: "Animals",
                      options: animals,
                      icon: "animal",
                      description: "Animals",
                      actionsBottom: [
                        {
                          type: "action",
                          id: "sec2",
                          label: "Add",
                          description: "Add",
                          onClick: () => {},
                        },
                      ],
                    },
                  ]}
                  renderSection={s => (
                    <span>
                      {s.icon} — {s.description}
                    </span>
                  )}
                  renderAction={a => (
                    <span>
                      {a.label}: {a.description}
                    </span>
                  )}
                  renderOption={o => (
                    <span>
                      {o.label} — {o.description}
                    </span>
                  )}
                  filterOptions={(o, i) =>
                    o.label.toLowerCase().includes(i.toLowerCase())
                  }
                  getOptionLabel={o => o.label}
                  getOptionValue={o => o.value}
                  isOptionEqualToValue={(a, b) => a.id === b.id}
                />

                <Text variation="subdued">
                  17) Animal opts — flat custom + section default actions
                </Text>
                <Autocomplete
                  version={2}
                  value={s2Value}
                  onChange={setS2Value}
                  inputValue={s2Input}
                  onInputChange={setS2Input}
                  menu={[
                    {
                      type: "options",
                      options: animals,
                      actionsBottom: [
                        {
                          type: "action",
                          id: "flat3",
                          label: "Add",
                          onClick: () => {},
                        },
                      ],
                    },
                    {
                      type: "section",
                      id: 17,
                      label: "Animals",
                      options: animals,
                      actionsBottom: [
                        {
                          type: "action",
                          id: "sec3",
                          label: "Add",
                          onClick: () => {},
                        },
                      ],
                    },
                  ]}
                  renderOption={o => (
                    <span>
                      {o.label} — {o.description}
                    </span>
                  )}
                  filterOptions={(o, i) =>
                    o.label.toLowerCase().includes(i.toLowerCase())
                  }
                  getOptionLabel={o => o.label}
                  getOptionValue={o => o.value}
                  isOptionEqualToValue={(a, b) => a.id === b.id}
                />

                <Text variation="subdued">
                  18) Simple opts — section no action
                </Text>
                <Autocomplete
                  version={2}
                  value={s5Value}
                  onChange={setS5Value}
                  inputValue={s5Input}
                  onInputChange={setS5Input}
                  menu={[
                    {
                      type: "section",
                      id: 18,
                      label: "Numbers",
                      options: simpleOptions,
                    },
                  ]}
                  filterOptions={(o, i) =>
                    o.label.toLowerCase().includes(i.toLowerCase())
                  }
                  getOptionLabel={o => o.label}
                  getOptionValue={o => o.id}
                />

                <Text variation="subdued">
                  19) Simple opts — section actions and flat actions (no
                  options)
                </Text>
                <Autocomplete
                  version={2}
                  value={s5Value}
                  onChange={setS5Value}
                  inputValue={s5Input}
                  onInputChange={setS5Input}
                  menu={[
                    {
                      type: "options",
                      options: [],
                      actionsBottom: [
                        {
                          type: "action",
                          id: "add7",
                          label: "Empty Options Action",
                          onClick: () => {},
                        },
                      ],
                    },
                    {
                      type: "section",
                      id: 19,
                      label: "Numbers",
                      options: simpleOptions,
                      actionsBottom: [
                        {
                          type: "action",
                          id: "add8",
                          label: "Add",
                          onClick: () => {},
                        },
                      ],
                    },
                  ]}
                  filterOptions={(o, i) =>
                    o.label.toLowerCase().includes(i.toLowerCase())
                  }
                  getOptionLabel={o => o.label}
                  getOptionValue={o => o.id}
                />

                <Text variation="subdued">20) Empty options</Text>
                <Autocomplete
                  version={2}
                  value={s5Value}
                  onChange={setS5Value}
                  inputValue={s5Input}
                  onInputChange={setS5Input}
                  menu={[{ type: "options", options: [] }]}
                  filterOptions={(o, i) =>
                    o.label.toLowerCase().includes(i.toLowerCase())
                  }
                  getOptionLabel={o => o.label}
                  getOptionValue={o => o.id}
                />
              </div>
            );
          })()}
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
