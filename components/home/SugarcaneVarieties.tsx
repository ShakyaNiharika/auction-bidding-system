'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useGetVarieties } from '@/hooks/variety/useVarieties';
import { useRef } from 'react';

export default function SugarcaneVarieties() {
    const router = useRouter();
    const { data: varieties, isLoading } = useGetVarieties();
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    const handleVarietyClick = (name: string) => {
        router.push(`/auctions?variety=${encodeURIComponent(name)}`);
    };

    if (isLoading) {
        return (
            <div className="py-20 flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-[#1b4332]" />
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Loading Varieties...</p>
            </div>
        );
    }

    if (!varieties || varieties.length === 0) return null;

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center mb-16 gap-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Sugarcane Varieties
                    </h2>
                    <p className="text-gray-500 mb-2">
                        खरिद बिक्रीको लागि उपलब्ध गन्नाका उत्कृष्ट प्रजातिहरू
                    </p>
                    <button
                        onClick={() => router.push('/auctions')}
                        className="flex items-center gap-2 text-sm font-black text-[#1b4332] hover:opacity-70 transition-opacity"
                    >
                        View All Auctions <ArrowRight size={18} />
                    </button>
                </div>

                <div className="relative group mx-auto">
                    {/* Navigation Buttons */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#1b4332] hover:scale-110 transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#1b4332] hover:scale-110 transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Slider Container */}
                    <div
                        ref={scrollRef}
                        className="flex gap-8 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2 pt-2 px-4"
                    >
                        {varieties.map((variety) => (
                            <div
                                key={variety._id}
                                onClick={() => handleVarietyClick(variety.name)}
                                className="min-w-[85%] md:min-w-[calc(25%-24px)] lg:min-w-[calc(25%-24px)] snap-center bg-[#f3fbf3] p-10 pt-24 rounded-[3rem] shadow-xl shadow-gray-100/50 flex flex-col items-center text-center cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#1b4332]/10 group relative mt-16"
                            >
                                {/* Floating Image Container */}
                                <div className="absolute -top-20 left-1/2 -translate-x-1/2">
                                    <div className="relative">
                                        <div className="w-44 h-44 rounded-full overflow-hidden border-[12px] border-white shadow-2xl shadow-gray-200">
                                            {variety.image ? (
                                                <img
                                                    src={`${(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '')}${variety.image}`}
                                                    alt={variety.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-200 font-black text-2xl uppercase italic">No Img</div>
                                            )}
                                        </div>
                                        {variety.tag && (
                                            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#1b4332] text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-lg border-4 border-white whitespace-nowrap">
                                                {variety.tag}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <h2 className=" font-black text-[#1b4332] mb-6 mt-6 tracking-tight">
                                    {variety.name}
                                </h2>

                                <p className="text-gray-400 text-sm leading-relaxed mb-10 flex-1 font-medium italic px-4">
                                    "{variety.description || 'Premium sugarcane variety known for high quality and excellent yields in the region.'}"
                                </p>

                                {/* <div className="w-full pt-8 border-t border-gray-50 flex flex-col items-center">
                                    <p className="text-2xl font-black text-[#1b4332] mb-0.5">
                                        {variety.metricValue || '10.5 - 11.2%'}
                                    </p>
                                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                                        {variety.metricLabel || 'Sugar Recovery'}
                                    </p>
                                </div> */}
                            </div>
                        ))}
                    </div>
                </div>

                <style jsx>{`
                    .no-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .no-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                `}</style>
            </div>
        </section>
    );
}

