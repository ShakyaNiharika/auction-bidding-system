/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface LoginPayload {
    email: string;
    password: string;
}

interface LoginResponse {
    access_token: string;
    user: {
        id: string;
        email: string;
        username: string;
        role: string;
        first_name: string;
        last_name: string;
    };
}

const usePostLogin = () => {
    const { login } = useAuth();
    const router = useRouter();

    const loginMutation = useMutation<LoginResponse, Error, LoginPayload>({
        mutationFn: async (data: LoginPayload) => {
            try {
                const response = await api.post("auth/login", data);
                console.log(response, "responsee");
                return response?.data;
            } catch (error: any) {
                const errorMessage =
                    error?.response?.data?.message || "Failed to login";
                console.log(errorMessage, "wewew");
                toast.error(errorMessage);
                throw new Error(errorMessage);
            }
        },
        onSuccess: (data: LoginResponse) => {
            // Store user info and token in context
            if (data?.user && data?.access_token) {
                login(data.user, data.access_token);
                toast.success("Login successful!");
                // router.push('/');
                window.location.href = '/';




            }
        },
        onError: (error: Error) => {
            console.error("Login mutation error:", error);
        },
    });

    return loginMutation;
};

export default usePostLogin;
