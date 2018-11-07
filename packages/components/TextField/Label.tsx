import classnames from 'classnames';
import React from 'react';
import styles from './Label.css';

interface LabelProps extends React.InputHTMLAttributes<HTMLLabelElement> {
  shrink?: boolean;
  error?: boolean;
}

export default function Label({
  error,
  shrink,
  children,
  ...rest
}: LabelProps) {
  const classes: string = classnames([
    shrink && styles.shrink,
    error && styles.error,
    styles.Label,
  ]);

  return (
    <label className={classes} {...rest}>
      {children}
    </label>
  );
}
