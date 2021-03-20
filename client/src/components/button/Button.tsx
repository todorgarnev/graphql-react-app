import React, { FunctionComponent } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  type: 'submit' | 'reset' | 'button';
  title: string;
}

const Button: FunctionComponent<ButtonProps> = ({ type, title, children }) => {
  return (
    <button type={type} className={styles.button}>
      <span className={styles.icon}>{children}</span>
      {title}
    </button>
  )
}

export default Button;