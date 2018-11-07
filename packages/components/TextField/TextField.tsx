import classnames from 'classnames';
import React, { useState } from 'react';
import Input from './Input';
import Label from './Label';
import styles from './TextField.css';

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

type Size = 'normal' | 'small' | 'large';

interface TextFieldProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      'size' | 'defaultValue'
    > {
  /**
   * The text field label
   */
  label?: React.ReactNode | string;
  error?: boolean;
  disabled?: boolean;
  defaultValue?: string | number;
  size?: Size;

  multiline?: boolean;
  /**
   * Number of rows for a multiline text field
   */
  rows?: number;
}

export default function TextField(props: TextFieldProps) {
  const {
    children,
    className,
    id,
    label,
    required,
    defaultValue,
    multiline,
    size,
    error,
    ...other
  } = props;
  const { filled, ...handleInput } = useInputValue(defaultValue || '');
  const { focused, ...handleFocus } = useFocusState();

  const classes = classnames([
    styles[size],
    error && styles.error,
    focused && styles.focused,
    multiline && styles.multiline,
    styles.TextField,
  ]);

  const showLabel: boolean = size !== 'small' && !!label;

  return (
    <div className={classes}>
      {showLabel && (
        <Label htmlFor={id} error={error} shrink={filled}>
          {label}
        </Label>
      )}
      <Input
        id={id}
        placeholder={`${filled ? null : label}`}
        multiline={multiline}
        {...handleFocus}
        {...handleInput}
        {...other}
      />
    </div>
  );
}

function useFocusState() {
  const [focused, setFocused] = useState(false);

  return {
    focused,
    onBlur: (): void => setFocused(false),
    onFocus: (): void => setFocused(true),
  };
}

function useInputValue(initialValue: string | number) {
  const [value, setValue] = useState(initialValue);
  const [filled, setFilled] = useState(false);

  return {
    value,
    filled,
    onChange(e: React.ChangeEvent<HTMLInputElement>): void {
      setValue(e.target.value);
      setFilled(!!e.target.value);
    },
  };
}

const defaultProps: TextFieldProps = {
  size: 'normal',
};

TextField.defaultProps = defaultProps;
