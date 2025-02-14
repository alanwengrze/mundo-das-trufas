import axios, { AxiosError} from "axios";
import { toast } from "sonner";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Interceptador de respostas para tratar erros automaticamente
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ error: string }>) => {
    // Captura a mensagem de erro enviada pelo backend
    const errorMessage = error.response?.data?.error || "Ocorreu um erro inesperado";

    // Exibe a mensagem de erro no toast
    toast.error(errorMessage);

    // Rejeita a promessa para que o erro ainda possa ser capturado se necessário
    return Promise.reject(error);
  }
);