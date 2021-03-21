import { ITokenData } from "../common/interfaces/token";
export interface IUser {
  id: string;
  email: string;
  username: string;
  createdAt: string;
  token: string;
}

export interface Store {
  user: IUser | ITokenData | null;
}