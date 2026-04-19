'use client';

import { useGetMyAuctions, useGetAuctions } from '@/hooks/auction/useAuctionQueries';
import { useDeleteAuction } from '@/hooks/auction/useDeleteAuction';
import { useAuth } from '@/context/AuthContext';
import { Auction } from '@/types/auction';
import { Gavel, Plus, Edit2, Trash2, ExternalLink, User, Users } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import ConfirmModal from '@/components/ui/ConfirmModal';
import AuctionLiveModal from '@/components/auction/AuctionLiveModal';
import AuctionBiddersModal from '@/components/auction/AuctionBiddersModal';

export default function MyAuctionsPage() {
    const { user } = useAuth();
    const isAdmin = user?.role === 'admin';

    const { data: myAuctions, isLoading: loadingMy } = useGetMyAuctions();
    const { data: globalAuctions, isLoading: loadingGlobal } = useGetAuctions();
    const { mutate: deleteAuction, isPending: isDeleting } = useDeleteAuction();
    
    const auctions = isAdmin ? globalAuctions : myAuctions;
    const isLoading = isAdmin ? loadingGlobal : loadingMy;
    
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedAuction, setSelectedAuction] = useState<{ id: string, title: string } | null>(null);
    const [activeTab, setActiveTab] = useState('All');
    const [isLiveModalOpen, setIsLiveModalOpen] = useState(false);
    const [liveAuctionId, setLiveAuctionId] = useState<string | null>(null);
    
    // Bidders Modal state
    const [isBiddersModalOpen, setIsBiddersModalOpen] = useState(false);
    const [biddersAuction, setBiddersAuction] = useState<{ id: string, title: string } | null>(null);

    const handleConfirmDelete = (id: string, title: string) => {
        setSelectedAuction({ id, title });
        setIsConfirmOpen(true);
    };

    const handleViewBidders = (id: string, title: string) => {
        setBiddersAuction({ id, title });
        setIsBiddersModalOpen(true);
    };

    const performDelete = () => {
        if (selectedAuction) {
            deleteAuction(selectedAuction.id, {
                onSuccess: () => {
                    setIsConfirmOpen(false);
                    setSelectedAuction(null);
                }
            });
        }
    };

    const handleViewLive = (id: string) => {
        setLiveAuctionId(id);
        setIsLiveModalOpen(true);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">
                        {isAdmin ? 'All Auctions' : 'My Auctions'}
                    </h1>
                    <p className="text-gray-500 mt-2">
                        {isAdmin 
                            ? 'Manage and monitor all active and past auction listings across the platform.' 
                            : 'Manage and monitor your active and past auction listings.'}
                    </p>
                </div>
                <Link href="/dashboard/auctions/create">
                    <button className="flex items-center gap-2 bg-[#1b4332] text-white px-6 py-3 rounded-2xl font-black shadow-lg shadow-[#1b4332]/10 hover:bg-[#153427] transition-all active:scale-95">
                        <Plus size={20} />
                        New Auction
                    </button>
                </Link>
            </div>

            {/* Filter Bar */}
            <div className="flex gap-4 p-2 bg-gray-100/50 rounded-2xl w-fit">
                {['All', 'Active', 'Sold'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Table Area */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                {isLoading ? (
                    <div className="p-20 flex flex-col items-center justify-center gap-4">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1b4332]"></div>
                        <p className="text-gray-500 font-bold animate-pulse">Loading {isAdmin ? 'all auctions' : 'your auctions'}...</p>
                    </div>
                ) : auctions?.length === 0 ? (
                    <div className="p-20 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Gavel className="text-gray-300" size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">No auctions found</h3>
                        <p className="text-gray-500 mt-1 max-w-xs mx-auto">You haven't created any auctions yet. Start by listing your first item!</p>
                        <Link href="/dashboard/auctions/create">
                            <button className="mt-6 text-[#1b4332] font-black hover:underline">List Item Now</button>
                        </Link>
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-black tracking-widest">
                            <tr>
                                <th className="px-8 py-5">Item Details</th>
                                {isAdmin && <th className="px-8 py-5">Seller</th>}
                                <th className="px-8 py-5">Price Info</th>
                                <th className="px-8 py-5">Status</th>
                                <th className="px-8 py-5">Activity</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {auctions?.filter((auction: Auction) => {
                                if (activeTab === 'Active') return auction.status === 'active';
                                if (activeTab === 'Sold') return auction.status === 'completed';
                                return true;
                            }).map((auction: Auction) => (
                                <tr key={auction._id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-12 h-12 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                                                {auction.images && auction.images.length > 0 ? (
                                                    <img 
                                                        src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${auction.images[0]}`} 
                                                        alt={auction.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                        <Gavel size={20} className="text-gray-400" />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 group-hover:text-[#1b4332] transition-colors">{auction.title}</p>
                                                <p className="text-xs text-gray-500 font-medium">Qty: {auction.quantity} {auction.unit}</p>
                                            </div>
                                        </div>
                                    </td>
                                    {isAdmin && (
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                                    <User size={14} className="text-gray-400" />
                                                </div>
                                                <span className="text-sm font-bold">{(auction.seller as any)?.username}</span>
                                            </div>
                                        </td>
                                    )}
                                    <td className="px-8 py-6">
                                        <div className="space-y-1">
                                            <p className="text-sm font-black text-gray-900">Rs. {auction.current_price?.toLocaleString() || auction.starting_price?.toLocaleString()}</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Start: Rs. {auction.starting_price.toLocaleString()}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${auction.status === 'active' ? 'bg-[#1b4332]/10 text-[#1b4332]' :
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
                                        <div className="flex items-center justify-end gap-2 transition-opacity">
                                            <button
                                                onClick={() => handleViewBidders(auction._id, auction.title)}
                                                title="View Bidders"
                                                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                            >
                                                <Users size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleViewLive(auction._id)}
                                                title="View Live"
                                                className="p-2 text-gray-400 hover:text-[#1b4332] transition-colors"
                                            >
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

            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={performDelete}
                title="Delete Auction"
                message={`Are you sure you want to delete "${selectedAuction?.title}"? This action is permanent and cannot be undone.`}
                confirmText="Delete"
                variant="danger"
                isLoading={isDeleting}
            />

            <AuctionLiveModal
                isOpen={isLiveModalOpen}
                onClose={() => setIsLiveModalOpen(false)}
                auctionId={liveAuctionId || ''}
            />

            <AuctionBiddersModal
                isOpen={isBiddersModalOpen}
                onClose={() => setIsBiddersModalOpen(false)}
                auctionId={biddersAuction?.id || ''}
                auctionTitle={biddersAuction?.title || ''}
            />
        </div>
    );
}
