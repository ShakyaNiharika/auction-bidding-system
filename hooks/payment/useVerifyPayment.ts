/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";

export const useVerifyPayment = () => {
    return useMutation({
        mutationFn: async ({ pidx }: { pidx: string }) => {
            const response = await api.post(`payment/verify`, { pidx });
            return response.data;
        },
    });
};
