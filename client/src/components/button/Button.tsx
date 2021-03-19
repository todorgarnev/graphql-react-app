import React, { ChangeEvent, FunctionComponent } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  type: 'submit' | 'reset' | 'button';
  title: string;
}

const Button: FunctionComponent<ButtonProps> = ({ type, title }) => {
  return (
    <button type={type} className={styles.button}>{title}</button>
  )
}

export default Button;