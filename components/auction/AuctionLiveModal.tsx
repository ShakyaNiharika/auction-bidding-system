'use client';

import { X } from 'lucide-react';
import { useEffect, useCallback } from 'react';
import AuctionDetails from './AuctionDetails';

interface AuctionLiveModalProps {
    isOpen: boolean;
    onClose: () => void;
    auctionId: string;
}

export default function AuctionLiveModal({
    isOpen,
    onClose,
    auctionId,
}: AuctionLiveModalProps) {
    
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" 
                onClick={onClose}
            />
            
            {/* Modal Content */}
            <div className="relative w-full max-w-6xl h-[90vh] bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in zoom-in-95 fade-in duration-300">
                
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-4 border-b border-gray-100 shrink-0">
                    <div>
                        <h3 className="text-xl font-black text-gray-900">Live Auction Preview</h3>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">ID: {auctionId}</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body - Scrollable */}
                <div className="flex-1 overflow-y-auto scrollbar-hide py-4 px-2">
                    <AuctionDetails id={auctionId} />
                </div>

                {/* Footer / Status Bar */}
                <div className="px-8 py-3 bg-gray-50 border-t border-gray-100 shrink-0 flex justify-center">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Viewing in preview mode</p>
                </div>
            </div>
        </div>
    );
}
