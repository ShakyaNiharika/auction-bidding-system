/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const useUpdateAuction = (id: string) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: async (data: any) => {
            const response = await api.patch(`auctions/${id}`, data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["auctions"] });
            queryClient.invalidateQueries({ queryKey: ["auction", id] });
            toast.success("Auction updated successfully!");
            router.push("/dashboard/auctions");
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || "Failed to update auction";
            toast.error(errorMessage);
        },
    });
};
