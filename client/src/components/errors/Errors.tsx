import React, { FunctionComponent } from "react";
import styles from "./Errors.module.scss";

interface ErrorsProps {
  errors: string[];
}

const Errors: FunctionComponent<ErrorsProps> = ({ errors }) => (
  <div className={styles.errorsCcontainer}>
    <ul>
      {
        errors.map((error: string, index: number) => (
          <li key={index}>{error}</li>
        ))
      }
    </ul>
  </div>
);

export default Errors;