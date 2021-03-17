import React, { FunctionComponent } from "react";
import styles from "./Register.module.scss";

interface RegisterProps {
  test: string;
};

const Register: FunctionComponent<RegisterProps> = () => {
  return (
    <div>
      <h1>Register Page</h1>
    </div>
  );
}

export default Register;