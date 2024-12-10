import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { IHTTPRequestService } from '../interface/IHTTPRequestService';


export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

function createAxiosService(
  instance: AxiosInstance,
): IHTTPRequestService<AxiosRequestConfig> {
  return {
    get: async <T,>(url: string, config?: AxiosRequestConfig): Promise<T> => {
      const response = await instance.get<T>(url, config);
      return response.data;
    },
    post: async <T, K = unknown>(
      url: string,
      body: K,
      config?: AxiosRequestConfig,
    ): Promise<T> => {
      const response = await instance.post<T>(url, body, config);
      return response.data;
    },
    patch: async <T, K = unknown>(
      url: string,
      body: K,
      config?: AxiosRequestConfig,
    ): Promise<T> => {
      const response = await axiosInstance.patch(url, body, config);
      return response.data;
    },
    put: async <T, K = unknown>(
      url: string,
      body: K,
      config?: AxiosRequestConfig,
    ): Promise<T> => {
      const response = await axiosInstance.put(url, body, config);
      return response.data;
    },
    delete: async <T,>(
      url: string,
      config?: AxiosRequestConfig,
    ): Promise<T> => {
      const response = await axiosInstance.delete<T>(url, config);
      return response.data;
    },
  };
}

export const axiosService = createAxiosService(axiosInstance);
