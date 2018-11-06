import classnames from 'classnames';
import React, { useState } from 'react';
import styles from './TextField.css';

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

interface TextFieldProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      'size' | 'defaultValue'
    > {
  /**
   * The text field label
   */
  label?: React.ReactNode | string;
  required?: boolean;
  error?: boolean;
  multiline?: boolean;
  /**
   * Number of rows for a multiline text field
   */
  rows?: number;
  disabled?: boolean;
  defaultValue?: string | number;
  size?: 'normal' | 'small' | 'large';
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

  const InputCompontent = multiline ? 'textarea' : 'input';

  const wrapperClasses = classnames([
    size === 'small' && styles.Small,
    size === 'large' && styles.Large,
    error && styles.Error,
    focused && styles.Focused,
    multiline && styles.Multiline,
    styles.TextField,
  ]);

  const labelClasses = classnames([
    filled && styles.Shrink,
    focused && filled && styles.Shrink,
    styles.Label,
  ]);

  return (
    <div className={wrapperClasses}>
      {size !== 'small' &&
        label && (
          <label htmlFor={id} className={labelClasses}>
            {label}
          </label>
        )}
      <div className={styles.InputWrapper}>
        <InputCompontent
          type="text"
          id={id}
          name={id}
          className={styles.Input}
          placeholder={`${label}`}
          {...handleFocus}
          {...handleInput}
          {...other}
        />
      </div>
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
