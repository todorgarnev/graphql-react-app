import { ITokenData } from "../common/interfaces/token";
import { IUser } from "./types";

export const ADD_USER = "ADD_USER";
export const REMOVE_USER = "REMOVE_USER";

export type ActionTypes = { type: typeof ADD_USER; payload: IUser | ITokenData } | { type: typeof REMOVE_USER };

export const addUser = (user: IUser | ITokenData): ActionTypes => ({ type: ADD_USER, payload: user });
export const removeUser = (): ActionTypes => ({ type: REMOVE_USER });