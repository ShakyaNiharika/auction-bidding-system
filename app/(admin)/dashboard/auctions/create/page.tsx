'use client';

import CreateAuctionForm from "@/components/admin/CreateAuctionForm";

export default function CreateAuctionPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-extrabold text-gray-900">Create New Auction</h1>
                <p className="text-gray-500 mt-2">Fill in the details below to list your item for bidding.</p>
            </div>

            <CreateAuctionForm />
        </div>
    );
}
