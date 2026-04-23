'use client';

import Link from 'next/link';
import Button from '@/components/ui/custom-button/Button';
import { CheckCircle2 } from 'lucide-react';
import { useGetStats } from '@/hooks/user/useUserQueries';

export default function Hero() {
    const { data: stats } = useGetStats();

    return (
        <section className="relative w-full h-[600px] md:h-[700px] flex items-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <div
                    className="w-full h-full bg-cover bg-center bg-no-repeat transform scale-100 transition-transform duration-[10s] hover:scale-105"
                    style={{
                        backgroundImage: 'url("/hero-sugarcane.png")',
                    }}
                ></div>
                {/* Dark natural overlay */}
                <div className="absolute inset-0 bg-black/45"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full flex flex-col items-center justify-center text-center">
                <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">

                    {/* Main Headings */}
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight drop-shadow-xl tracking-tight">
                            खरिद बिक्रीको नयाँ आयाम
                        </h1>
                        <p className="text-lg md:text-2xl font-medium text-white/95 max-w-2xl mx-auto drop-shadow-lg">
                            Fair Price Auctions for Nepal's Sugarcane Farmers
                        </p>
                    </div>

                    {/* Stats Row */}
                    <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-white font-bold text-sm md:text-base">
                        <div className="flex items-center gap-2 drop-shadow-md">
                            <CheckCircle2 className="text-orange-400" size={22} strokeWidth={3} />
                            <span>{stats?.farmers || "40 +"} Farmers Registered</span>
                        </div>
                        <div className="flex items-center gap-2 drop-shadow-md">
                            <CheckCircle2 className="text-orange-400" size={22} strokeWidth={3} />
                            <span>{stats?.mills || "10 +"} Mills Active</span>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6">
                        <Link href="/auctions">
                            <Button className="w-64 h-14 bg-[var(--primary-orange)] hover:bg-orange-600 text-white border-none rounded-lg text-lg font-bold shadow-2xl shadow-orange-900/40 transition-all hover:scale-105 active:scale-95">
                                Start Bidding Now
                            </Button>
                        </Link>
                        <Link href="/auth/registration">
                            <Button variant="outline" className="w-64 h-14 bg-white hover:bg-gray-50 text-gray-900 border-none rounded-lg text-lg font-bold shadow-2xl transition-all hover:scale-105 active:scale-95">
                                List Your Crop
                            </Button>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}
