export interface ILogin {
  username: string;
  password: string;
}

export interface ILoginResponse {
  id: string;
  email: string;
  username: string;
  createdAt: string;
  token: string;
}