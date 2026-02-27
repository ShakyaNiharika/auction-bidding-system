/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const useCreateAuction = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: async (data: any) => {
            const response = await api.post("auctions", data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["auctions"] });
            toast.success("Auction created successfully!");
            router.push("/dashboard/auctions");
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || "Failed to create auction";
            toast.error(errorMessage);
        },
    });
};
