import React, { FunctionComponent } from "react";
import styles from "./Login.module.scss";

interface LoginProps {
  test: string;
};

const Login: FunctionComponent<LoginProps> = () => {
  return (
    <div>
      <h1>Login Page</h1>
    </div>
  );
}

export default Login;