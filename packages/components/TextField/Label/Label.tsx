import classNames from 'classnames';
import React from 'react';
import styles from './Label.css';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  shrink?: boolean;
  error?: boolean;
}

export default function Label({
  error,
  shrink,
  children,
  ...rest
}: LabelProps) {
  const classes: string = classNames([
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
