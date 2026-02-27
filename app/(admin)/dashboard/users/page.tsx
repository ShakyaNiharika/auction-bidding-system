'use client';

import { useGetParticipants } from '@/hooks/auction/useAuctionQueries';
import { Search, Mail, Calendar } from 'lucide-react';

export default function ParticipantsPage() {
    const { data: participants, isLoading } = useGetParticipants();

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-20 gap-4">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600"></div>
                <p className="text-gray-500 font-bold animate-pulse">Loading participants...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-extrabold text-gray-900">Participants</h1>
                <p className="text-gray-500 mt-2">Manage and view engagement from potential buyers.</p>
            </div>

            {/* Search and Filters */}
            <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        placeholder="Search participants by name or email..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-red-600/20 outline-none transition-all placeholder:text-gray-400"
                    />
                </div>
            </div>

            {/* Participants Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {participants?.map((p: any) => (
                    <div key={p.bidder._id} className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-start justify-between mb-6">
                            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 font-black text-xl">
                                {p.bidder.first_name?.charAt(0) || p.bidder.username?.charAt(0)}
                            </div>
                            <span className="bg-green-100 text-green-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">Active</span>
                        </div>

                        <div className="space-y-1 mb-6">
                            <h3 className="text-xl font-bold text-gray-900">{p.bidder.first_name} {p.bidder.last_name || ''}</h3>
                            <p className="text-sm text-gray-400 font-medium truncate">Interested in: {p.auctionsInteracted.join(', ')}</p>
                        </div>

                        <div className="space-y-3 pt-6 border-t border-gray-50">
                            <div className="flex items-center gap-3 text-gray-500">
                                <Mail size={16} className="text-gray-300" />
                                <span className="text-xs font-bold">{p.bidder.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-500">
                                <Calendar size={16} className="text-gray-300" />
                                <span className="text-xs font-bold font-mono">Last Bid: {new Date(p.lastBidTime).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <button className="w-full mt-8 py-4 bg-gray-50 hover:bg-gray-100 rounded-[20px] text-sm font-black text-gray-900 transition-all flex items-center justify-center gap-2">
                            View Bid History
                            <div className="bg-red-600 text-white w-6 h-6 rounded-lg flex items-center justify-center text-[10px]">
                                {p.totalBids}
                            </div>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
