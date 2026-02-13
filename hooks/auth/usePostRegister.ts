/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import toast from "react-hot-toast";

interface RegisterPayload {
    email: string;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    address?: string;
    date_of_birth?: string;
    role?: string;
}

interface RegisterResponse {
    message: string;
}

const usePostRegister = () => {
    const registerMutation = useMutation<RegisterResponse, Error, RegisterPayload>({
        mutationFn: async (data: RegisterPayload) => {
            try {
                const response = await api.post("auth/register", data);
                return response?.data;
            } catch (error: any) {
                const errorMessage =
                    error?.response?.data?.message || "Failed to register";
                toast.error(errorMessage);
                throw new Error(errorMessage);
            }
        },
        onSuccess: (data: RegisterResponse) => {
            toast.success(data?.message || "Registration successful!");
        },
        onError: (error: Error) => {
            console.error("Registration mutation error:", error);
        },
    });

    return registerMutation;
};

export default usePostRegister;
