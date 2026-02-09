'use client';

import Image from 'next/image';
import Button from '@/components/ui/custom-button/Button';
import { Heart, Facebook, Twitter, Mail, Plus, Share2, Timer, ChevronRight, ChevronLeft } from 'lucide-react';
import { useState } from 'react';

// Mock data (should be in a separate file in a real app)
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
        image: "https://www.saveur.com/uploads/2022/03/05/sugarcane-linda-xiao.jpg?format=auto&optimize=high&width=1440",
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

export default function AuctionDetails({ id }: { id?: string }) {
    const item = auctions.find(a => a.id.toString() === id) || auctions[0];
    const [activeImage, setActiveImage] = useState(0);

    const images = [
        item.image,
        "https://images.unsplash.com/photo-1605000797499-95a05a41a4aa?q=80&w=2071&auto=format&fit=crop", // Field
        "https://images.unsplash.com/photo-1555447405-f588c9569080?q=80&w=2070&auto=format&fit=crop", // Machinery
    ];

    return (
        <div className="container mx-auto px-4 py-8">

            {/* Breadcrumb - Reference Style */}
            <div className="flex items-center text-sm text-gray-500 mb-6 gap-2">
                <span>Home</span> <ChevronRight size={14} />
                <span>Auctions</span> <ChevronRight size={14} />
                <span>Heavy Machinery</span> <ChevronRight size={14} />
                <span className="text-gray-900 font-semibold truncate max-w-xs">New Holland 3630 Sugarcane Special</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">

                {/* LEFT COLUMN: Gallery */}
                <div className="w-full lg:w-1/2">
                    {/* Main Image */}
                    <div className="relative w-full h-[400px] md:h-[500px] bg-gray-100 rounded-lg overflow-hidden border border-gray-200 mb-4">
                        <Image
                            src={images[activeImage]}
                            alt="Main product"
                            fill
                            className="object-cover"
                        />
                        {/* Navigation Arrows (Visual only for now) */}
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
                            <button onClick={() => setActiveImage(prev => prev > 0 ? prev - 1 : 2)} className="bg-white/80 p-2 rounded-full hover:bg-white transition shadow-sm">
                                <ChevronLeft size={20} />
                            </button>
                            <button onClick={() => setActiveImage(prev => prev < 2 ? prev + 1 : 0)} className="bg-white/80 p-2 rounded-full hover:bg-white transition shadow-sm">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Thumbnails */}
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {images.map((img, idx) => (
                            <div
                                key={idx}
                                onClick={() => setActiveImage(idx)}
                                className={`relative w-24 h-24 rounded border cursor-pointer ${activeImage === idx ? 'border-[var(--primary)] ring-2 ring-[var(--primary)]/20' : 'border-gray-200 hover:border-gray-300'}`}
                            >
                                <Image src={img} alt="Thumbnail" fill className="object-cover rounded-sm" />
                            </div>
                        ))}
                    </div>

                    {/* Social Share Row */}
                    <div className="flex items-center gap-4 mt-6">
                        <span className="text-sm font-medium text-gray-700">Share:</span>
                        <div className="flex gap-2">
                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700"><Facebook size={16} /></button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-500 text-white hover:bg-sky-600"><Twitter size={16} /></button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700"><Mail size={16} /></button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-600 text-white hover:bg-gray-700"><Plus size={16} /></button>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Details */}
                <div className="w-full lg:w-1/2 space-y-6">

                    {/* Title Area */}
                    <div className="border-b border-gray-200 pb-4">
                        <div className="flex justify-between items-start gap-4">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                                {item.title}
                            </h1>
                            <span className="bg-blue-100 text-[var(--primary)] text-xs font-bold px-2 py-1 rounded uppercase">Active</span>
                        </div>
                    </div>

                    {/* Promo Banner (Using Brand Colors as requested: Blue tint instead of yellow) */}
                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-md">
                        <p className="text-[var(--primary)] font-bold text-sm uppercase">
                            BUY NOW Price DROPS 2% HOURLY until SOLD! (from 4pm-11pm)
                        </p>
                        <p className="text-green-700 text-xs font-semibold mt-1 flex items-center gap-1">
                            <Timer size={14} /> Next price drop in: <span className="font-mono">0d 16h 16m 1s</span>
                        </p>
                    </div>

                    {/* Price Section */}
                    <div className="space-y-1">
                        <p className="text-gray-500 text-sm">Current Price</p>
                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-extrabold text-[var(--primary)]">{item.price}</span>
                            <span className="text-sm text-gray-400 line-through decoration-red-500 decoration-2">Rs. 5,200,000</span>
                            <span className="text-xs text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded">(15% OFF)</span>
                        </div>
                    </div>

                    {/* Action Area */}
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
                        <div className="flex items-center gap-4">
                            <label className="text-sm font-medium text-gray-700">Quantity :</label>
                            <select className="border border-gray-300 rounded px-3 py-2 bg-white text-sm focus:outline-none focus:border-[var(--primary)]">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>

                        <Button className="w-full h-12 text-lg font-bold bg-[var(--primary)] hover:bg-blue-700 text-white rounded shadow-lg shadow-blue-200">
                            Buy Now
                        </Button>

                        <div className="flex items-center justify-between text-sm pt-2">
                            <span className="text-gray-500">32 users watching</span>
                            <button className="flex items-center gap-1 text-[var(--primary)] hover:underline font-medium">
                                <Plus size={16} /> Add to Watch List
                            </button>
                        </div>
                    </div>

                    {/* Disclaimer Box */}
                    <div className="bg-yellow-50 border border-yellow-200 p-3 rounded text-xs text-yellow-800">
                        <strong>Note:</strong> This item is available for direct purchase. Bidding is optional if you want to secure it immediately.
                    </div>

                    {/* Countdown */}
                    <div className="flex items-center gap-2 text-red-600 font-bold text-lg">
                        <span>Remaining Time:</span>
                        <span className="font-mono">6 Days 22:16:01</span>
                    </div>

                    {/* Specs Table */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden text-sm">
                        <div className="grid grid-cols-2 border-b border-gray-200 bg-gray-50 p-3">
                            <span className="text-gray-500 font-medium">Item #</span>
                            <span className="text-gray-900 font-mono">337603393</span>
                        </div>
                        <div className="grid grid-cols-2 border-b border-gray-200 p-3">
                            <span className="text-gray-500 font-medium">Qty Available</span>
                            <span className="text-gray-900">1 Unit</span>
                        </div>
                        <div className="grid grid-cols-2 border-b border-gray-200 bg-gray-50 p-3">
                            <span className="text-gray-500 font-medium">End Date</span>
                            <span className="text-gray-900">Wednesday, Feb 11, 2026</span>
                        </div>
                        <div className="grid grid-cols-2 p-3">
                            <span className="text-gray-500 font-medium">Start Date</span>
                            <span className="text-gray-900">Wednesday, Feb 04, 2026</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
