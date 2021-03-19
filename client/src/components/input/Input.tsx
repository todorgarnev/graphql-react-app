import React, { ChangeEvent, FunctionComponent } from "react";
import styles from "./Input.module.scss";

interface InputProps {
  type: string;
  name: string;
  value: string;
  placeholder: string
  autoComplete?: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FunctionComponent<InputProps> = ({
  type,
  name,
  value,
  placeholder,
  autoComplete,
  onChange
}) => {
  return (
    <input type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className={styles.input} />
  )
}

export default Input;