'use client';

import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/custom-button/Button';

// Extended mock data with Sugarcane theme
const auctions = [
    {
        id: 1,
        title: "JCaneBid Nepal ",
        category: "Small",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC-3kbPmGp8pnHxXE40qCc8Ew6YQvjOjSeMQ&s",
        price: "Rs. 10,500",
        label: "Starting bid",
        tag: "Sale!"
    },
    {
        id: 2,
        title: "Sugarcane Crusher",
        category: "Large",
        image: "https://www.saveur.com/uploads/2022/03/05/sugarcane-linda-xiao.jpg?format=auto&optimize=high&width=1440", // Industrial-like background, placeholder
        price: "Rs. 4,200",
        label: "Starting bid",
        tag: null
    },
    {
        id: 3,
        title: "Sugarcane Auction Hub",
        category: "Medium",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXC5UcPRZHfl0onjgLI7v18HGEV7If7rGZ3g&s",
        price: "Rs. 2,100",
        label: "Current bid",
        tag: null
    },
    {
        id: 4,
        title: "Sugarcane Crusher",
        category: "Large",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXC5UcPRZHfl0onjgLI7v18HGEV7If7rGZ3g&s",
        price: "Rs. 15,000",
        label: "Starting bid",
        tag: "Hot"
    }
];

export default function TrendingAuctions() {
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
                    {auctions?.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col group"
                        >
                            {/* Image Area */}
                            <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                                <Image
                                    src={item?.image}
                                    alt={item?.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {/* Tag/Badge */}
                                {item.tag && (
                                    <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wide rounded-sm shadow-sm">
                                        {item?.tag}
                                    </div>
                                )}
                            </div>

                            {/* Content Area */}
                            <div className="p-4 flex flex-col flex-1">
                                {/* Category */}
                                <p className="text-xs text-gray-500 uppercase font-medium mb-1 tracking-wide">
                                    {item?.category}
                                </p>

                                {/* Title */}
                                <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-1 group-hover:text-[var(--primary)] transition-colors">
                                    {item?.title}
                                </h3>

                                {/* Bottom Row: Price & Action */}
                                <div className="mt-auto flex items-end justify-between">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-0.5">
                                            {item.label}
                                        </p>
                                        <p className="text-lg font-extrabold text-gray-900">
                                            {item.price}
                                        </p>
                                    </div>
                                    <Link href={`/auctions/${item?.id}`}>
                                        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 px-6 rounded-lg font-semibold h-10">
                                            View Details
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
