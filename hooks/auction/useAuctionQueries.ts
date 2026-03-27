/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import api from "../../services/api";
import toast from "react-hot-toast";
import { Auction } from "@/types/auction";

export const useGetAuctions = (
    limit?: number,
    page?: number,
    keyword?: string,
    variety?: string,
    status?: string
): UseQueryResult<any, unknown> => {
    return useQuery({
        queryKey: ["auctions", limit, page, keyword, variety, status],
        queryFn: async () => {
            try {
                const params: any = {};

                if (page) params.page = page.toString();
                if (limit) params.limit = limit.toString();
                if (keyword) params.keyword = keyword;
                if (variety) params.variety = variety;
                if (status) params.status = status;

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
export const useGetMyAuctions = (): UseQueryResult<Auction[], unknown> => {
    return useQuery({
        queryKey: ["my-auctions"],
        queryFn: async () => {
            try {
                const response = await api.get("auctions/seller/me");
                return response?.data;
            } catch (error: any) {
                const errorMessage = error?.response?.data?.message || "Failed to fetch your auctions";
                toast.error(errorMessage);
                throw new Error(errorMessage);
            }
        },
        retry: false,
    });
};

export const useGetParticipants = (): UseQueryResult<any[], unknown> => {
    return useQuery({
        queryKey: ["participants"],
        queryFn: async () => {
            try {
                const response = await api.get("auctions/participants");
                return response?.data;
            } catch (error: any) {
                const errorMessage = error?.response?.data?.message || "Failed to fetch participants";
                toast.error(errorMessage);
                throw new Error(errorMessage);
            }
        },
        retry: false,
    });
};

export const useGetDashboardStats = (): UseQueryResult<any, unknown> => {
    return useQuery({
        queryKey: ["dashboard-stats"],
        queryFn: async () => {
            try {
                const response = await api.get("auctions/stats/overview");
                return response?.data;
            } catch (error: any) {
                const errorMessage = error?.response?.data?.message || "Failed to fetch dashboard stats";
                toast.error(errorMessage);
                throw new Error(errorMessage);
            }
        },
        retry: false,
    });
};
