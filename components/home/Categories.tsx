'use client';

import { Factory, Tractor, Wheat, Truck, Sprout, HardHat } from 'lucide-react';
import Link from 'next/link';

const categories = [
    { name: 'Sugar Mills', icon: Factory, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Farmers (Cane)', icon: Wheat, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'Machinery', icon: Tractor, color: 'text-orange-600', bg: 'bg-orange-100' },
    { name: 'Transportation', icon: Truck, color: 'text-purple-600', bg: 'bg-purple-100' },
    { name: 'Fertilizers', icon: Sprout, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { name: 'Labor Force', icon: HardHat, color: 'text-yellow-600', bg: 'bg-yellow-100' },
];

export default function Categories() {
    return (
        <section className="py-16 bg-white border-b border-gray-100">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Browse by Category
                        </h2>
                        <p className="text-gray-500">
                            Find exactly what you need for your sugarcane business.
                        </p>
                    </div>
                    <Link
                        href="/categories"
                        className="hidden md:flex text-[var(--primary)] font-semibold hover:underline items-center gap-1 mt-4 md:mt-0"
                    >
                        View All Categories
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((cat, index) => (
                        <div
                            key={index}
                            className="group p-6 rounded-2xl bg-gray-50 dark:bg-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800 border border-transparent hover:border-gray-200 dark:hover:border-zinc-700 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center gap-4 py-8"
                        >
                            <div className={`w-14 h-14 rounded-full ${cat.bg} ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                <cat.icon size={28} />
                            </div>
                            <span className="font-semibold text-gray-700 dark:text-gray-200 text-sm group-hover:text-[var(--primary)] transition-colors">
                                {cat.name}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link
                        href="/categories"
                        className="text-[var(--primary)] font-semibold hover:underline"
                    >
                        View All Categories
                    </Link>
                </div>
            </div>
        </section>
    );
}
