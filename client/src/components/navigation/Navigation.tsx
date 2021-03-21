import React, { FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Auth from "../../common/utils/auth";
import { Store } from "../../store/types";
import styles from "./Navigation.module.scss";

const Navigation: FunctionComponent = () => {
  const user = useSelector((state: Store) => state.user);
  const [isTokenSet, setIsTokenSet] = useState<boolean>(Auth.isTokenSet());

  const logout = (): void => {
    Auth.clearToken();
    setIsTokenSet(false);
  }

  return (
    <div className={styles.navigation}>
      <ul className={styles.navigationItems}>
        <li><NavLink exact to="/" activeClassName={styles.active}>Home</NavLink></li>
        {
          isTokenSet ?
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