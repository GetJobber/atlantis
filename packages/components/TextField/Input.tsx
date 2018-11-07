import classnames from 'classnames';
import React from 'react';
import styles from './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  multiline?: boolean;
  rows?: number;
  error?: boolean;
}

export default function Input({ multiline, ...rest }: InputProps): JSX.Element {
  const InputComponent = multiline ? 'textarea' : 'input';
  const classes: string = classnames([
    multiline && styles.multiline,
    styles.Input,
  ]);

  if (!multiline) {
    delete rest.rows;
  }

  return <InputComponent className={classes} {...rest} />;
}
