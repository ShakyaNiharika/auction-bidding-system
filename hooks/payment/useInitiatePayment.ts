/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import toast from "react-hot-toast";

export const useInitiatePayment = () => {
    return useMutation({
        mutationFn: async ({ auctionId }: { auctionId: string }) => {
            const response = await api.post(`payment/initiate`, { auctionId });
            return response.data;
        },
        onSuccess: (data) => {
            if (data.payment_url) {
                // Redirect user to Khalti checkout page
                window.location.href = data.payment_url;
            } else {
                toast.error("Payment URL not found in response");
            }
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || "Failed to initiate payment";
            toast.error(errorMessage);
        },
    });
};
