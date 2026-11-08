import axios, { type AxiosRequestConfig } from 'axios';
import { StorageItems } from '../common/enums/storageItems';
import { RoutePath } from '../common/enums/routePath';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(StorageItems.AUTH_TOKEN);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      !error.config?.url?.includes(`${RoutePath.SIGN_IN}`)
    ) {
      localStorage.removeItem(StorageItems.AUTH_TOKEN);
      window.location.href = RoutePath.SIGN_IN;
    }
    return Promise.reject(error);
  },
);
const get = <R>(url: string, opts?: AxiosRequestConfig) =>
  axiosInstance.get<R>(url, { ...opts });

const post = <R, P = unknown>(
  url: string,
  payload?: P,
  opts?: AxiosRequestConfig,
) =>
  axiosInstance.post<R>(
    url,
    payload === undefined
      ? undefined
      : payload instanceof FormData
        ? payload
        : JSON.stringify(payload),
    {
      headers: { 'Content-Type': 'application/json' },
      ...opts,
    },
  );

const put = <P, R>(url: string, payload?: P, opts?: AxiosRequestConfig) =>
  axiosInstance.put<R>(
    url,
    payload instanceof FormData ? payload : JSON.stringify(payload),
    {
      headers: { 'Content-Type': 'application/json' },
      ...opts,
    },
  );

const patch = <P, R>(url: string, payload?: P, opts?: AxiosRequestConfig) =>
  axiosInstance.patch<R>(
    url,
    payload instanceof FormData ? payload : JSON.stringify(payload),
    {
      headers: { 'Content-Type': 'application/json' },
      ...opts,
    },
  );

const del = (url: string, opts?: AxiosRequestConfig) =>
  axiosInstance.delete(url, { ...opts });

export const requests = { get, post, put, patch, del };
