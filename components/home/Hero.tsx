'use client';

import Link from 'next/link';
import Button from '@/components/ui/custom-button/Button';
import { Play, Search, ChevronDown } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative w-full h-[600px] min-h-[500px] flex items-center overflow-hidden">
            {/* Background Image with Brand Color Overlay */}
            <div className="absolute inset-0 z-0">
                <div
                    className="w-full h-full bg-cover bg-center bg-no-repeat transform scale-105 animate-in fade-in zoom-in duration-[2s]"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1605000797499-95a05a41a4aa?q=80&w=2071&auto=format&fit=crop")',
                    }}
                ></div>
                {/* Overlay - Using Brand Colors (Darkish Blue/Slate mix to match reference but keep brand identity) */}
                <div className="absolute inset-0 bg-slate-900/80 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/40 to-black/60"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 flex flex-col justify-center h-full pt-20">
                <div className="max-w-4xl space-y-10 animate-in slide-in-from-bottom-10 fade-in duration-1000">

                    {/* Headline */}
                    <div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-2">
                            Join Our Next Auction! Find <br />
                            Your Sugarcane Deal
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mt-4 opacity-90">
                            Directly connect with Nepal's farmers and mills. Fair prices, authentic produce.
                        </p>
                    </div>

                    {/* Search Bar Container */}
                    <div className="bg-white p-2 rounded lg:rounded-md shadow-2xl max-w-2xl flex flex-col md:flex-row items-center gap-2">

                        {/* Category Dropdown */}
                        <div className="relative w-full md:w-48 border-b md:border-b-0 md:border-r border-gray-200">
                            <button className="w-full h-12 px-4 flex items-center justify-between text-gray-700 hover:text-[var(--primary)] transition-colors font-medium text-sm">
                                <span>All Categories</span>
                                <ChevronDown size={16} />
                            </button>
                        </div>

                        {/* Input */}
                        <div className="flex-1 w-full relative">
                            <input
                                type="text"
                                placeholder="I'm Looking for..."
                                className="w-full h-12 px-4 text-gray-800 placeholder:text-gray-400 focus:outline-none text-sm"
                            />
                        </div>

                        {/* Search Button */}
                        <Button className="w-full md:w-auto px-8 h-12 bg-gray-900 hover:bg-black text-white rounded font-bold uppercase tracking-wider text-xs shadow-none">
                            Search
                        </Button>
                    </div>

                    {/* Video CTA */}
                    {/* <div className="flex items-center gap-4 pt-4 group cursor-pointer">
                        <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Play size={20} className="text-white ml-1 fill-white" />
                        </div>
                        <div className="text-white">
                            <p className="text-[10px] font-bold tracking-widest uppercase opacity-70 mb-0.5">We are running our summer discount</p>
                            <p className="text-xs font-bold border-b border-white/40 pb-0.5 inline-block group-hover:border-white transition-colors">WATCH VIDEO TO LEARN MORE</p>
                        </div>
                    </div> */}

                </div>
            </div>
        </section>
    );
}
