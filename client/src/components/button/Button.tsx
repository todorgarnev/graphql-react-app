import React, { FunctionComponent } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  type: 'submit' | 'reset' | 'button';
  title: string;
  disabled?: boolean;
}

const Button: FunctionComponent<ButtonProps> = ({ type, title, disabled = false, children }) => {
  return (
    <button type={type} className={styles.button} disabled={disabled}>
      <span className={styles.icon}>{children}</span>
      {title}
    </button>
  )
}

export default Button;