import React, { ChangeEvent, FunctionComponent } from "react";
import styles from "./Input.module.scss";

interface InputProps {
  type: string;
  name: string;
  value: string;
  placeholder: string
  autoComplete?: string;
  error: boolean;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FunctionComponent<InputProps> = ({
  type,
  name,
  value,
  placeholder,
  autoComplete,
  error,
  onChange
}) => {
  return (
    <input type={type}
           name={name}
           value={value}
           onChange={onChange}
           placeholder={placeholder}
           autoComplete={autoComplete}
           className={`${styles.input} ${error ? styles.error : ""}`} />
  )
}

export default Input;