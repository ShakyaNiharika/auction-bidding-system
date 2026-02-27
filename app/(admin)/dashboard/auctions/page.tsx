'use client';

import { useGetMyAuctions } from '@/hooks/auction/useAuctionQueries';
import { useDeleteAuction } from '@/hooks/auction/useDeleteAuction';
import { Auction } from '@/types/auction';
import { Gavel, Plus, Edit2, Trash2, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function MyAuctionsPage() {
    const { data: auctions, isLoading } = useGetMyAuctions();
    const { mutate: deleteAuction } = useDeleteAuction();

    const handleConfirmDelete = (id: string, title: string) => {
        if (window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
            deleteAuction(id);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">My Auctions</h1>
                    <p className="text-gray-500 mt-2">Manage and monitor your active and past auction listings.</p>
                </div>
                <Link href="/dashboard/auctions/create">
                    <button className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-2xl font-black shadow-lg shadow-red-200 hover:bg-red-700 transition-all active:scale-95">
                        <Plus size={20} />
                        New Auction
                    </button>
                </Link>
            </div>

            {/* Filter Bar Placeholder */}
            <div className="flex gap-4 p-2 bg-gray-100/50 rounded-2xl w-fit">
                {['All', 'Active', 'Drafts', 'Sold'].map((tab) => (
                    <button key={tab} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${tab === 'All' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                        {tab}
                    </button>
                ))}
            </div>

            {/* Table Area */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                {isLoading ? (
                    <div className="p-20 flex flex-col items-center justify-center gap-4">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600"></div>
                        <p className="text-gray-500 font-bold animate-pulse">Loading your auctions...</p>
                    </div>
                ) : auctions?.length === 0 ? (
                    <div className="p-20 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Gavel className="text-gray-300" size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">No auctions found</h3>
                        <p className="text-gray-500 mt-1 max-w-xs mx-auto">You haven't created any auctions yet. Start by listing your first item!</p>
                        <Link href="/dashboard/auctions/create">
                            <button className="mt-6 text-red-600 font-black hover:underline">List Item Now</button>
                        </Link>
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-black tracking-widest">
                            <tr>
                                <th className="px-8 py-5">Item Details</th>
                                <th className="px-8 py-5">Price Info</th>
                                <th className="px-8 py-5">Status</th>
                                <th className="px-8 py-5">Activity</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {auctions?.map((auction: Auction) => (
                                <tr key={auction._id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                                                {/* Placeholder for real image */}
                                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                    <Gavel size={20} className="text-gray-400" />
                                                </div>
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">{auction.title}</p>
                                                <p className="text-xs text-gray-500 font-medium">Qty: {auction.quantity} {auction.unit}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="space-y-1">
                                            <p className="text-sm font-black text-gray-900">Rs. {auction.current_price?.toLocaleString() || auction.starting_price?.toLocaleString()}</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Start: Rs. {auction.starting_price.toLocaleString()}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${auction.status === 'active' ? 'bg-green-100 text-green-700' :
                                            auction.status === 'draft' ? 'bg-gray-100 text-gray-600' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {auction.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <p className="text-sm font-bold">12 Bids</p>
                                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                            <p className="text-[11px] font-medium">Ends in 2d</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button title="View Live" className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                                                <ExternalLink size={18} />
                                            </button>
                                            <Link href={`/dashboard/auctions/edit/${auction._id}`}>
                                                <button title="Edit" className="p-2 text-gray-400 hover:text-orange-600 transition-colors">
                                                    <Edit2 size={18} />
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => handleConfirmDelete(auction._id, auction.title)}
                                                title="Delete"
                                                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
