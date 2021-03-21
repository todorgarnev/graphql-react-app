export interface IUser {
  id: string;
  email: string;
  username: string;
  createdAt: string;
  token: string;
}

export interface Store {
  user: IUser | null;
}