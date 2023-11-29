import axios, { AxiosError } from "axios";

export function setupAPIClientTmdb() {
  const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/movie",
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  return api;
}

export function setupAPIClientTmdbSearch() {
  const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/search",
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  return api;
}
