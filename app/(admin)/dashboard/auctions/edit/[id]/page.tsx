'use client';

import { useParams } from 'next/navigation';
import { useGetAuctionById } from '@/hooks/auction/useAuctionQueries';
import CreateAuctionForm from '@/components/admin/CreateAuctionForm';

export default function EditAuctionPage() {
    const params = useParams();
    const id = params.id as string;

    const { data: auction, isLoading } = useGetAuctionById(id);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-20 gap-4">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1b4332]"></div>
                <p className="text-gray-500 font-bold animate-pulse">Fetching auction data...</p>
            </div>
        );
    }

    if (!auction) {
        return (
            <div className="p-20 text-center">
                <p className="text-[#1b4332] font-bold text-xl">Auction not found</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-extrabold text-gray-900">Edit Auction</h1>
                <p className="text-gray-500 mt-2">Update the details of your auction listing below.</p>
            </div>

            <CreateAuctionForm initialData={auction} id={id} />
        </div>
    );
}
