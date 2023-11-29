import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { AuthtokenError } from "./errors/authTokenError";
import { singOut } from "../context/AuthContext";

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:3003",
    headers: {
      Authorization: `Bearer ${cookies["@nextAuth.token"]}`,
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (typeof window !== undefined) {
          singOut();
        } else {
          return Promise.reject(new AuthtokenError());
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
}
