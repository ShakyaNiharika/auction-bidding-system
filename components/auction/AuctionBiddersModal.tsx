'use client';

import { X, User, Clock, History } from 'lucide-react';
import { useEffect, useCallback } from 'react';
import { useGetAuctionBids } from '@/hooks/auction/useAuctionQueries';

interface AuctionBiddersModalProps {
    isOpen: boolean;
    onClose: () => void;
    auctionId: string;
    auctionTitle: string;
}

export default function AuctionBiddersModal({
    isOpen,
    onClose,
    auctionId,
    auctionTitle,
}: AuctionBiddersModalProps) {
    const { data: bids, isLoading } = useGetAuctionBids(auctionId);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, handleKeyDown]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" 
                onClick={onClose}
            />
            
            {/* Modal Content */}
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in zoom-in-95 fade-in duration-300">
                
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 shrink-0">
                    <div>
                        <div className="flex items-center gap-2 text-[#1b4332] mb-1">
                            <History size={18} />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Bid History</span>
                        </div>
                        <h3 className="text-xl font-black text-gray-900 leading-tight">
                            Bidders for "{auctionTitle}"
                        </h3>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-8">
                    {isLoading ? (
                        <div className="py-20 flex flex-col items-center justify-center gap-4">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1b4332]"></div>
                            <p className="text-gray-500 font-bold animate-pulse">Fetching bid history...</p>
                        </div>
                    ) : bids?.length === 0 ? (
                        <div className="py-20 text-center">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <User className="text-gray-300" size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">No bids yet</h3>
                            <p className="text-gray-500 mt-1">This auction hasn't received any bids from participants yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {bids?.map((bid, index) => (
                                <div 
                                    key={bid._id} 
                                    className={`flex items-center justify-between p-5 rounded-2xl border transition-all hover:shadow-md ${index === 0 ? 'bg-[#1b4332]/5 border-[#1b4332]/20' : 'bg-white border-gray-100'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${index === 0 ? 'bg-[#1b4332] text-white shadow-lg shadow-[#1b4332]/20' : 'bg-gray-100 text-gray-400'}`}>
                                            {index === 0 ? <span className="text-sm font-black">#1</span> : <User size={20} />}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">
                                                {bid.bidder.username}
                                                {index === 0 && <span className="ml-2 text-[10px] font-black uppercase text-[#1b4332] bg-[#1b4332]/10 px-2 py-0.5 rounded-full">Highest</span>}
                                            </p>
                                            <p className="text-xs text-gray-500 font-medium">
                                                {bid.bidder.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-black text-gray-900 leading-none mb-1">
                                            Rs. {bid.amount.toLocaleString()}
                                        </p>
                                        <div className="flex items-center justify-end gap-1.5 text-gray-400">
                                            <Clock size={12} />
                                            <span className="text-[10px] font-bold uppercase tracking-tighter">
                                                {new Date(bid.bid_time).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-xs text-gray-500 font-bold">Total Bids: <span className="text-gray-900">{bids?.length || 0}</span></p>
                    <button 
                        onClick={onClose}
                        className="px-6 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all active:scale-95"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
