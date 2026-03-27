'use client';

import { useRouter } from 'next/navigation';
import { Percent, Scale, Sprout, ArrowRight } from 'lucide-react';

const varieties = [
    {
        id: 'CO 0238',
        name: 'CO 0238',
        badge: 'Trending',
        description: 'High sucrose content, ideal for high-volume sugar production, and notably resistant to drought conditions.',
        metricValue: '10.5 - 11.2%',
        metricLabel: 'Sugar Recovery',
        icon: Percent,
        color: 'text-[var(--primary)]',
        borderColor: 'hover:border-[#1b4332]/20',
        accentBg: 'bg-[#1b4332]/5',
    },
    {
        id: 'CO 1148',
        name: 'CO 1148',
        badge: 'In Season',
        description: 'A traditional robust variety known for excellent ratooning ability and tolerance to waterlogging.',
        metricValue: '75-80 Tons',
        metricLabel: 'Average Yield',
        icon: Scale,
        color: 'text-orange-600',
        borderColor: 'hover:border-orange-200',
        accentBg: 'bg-orange-50',
    },
    {
        id: 'Jitpur-5',
        name: 'Jitpur-5',
        badge: 'Local Favorite',
        description: 'Local favorite widely grown in the Terai region, maturing early with excellent weight.',
        metricValue: 'Early Cycle',
        metricLabel: 'Harvesting',
        icon: Sprout,
        color: 'text-[#1b4332]',
        borderColor: 'hover:border-[#1b4332]/20',
        accentBg: 'bg-[#1b4332]/5',
    },
];

export default function SugarcaneVarieties() {
    const router = useRouter();

    const handleVarietyClick = (id: string) => {
        router.push(`/auctions?variety=${id}`);
    };

    return (
        <section className="py-14 bg-white border-t border-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center mb-16 gap-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Sugarcane Varieties
                    </h2>
                    <p className="text-lg text-gray-500 font-medium">
                        खरिद बिक्रीको लागि उपलब्ध गन्नाका उत्कृष्ट प्रजातिहरू
                    </p>
                    <div className="hidden md:block">
                        <button
                            onClick={() => router.push('/auctions')}
                            className="flex items-center gap-2 text-sm font-bold text-[var(--primary)] hover:underline"
                        >
                            View All Auctions <ArrowRight size={16} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-gray-100 rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm">
                    {varieties.map((variety) => (
                        <div
                            key={variety.id}
                            onClick={() => handleVarietyClick(variety.id)}
                            className={`bg-white p-10 flex flex-col transition-all duration-300 cursor-pointer group hover:z-10 relative`}
                        >
                            {/* Accent line on hover */}
                            <div className={`absolute top-0 left-0 w-full h-1 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 bg-[var(--primary)]`} />

                            <div className="flex justify-between items-start mb-10">
                                <div className={`w-14 h-14 rounded-2xl ${variety.accentBg} flex items-center justify-center ${variety.color} transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110`}>
                                    <variety.icon size={28} strokeWidth={2.5} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-[var(--primary)] transition-colors">
                                    {variety.badge}
                                </span>
                            </div>

                            <h3 className="text-3xl font-black text-gray-900 mb-4 group-hover:text-[var(--primary)] transition-colors tracking-tight">
                                {variety.name}
                            </h3>

                            <p className="text-gray-400 text-sm leading-relaxed mb-10 flex-1 font-medium italic">
                                "{variety.description}"
                            </p>

                            <div className="flex items-center justify-between mt-auto">
                                <div>
                                    <p className="text-2xl font-black text-gray-900 mb-0.5">
                                        {variety.metricValue}
                                    </p>
                                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                        {variety.metricLabel}
                                    </p>
                                </div>
                                <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 group-hover:border-[var(--primary)] group-hover:text-[var(--primary)] transition-all duration-300">
                                    <ArrowRight size={18} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 md:hidden text-center">
                    <button
                        onClick={() => router.push('/auctions')}
                        className="text-sm font-bold text-[var(--primary)] underline"
                    >
                        Explore all varieties
                    </button>
                </div>
            </div>
        </section>
    );
}
