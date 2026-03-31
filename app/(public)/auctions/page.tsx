'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetAuctions } from '@/hooks/auction/useAuctionQueries';
import { Auction, AuctionStatus } from '@/types/auction';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/custom-button/Button';
import { MapPin, Calendar, Scale } from 'lucide-react';
import { format } from 'date-fns';

function AuctionsContent() {
    const searchParams = useSearchParams();
    const variety = searchParams.get('variety');
    const status = searchParams.get('status') || undefined;
    
    const { data: auctions, isLoading } = useGetAuctions(
        50, // limit
        1,  // page
        '', // keyword
        variety || undefined,
        status
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case AuctionStatus.ACTIVE: return 'bg-[#1b4332]';
            case AuctionStatus.COMPLETED: return 'bg-gray-600';
            default: return 'bg-[#1b4332]';
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-black text-gray-900 mb-4 uppercase tracking-tight">
                    {variety ? `Auctions for ${variety}` : 'All Sugarcane Auctions'}
                </h1>
                <p className="text-gray-500 font-medium">
                    {auctions?.length || 0} auctions found in the marketplace
                </p>
            </div>

            {auctions?.length === 0 ? (
                <div className="text-center py-24 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
                    <p className="text-xl text-gray-400 font-bold">No auctions found for this criteria.</p>
                    <Link href="/auctions" className="text-[var(--primary)] font-black underline mt-4 inline-block italic">
                        View All Auctions
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {auctions?.map((item: Auction) => (
                        <div
                            key={item._id}
                            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col group"
                        >
                            {/* Image Area */}
                            <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={item?.images?.[0] ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${item.images[0]}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXC5UcPRZHfl0onjgLI7v18HGEV7If7rGZ3g&s"}
                                    alt={item?.title || "Auction Item"}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {/* Status Chip */}
                                <div className={`absolute top-3 left-3 ${getStatusColor(item.status)} text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wide rounded-sm shadow-sm`}>
                                    {item?.status}
                                </div>
                                {/* Variety Badge */}
                                {item.variety && (
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[var(--primary)] text-[10px] font-black px-2 py-1 uppercase tracking-wide rounded-sm shadow-sm border border-gray-100">
                                        {item.variety}
                                    </div>
                                )}
                            </div>

                            {/* Content Area */}
                            <div className="p-4 flex flex-col flex-1">
                                {/* Category/Unit */}
                                <div className="flex items-center gap-2 mb-2 text-xs text-gray-500 uppercase font-bold tracking-wider">
                                    <Scale size={12} strokeWidth={3} />
                                    <span>{item?.quantity} {item?.unit}</span>
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-1 group-hover:text-[var(--primary)] transition-colors">
                                    {item?.title}
                                </h3>

                                {/* Location & Date */}
                                <div className="space-y-1.5 mb-6">
                                    <div className="flex items-center gap-2 text-gray-400 text-[12px] font-medium">
                                        <MapPin size={14} />
                                        <span className="line-clamp-1">{item.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400 text-[12px] font-medium">
                                        <Calendar size={14} />
                                        <span>Ends: {format(new Date(item.end_time), 'MMM d')}</span>
                                    </div>
                                </div>

                                {/* Bottom Row: Price & Action */}
                                <div className="mt-auto flex items-end justify-between">
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight mb-0.5">
                                            Current bid
                                        </p>
                                        <p className="text-lg font-black text-gray-900 leading-tight">
                                            Rs. {item.current_price?.toLocaleString() || item.starting_price?.toLocaleString()}
                                        </p>
                                    </div>
                                    <Link href={`/auctions/${item?._id}`}>
                                        <Button className="bg-[var(--primary)] hover:bg-[#153427] text-white shadow-md shadow-[#1b4332]/20 px-4 rounded-lg font-bold h-10 text-sm">
                                            View Details
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function AuctionsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Suspense fallback={
                <div className="flex justify-center items-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
                </div>
            }>
                <AuctionsContent />
            </Suspense>
        </div>
    );
}
