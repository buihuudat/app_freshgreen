import axiosClient from "./axiosClient";

export const payApi = {
  payment: (amount: number) => axiosClient.post("/payment/secret", { amount }),
};
