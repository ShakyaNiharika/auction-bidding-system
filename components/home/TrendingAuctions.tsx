'use client';

import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/custom-button/Button';
import { useGetAuctions } from '@/hooks/auction/useAuctionQueries';
import { Auction } from '@/types/auction';

export default function TrendingAuctions() {
    const { data: auctions, isLoading } = useGetAuctions(4, 1);

    if (isLoading) {
        return (
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="h-8 w-48 bg-gray-200 animate-pulse rounded mb-10" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white rounded-xl h-80 animate-pulse border border-gray-100" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-gray-50 ">
            <div className="container mx-auto px-4">

                {/* Section Header */}
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Trending Auctions
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Bid on the most popular items in the industry right now.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {auctions?.map((item: Auction) => (
                        <div
                            key={item._id}
                            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col group"
                        >
                            {/* Image Area */}
                            <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                                <Image
                                    src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXC5UcPRZHfl0onjgLI7v18HGEV7If7rGZ3g&s"} // Fallback placeholder since image is missing in schema
                                    alt={item?.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {/* Status Chip */}
                                <div className="absolute top-3 left-3 bg-[var(--primary)] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wide rounded-sm shadow-sm">
                                    {item?.status}
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-4 flex flex-col flex-1">
                                {/* Category/Unit */}
                                <p className="text-xs text-gray-500 uppercase font-medium mb-1 tracking-wide">
                                    {item?.quantity} {item?.unit}
                                </p>

                                {/* Title */}
                                <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-1 group-hover:text-[var(--primary)] transition-colors">
                                    {item?.title}
                                </h3>

                                {/* Bottom Row: Price & Action */}
                                <div className="mt-auto flex items-end justify-between">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-0.5">
                                            Current bid
                                        </p>
                                        <p className="text-lg font-extrabold text-gray-900">
                                            Rs. {item.current_price?.toLocaleString() || item.starting_price?.toLocaleString()}
                                        </p>
                                    </div>
                                    <Link href={`/auctions/${item?._id}`}>
                                        <Button className="bg-[var(--primary)] hover:bg-[#153427] text-white shadow-md shadow-[#1b4332]/20 px-6 rounded-lg font-semibold h-10">
                                            View Details
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {!isLoading && auctions?.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500">No active auctions found at the moment.</p>
                    </div>
                )}

            </div>
        </section>
    );
}
