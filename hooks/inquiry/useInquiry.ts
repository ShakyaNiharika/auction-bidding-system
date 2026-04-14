/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";
import toast from "react-hot-toast";

export const useCreateInquiry = () => {
    return useMutation({
        mutationFn: async (data: any) => {
            const response = await api.post("inquiry", data);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Message sent successfully! We'll get back to you soon.");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to send message");
        }
    });
};

export const useGetInquiries = () => {
    return useQuery({
        queryKey: ["inquiries"],
        queryFn: async () => {
            const response = await api.get("inquiry");
            return response.data;
        }
    });
};

export const useUpdateInquiryStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, status }: { id: string; status: string }) => {
            const response = await api.patch(`inquiry/${id}/status`, { status });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["inquiries"] });
            toast.success("Inquiry status updated");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to update status");
        }
    });
};

export const useDeleteInquiry = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await api.delete(`inquiry/${id}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["inquiries"] });
            toast.success("Inquiry deleted successfully");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to delete inquiry");
        }
    });
};
