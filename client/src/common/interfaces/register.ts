export interface IRegister {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IRegisterResponse {
  register: {
    id: string;
    email: string;
    username: string;
    createdAt: string;
    token: string;
  }
}