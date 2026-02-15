import api from "@/services/api";
import { Auction } from "@/types/auction";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetAuctionById = (id: string): UseQueryResult<Auction, unknown> => {
    return useQuery({
        queryKey: ["auction", id],
        queryFn: async () => {
            try {
                const response = await api.get(`auctions/${id}`);
                return response?.data;
            } catch (error: any) {
                const errorMessage = error?.response?.data?.message || "Failed to fetch auction details";
                toast.error(errorMessage);
                throw new Error(errorMessage);
            }
        },
        enabled: !!id,
        retry: false,
    });
};