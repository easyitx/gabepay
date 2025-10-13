import axios, { AxiosError } from "axios";

import { ApiErrorResponse, errorHandler } from "./error";

import type { AxiosResponse, CreateAxiosDefaults } from "axios";

const BASE_CONFIG: CreateAxiosDefaults = {
  baseURL: "https://api.gabepay.ru",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
};

export const $api = axios.create(BASE_CONFIG);

$api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const apiError = errorHandler(error as AxiosError<ApiErrorResponse>);

    // console.error(apiError);

    // handleApiError(apiError);
    return Promise.reject(apiError);
  }
);
