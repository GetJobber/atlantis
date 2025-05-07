import {
  AffixIcon,
  AffixLabel,
  Chip,
  ClearAction,
  Cluster,
  FormFieldInputHorizontalWrapper,
  FormFieldInputWrapperStyles,
  FormFieldLabel,
  Icon,
  InputValidation,
  Menu,
  Text,
  useFormFieldWrapperStyles,
} from "@jobber/components";
import { RefObject, useRef, useState } from "react";
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

  return (
    <div style={{ "--menu-space": "0" } as React.CSSProperties}>
      <Menu
        activator={
          <EmailField value="test" showMiniLabel={false} fullWidth>
            <Cluster gap="small">
              {selected.map((item, index) => {
                return !item.outOfBand ? (
                  <Chip key={index} label={item.name}>
                    <Chip.Suffix
                      onClick={() => {
                        setSelected(
                          selected.filter(i => i.email !== item.email),
                        );
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
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
                className={styles.input}
                type="text"
                onKeyDown={e => {
                  if (e.key === "Enter") {
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
        {items.map((item, index) => (
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
      </Menu>
    </div>
  );
};

export const EmailField = ({
  value,
  showMiniLabel,
  size,
  prefix,
  suffix,
  placeholder,
  error,
  inline,
  fullWidth,
  identifier,
  onClear,
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
  const wrapperRef = useRef<HTMLDivElement>(null);

  const prefixRef = useRef() as RefObject<HTMLDivElement>;
  const suffixRef = useRef() as RefObject<HTMLDivElement>;

  const { wrapperClasses, containerClasses, wrapperInlineStyle, labelStyle } =
    useFormFieldWrapperStyles({
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
    <div className={containerClasses} data-full-width={fullWidth} {...rest}>
      <div
        className={wrapperClasses}
        style={wrapperInlineStyle}
        data-testid="Form-Field-Wrapper"
        ref={wrapperRef}
      >
        <FormFieldInputHorizontalWrapper>
          <AffixIcon {...prefix} size={size} />
          <FormFieldInputWrapperStyles>
            {(showMiniLabel || !value) && (
              <FormFieldLabel
                htmlFor={identifier}
                style={
                  prefixRef?.current || suffixRef?.current
                    ? labelStyle
                    : undefined
                }
              >
                {placeholder}
              </FormFieldLabel>
            )}
            <AffixLabel {...prefix} labelRef={prefixRef} />

            <div className={styles.childrenWrapper}>{children}</div>

            <AffixLabel {...suffix} labelRef={suffixRef} variation="suffix" />
          </FormFieldInputWrapperStyles>
          <ClearAction onClick={onClear} visible={!!onClear} />
          <AffixIcon {...suffix} variation="suffix" size={size} />
        </FormFieldInputHorizontalWrapper>
      </div>
      <InputValidation message={error || ""} visible={!!error && !inline} />
    </div>
  );
};
