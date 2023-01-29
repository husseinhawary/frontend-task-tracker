import { userRegisterAPI } from "./apis";

export type UserRegisterProps = {
  username: string;
  email: string;
  password: string;
  tasks: []
};

export function userRegisterService(data: UserRegisterProps) {
  return userRegisterAPI(data);
}