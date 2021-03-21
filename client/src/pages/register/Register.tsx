import React, { FunctionComponent, FormEvent, useState, ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { UserPlus } from 'react-feather';
import { IRegister, IRegisterResponse } from "../../common/interfaces/register";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import { REGISTER_USER } from "./graphql/mutations";
import { IServerError } from "../../common/interfaces/error";
import Utils from "../../common/utils/utils";
import Errors from "../../components/errors/Errors";
import Loader from "../../components/loader/Loader";
import { addUser } from "../../store/actions";
import Auth from "../../common/utils/auth";
import { Store } from "../../store/types";
import styles from "./Register.module.scss";

const Register: FunctionComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state: Store) => state.user);
  const [errors, setErrors] = useState<IServerError>({});
  const [formValue, setFormValue] = useState<IRegister>({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [registerUser, { loading }] = useMutation<IRegisterResponse, IRegister>(REGISTER_USER, {
    update(proxy, userData) {
      console.log(userData);
      if (userData.data) {
        dispatch(addUser(userData.data.register));
        Auth.setToken(userData.data.register.token);
        history.push("/");
      }
      history.push("/");
    },
    onError(err) {
      if (err.graphQLErrors[0].extensions) {
        setErrors(err.graphQLErrors[0].extensions.exception.errors);
      }
    },
    variables: formValue
  });

  useEffect(() => {
    if (Utils.isNotNull(user)) {
      history.push("/");
    }
  }, [user]);

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault();
    registerUser();
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }

  return (
    <div className={styles.register}>
      <h1 className={styles.title}>Register</h1>

      {
        loading ? <Loader /> :
          <>
            <form className={styles.registerForm} onSubmit={(event) => onSubmit(event)} noValidate>
              <Input type="text"
                     name="username"
                     value={formValue.username}
                     onChange={onChange}
                     error={Boolean(errors.username)}
                     placeholder="username" />
              <Input type="email"
                     name="email"
                     value={formValue.email}
                     onChange={onChange}
                     error={Boolean(errors.email)}
                     placeholder="email" />
              <Input type="password"
                     name="password"
                     autoComplete="off"
                     value={formValue.password}
                     onChange={onChange}
                     error={Boolean(errors.password)}
                     placeholder="password" />
              <Input type="password"
                     name="confirmPassword"
                     autoComplete="off"
                     value={formValue.confirmPassword}
                     onChange={onChange}
                     error={Boolean(errors.confirmPassword)}
                     placeholder="confirm password" />

              <Button type="submit" title="Submit">
                <UserPlus />
              </Button>
            </form>
            { Utils.isArrayNotEmpty(Object.keys(errors)) && <Errors errors={Object.values(errors)} />}
          </>
      }
    </div>
  );
}

export default Register;