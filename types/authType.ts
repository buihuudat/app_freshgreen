import { UserType } from "./userType";

export interface LoginType {
  phone: string;
  password: string;
}

export interface CustomAuthResponse {
  token: string;
  user: UserType;
}

export type RegisterType = {
  fullname: {
    firstname: string;
    lastname: string;
  };
  username: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
};
