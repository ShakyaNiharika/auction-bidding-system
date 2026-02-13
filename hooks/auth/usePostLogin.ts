/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import toast from "react-hot-toast";

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
            // Store the access token
            if (data?.access_token) {
                localStorage.setItem("userToken", data.access_token);
            }
            // Store user info
            if (data?.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
            }
            toast.success("Login successful!");
            window.location.href = '/';


        },
        onError: (error: Error) => {
            console.error("Login mutation error:", error);
        },
    });

    return loginMutation;
};

export default usePostLogin;
