import React, { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Auth from "../../common/utils/auth";
import Utils from "../../common/utils/utils";
import { addUser, removeUser } from "../../store/actions";
import { Store } from "../../store/types";
import { ITokenData } from "../../common/interfaces/token";
import styles from "./Navigation.module.scss";

const Navigation: FunctionComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: Store) => state.user);

  useEffect(() => {
    if (Auth.isTokenSet()) {
      const decodedToken: ITokenData = jwtDecode(localStorage.getItem("jwtToken") as string);

      if (decodedToken.exp * 1000 < Date.now()) {
        Auth.clearToken();
      } else {
        dispatch(addUser(decodedToken));
      }
    }
  }, []);

  const logout = (): void => {
    dispatch(removeUser());
  }

  return (
    <div className={styles.navigation}>
      <ul className={styles.navigationItems}>
        <li><NavLink exact to="/" activeClassName={styles.active}>Home</NavLink></li>
        {
          Utils.isNotNull(user) ?
            <li><NavLink to="/" onClick={logout}>Log out</NavLink></li> :
            <>
              <li><NavLink to="/login" activeClassName={styles.active}>Log in</NavLink></li>
              <li><NavLink to="/register" activeClassName={styles.active}>Register</NavLink></li>
            </>
        }
      </ul>
    </div>
  );
}

export default Navigation;