import {
  Box,
  Button,
  Chip,
  Cluster,
  ContentBlock,
  FormFieldInputHorizontalWrapper,
  FormFieldInputWrapperStyles,
  Icon,
  Menu,
  Text,
  useFormFieldWrapperStyles,
} from "@jobber/components";
import { useRef, useState } from "react";
import styles from "./EmailPicker.module.css";

export const EmailPicker = () => {
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState<
    {
      name: string;
      email: string;
      outOfBand?: boolean;
    }[]
  >([]);

  const items = [
    {
      name: "Lauren Adams",
      role: "CEO",
      email: "laurenadams@example.com",
    },
    {
      name: "Thomas Reed",
      role: "CFO (Primary Contact)",
      email: "thomasreed@example.com",
    },
    {
      name: "Rachel Clarke",
      role: "COO",
      email: "rachelclarke@example.com",
    },
    {
      name: "Kevin Brooks",
      role: "Operations Manager",
      email: "kevinbrooks@example.com",
    },
  ];
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div style={{ "--menu-space": "0" } as React.CSSProperties}>
      <Menu
        UNSAFE_className={{
          container: styles.noPadding,
          items: styles.noPadding,
        }}
        activator={
          <EmailField value="test" showMiniLabel={false} fullWidth>
            <Cluster gap="small">
              <Text>To</Text>
              {selected.map((item, index) => {
                return !item.outOfBand ? (
                  <Chip key={index} label={item.name}>
                    <Chip.Suffix
                      onClick={() => {
                        setSelected(selected.filter(i => i.name !== item.name));
                      }}
                    >
                      <Icon size="small" name="remove" />
                    </Chip.Suffix>
                  </Chip>
                ) : (
                  <Chip label={item.email}>
                    <Chip.Suffix>
                      <Icon size="small" name="remove" />
                    </Chip.Suffix>
                  </Chip>
                );
              })}
              <input
                ref={inputRef}
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
                className={styles.input}
                type="text"
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    setEmail("");
                    setSelected([
                      ...selected,
                      {
                        name: "",
                        email: (e.target as HTMLInputElement).value,
                        outOfBand: true,
                      },
                    ]);
                  }
                }}
              ></input>
            </Cluster>
          </EmailField>
        }
      >
        {items
          .filter(item => !selected.some(s => s.email === item.email))
          .map((item, index) => (
            <button
              className={styles.itemB}
              key={index}
              onClick={() => {
                setSelected([...selected, item]);
              }}
              type="button"
            >
              <div>
                <Text>{item.name}</Text>
                <Text>{item.role}</Text>
              </div>
              <Text>{item.email}</Text>
            </button>
          ))}
        <Box padding="small">
          <ContentBlock>
            <Button
              type="tertiary"
              onClick={() => alert("Add new contact experience start")}
            >
              <Button.Label>Add new contact</Button.Label>
            </Button>
          </ContentBlock>
        </Box>
      </Menu>
    </div>
  );
};

export const EmailField = ({
  children,
  ...rest
}: {
  readonly value: string;
  readonly showMiniLabel: boolean;
  readonly size?: "small" | "large";
  readonly prefix?: {
    name: string;
    size?: "small" | "large";
  };
  readonly suffix?: {
    name: string;
    size?: "small" | "large";
  };
  readonly placeholder?: string;
  readonly error?: string;
  readonly inline?: boolean;
  readonly identifier?: string;
  readonly onClear?: () => void;
  readonly children?: React.ReactNode;
  readonly fullWidth?: boolean;
}) => {
  const { wrapperClasses, containerClasses } = useFormFieldWrapperStyles({
    placeholder: "Enter email",
    value: "test",
    invalid: false,
    error: "error",
    type: "text",
    disabled: false,
    inline: false,
    showMiniLabel: true,
  });

  return (
    <div className={containerClasses} {...rest}>
      <div className={wrapperClasses} data-testid="Form-Field-Wrapper">
        <FormFieldInputHorizontalWrapper>
          <FormFieldInputWrapperStyles>
            <div className={styles.childrenWrapper}>{children}</div>
          </FormFieldInputWrapperStyles>
        </FormFieldInputHorizontalWrapper>
      </div>
    </div>
  );
};
