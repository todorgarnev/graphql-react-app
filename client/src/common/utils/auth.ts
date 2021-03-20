import Utils from "./utils";

export default class Auth {
  public static setToken = (token: string): void => {
    localStorage.setItem("jwtToken", token);
  }

  public static clearToken = (): void => {
    localStorage.removeItem("jwtToken");
  }

  public static isTokenSet = (): boolean => {
    return Utils.isNotNull(localStorage.getItem("jwtToken"));
  }
}