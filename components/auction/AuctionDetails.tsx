'use client';

import Image from 'next/image';
import Button from '@/components/ui/custom-button/Button';
import { Heart, Facebook, Twitter, Mail, Plus, Share2, Timer, ChevronRight, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { useGetAuctionById } from '@/hooks/auction/useAuctionById';

export default function AuctionDetails({ id }: { id?: string }) {
    const { data: item, isLoading, error } = useGetAuctionById(id || '');
    const [activeImage, setActiveImage] = useState(0);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8 animate-pulse">
                <div className="h-6 w-64 bg-gray-200 rounded mb-6" />
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-1/2 h-[500px] bg-gray-200 rounded-lg" />
                    <div className="w-full lg:w-1/2 space-y-6">
                        <div className="h-10 w-full bg-gray-200 rounded" />
                        <div className="h-32 w-full bg-gray-200 rounded" />
                        <div className="h-20 w-full bg-gray-200 rounded" />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !item) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold text-gray-900">Auction Not Found</h2>
                <p className="text-gray-500 mt-2">The auction you are looking for does not exist or has been removed.</p>
            </div>
        );
    }

    const images = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXC5UcPRZHfl0onjgLI7v18HGEV7If7rGZ3g&s", // Placeholder
        "https://images.unsplash.com/photo-1605000797499-95a05a41a4aa?q=80&w=2071&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1555447405-f588c9569080?q=80&w=2070&auto=format&fit=crop",
    ];

    const currentPrice = item.current_price || item.starting_price;

    return (
        <div className="container mx-auto px-4 py-8">

            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500 mb-6 gap-2">
                <span>Home</span> <ChevronRight size={14} />
                <span>Auctions</span> <ChevronRight size={14} />
                <span className="text-gray-900 font-semibold truncate max-w-xs">{item.title}</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">

                {/* LEFT COLUMN: Gallery */}
                <div className="w-full lg:w-1/2">
                    {/* Main Image */}
                    <div className="relative w-full h-[400px] md:h-[500px] bg-gray-100 rounded-lg overflow-hidden border border-gray-200 mb-4">
                        <Image
                            src={images[activeImage]}
                            alt={item.title}
                            fill
                            className="object-cover"
                        />
                        {/* Navigation Arrows */}
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
                            <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${item.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                {item.status}
                            </span>
                        </div>
                        <p className="text-gray-600 mt-2 text-sm">{item.description}</p>
                    </div>

                    {/* Price Section */}
                    <div className="space-y-1">
                        <p className="text-gray-500 text-sm">Current Price</p>
                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-extrabold text-[var(--primary)]">Rs. {currentPrice.toLocaleString()}</span>
                            {item.starting_price < currentPrice && (
                                <span className="text-sm text-gray-400 line-through">Rs. {item.starting_price.toLocaleString()}</span>
                            )}
                        </div>
                    </div>

                    {/* Action Area */}
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
                        <div className="flex items-center gap-4">
                            <label className="text-sm font-medium text-gray-700">Quantity ({item.unit}) :</label>
                            <span className="font-bold">{item.quantity}</span>
                        </div>

                        <Button className="w-full h-12 text-lg font-bold bg-[var(--primary)] hover:bg-blue-700 text-white rounded shadow-lg shadow-blue-200">
                            Place Bid
                        </Button>

                        <div className="flex items-center justify-between text-sm pt-2">
                            <span className="text-gray-500">Location: {item.location}</span>
                            <button className="flex items-center gap-1 text-[var(--primary)] hover:underline font-medium">
                                <Plus size={16} /> Add to Watch List
                            </button>
                        </div>
                    </div>

                    {/* Countdown / Timers */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-red-600 font-bold text-lg">
                            <Timer size={20} />
                            <span>Ends: {new Date(item.end_time).toLocaleString()}</span>
                        </div>
                        <div className="text-gray-500 text-sm italic">
                            Started: {new Date(item.start_time).toLocaleString()}
                        </div>
                    </div>

                    {/* Specs Table */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden text-sm">
                        <div className="grid grid-cols-2 border-b border-gray-200 bg-gray-50 p-3">
                            <span className="text-gray-500 font-medium">Seller</span>
                            <span className="text-gray-900 font-bold">{item.seller.username}</span>
                        </div>
                        <div className="grid grid-cols-2 border-b border-gray-200 p-3">
                            <span className="text-gray-500 font-medium">Qty Available</span>
                            <span className="text-gray-900">{item.quantity} {item.unit}</span>
                        </div>
                        <div className="grid grid-cols-2 border-b border-gray-200 bg-gray-50 p-3">
                            <span className="text-gray-500 font-medium">Harvest Date</span>
                            <span className="text-gray-900">{new Date(item.harvest_date).toLocaleDateString()}</span>
                        </div>
                        <div className="grid grid-cols-2 p-3">
                            <span className="text-gray-500 font-medium">Auction Start</span>
                            <span className="text-gray-900">{new Date(item.start_time).toLocaleString()}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
