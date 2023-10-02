import { LoginType, RegisterType } from "../../types/authType";
import axiosClient from "./axiosClient";

export const authAPI = {
  login: (payload: LoginType) => axiosClient.post("/auth/login", payload),
  register: (newUser: RegisterType) =>
    axiosClient.post("/auth/register", newUser),
  verifyToken: () => axiosClient.post("/auth/verify-token"),
};
