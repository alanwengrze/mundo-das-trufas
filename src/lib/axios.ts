import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "sonner";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

api.interceptors.response.use(
  (response: AxiosResponse <{ message: string }>) => {
    if(response.data?.message){
      toast.success(response.data.message);
    }
    return response;
  },

  (error: AxiosError<{ error: string }>) => {

    const errorMessage = error.response?.data?.error || "Ocorreu um erro inesperado";

    toast.error(errorMessage);

    return Promise.reject(error);
  }
);