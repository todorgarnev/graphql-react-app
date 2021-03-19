import React, { FunctionComponent, FormEvent, useState, ChangeEvent } from "react";
import { IRegisterForm } from "../../common/interfaces/register";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import styles from "./Register.module.scss";

const Register: FunctionComponent = () => {
  const [formValue, setFormValue] = useState<IRegisterForm>({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault();
    setFormValue({
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
    console.log(formValue);
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

      <form className={styles.registerForm} onSubmit={(event) => onSubmit(event)} noValidate>
        <Input type="text"
               name="username"
               value={formValue.username}
               onChange={onChange}
               placeholder="username" />
        <Input type="email"
               name="email"
               value={formValue.email}
               onChange={onChange}
               placeholder="email" />
        <Input type="password"
               name="password"
               autoComplete="off"
               value={formValue.password}
               onChange={onChange}
               placeholder="password" />
        <Input type="password"
               name="confirmPassword"
               autoComplete="off"
               value={formValue.confirmPassword}
               onChange={onChange}
               placeholder="confirm password" />

        <Button type="submit" title="Submit" />
      </form>
    </div>
  );
}

export default Register;