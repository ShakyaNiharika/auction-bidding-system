/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import api from "../../services/api";
import toast from "react-hot-toast";
import { Auction } from "@/types/auction";

export const useGetAuctions = (
    limit?: number,
    page?: number,
    keyword?: string
): UseQueryResult<any, unknown> => {
    return useQuery({
        queryKey: ["auctions", limit, page, keyword],
        queryFn: async () => {
            try {
                const params: {
                    page?: string;
                    limit?: string;
                    keyword?: string;
                } = {};

                if (page) params.page = page.toString();
                if (limit) params.limit = limit.toString();
                if (keyword) params.keyword = keyword;

                const response = await api.get("auctions", { params });

                return response?.data;
            } catch (error: any) {
                const errorMessage = error?.response?.data?.message || "Failed to fetch auctions";
                toast.error(errorMessage);
                throw new Error(errorMessage);
            }
        },
        retry: false,
    });
};

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
