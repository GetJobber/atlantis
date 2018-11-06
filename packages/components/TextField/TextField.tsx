import classnames from 'classnames';
import React, { Component, createRef } from 'react';
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

interface TextFieldState {
  focused: boolean;
  filled: boolean;
  error: boolean;
}

export default class TextField extends Component<
  TextFieldProps,
  TextFieldState
> {
  private static defaultProps: TextFieldProps = {
    rows: 3,
    size: 'normal',
  };

  state: TextFieldState = {
    focused: false,
    filled: false,
    error: false,
  };

  private inputRef = createRef<HTMLInputElement>();

  componentDidMount() {
    this.checkDirty();
  }

  render() {
    const {
      children,
      className,
      error,
      id,
      label,
      required,
      defaultValue,
      multiline,
      size,
      ...other
    } = this.props;

    const InputCompontent = multiline ? 'textarea' : 'input';

    const wrapperClasses = classnames([
      size === 'small' && styles.Small,
      size === 'large' && styles.Large,
      error && styles.Error,
      this.state.focused && styles.Focused,
      multiline && styles.Multiline,
      styles.TextField,
    ]);

    const labelClasses = classnames([
      this.state.filled && styles.Shrink,
      this.state.focused && this.state.filled && styles.Shrink,
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
            ref={this.inputRef}
            className={styles.Input}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            defaultValue={`${defaultValue || ''}`}
            placeholder={`${label}`}
            {...other}
          />
        </div>
      </div>
    );
  }

  private handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    this.setState({ focused: true });
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  private handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    this.setState({ focused: false });
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.checkDirty();

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  };

  private checkDirty() {
    if (this.inputRef.current) {
      this.setState({ filled: !!this.inputRef.current.value });
    }
  }
}
