import React, { FunctionComponent, FormEvent, useState, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LogIn, Loader } from 'react-feather';
import { ILogin, ILoginResponse } from "../../common/interfaces/login";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import { LOGIN_USER } from "./graphql/mutations";
import { IServerError } from "../../common/interfaces/error";
import Utils from "../../common/utils/utils";
import Errors from "../../components/errors/Errors";
import styles from "./Login.module.scss";

const Login: FunctionComponent = () => {
  const history = useHistory();
  const [errors, setErrors] = useState<IServerError>({});
  const [formValue, setFormValue] = useState<ILogin>({ username: "", password: "" });
  const [loginUser, { loading }] = useMutation<ILoginResponse, ILogin>(LOGIN_USER, {
    update(proxy, result) {
      history.push("/");
    },
    onError(err) {
      if (err.graphQLErrors[0].extensions) {
        setErrors(err.graphQLErrors[0].extensions.exception.errors);
      }
    },
    variables: formValue
  });

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault();
    loginUser();
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }

  return (
    <div className={styles.login}>
      <h1 className={styles.title}>Login</h1>

      {
        loading ? <Loader className={styles.loading} /> :
          <form className={styles.loginForm} onSubmit={(event) => onSubmit(event)} noValidate>
            <Input type="text"
                   name="username"
                   value={formValue.username}
                   onChange={onChange}
                   error={Boolean(errors.username)}
                   placeholder="username" />
            <Input type="password"
                   name="password"
                   autoComplete="off"
                   value={formValue.password}
                   onChange={onChange}
                   error={Boolean(errors.password)}
                   placeholder="password" />

            <Button type="submit" title="Login">
              <LogIn />
            </Button>
          </form>
      }

      { Utils.isArrayNotEmpty(Object.keys(errors)) && <Errors errors={Object.values(errors)} />}
    </div>
  );
}

export default Login;