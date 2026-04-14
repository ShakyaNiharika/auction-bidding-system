'use client';

import { LayoutDashboard, Gavel, Users, TrendingUp, Plus } from 'lucide-react';
import Link from 'next/link';
import { useGetDashboardStats } from '@/hooks/auction/useAuctionQueries';
import { Auction } from '@/types/auction';
import { BiddingActivityChart, VarietyDistributionChart } from '@/components/admin/DashboardCharts';

export default function AdminDashboard() {
    const { data: stats, isLoading } = useGetDashboardStats();

    const statsConfig = [
        { label: 'Active Auctions', value: stats?.activeAuctions || '0', icon: Gavel, color: 'text-[#1b4332]', bg: 'bg-[#1b4332]/5' },
        { label: 'Total Participants', value: stats?.totalParticipants || '0', icon: Users, color: 'text-[#1b4332]', bg: 'bg-[#1b4332]/5' },
        { label: 'Total Listings', value: stats?.totalAuctions || '0', icon: TrendingUp, color: 'text-[#1b4332]', bg: 'bg-[#1b4332]/5' },
    ];

    return (
        <div className="space-y-8">
            {/* Header / Welcome */}
            <div>
                <h1 className="text-3xl font-extrabold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500 mt-2">Welcome back! Here's what's happening with your auctions today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statsConfig.map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-6">
                        <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                        <div className="mt-4">
                            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">{stat.label}</h3>
                            <p className="text-2xl font-black text-gray-900 mt-1">{isLoading ? '...' : stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Analytics Grid */}
            <div className="grid grid-cols-1 gap-8">
                {/* Bidding Activity (Bar Chart) */}
                <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-xl font-black text-gray-900 tracking-tight">Bidding Activity</h2>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Last 7 Days Engagement</p>
                        </div>
                        <div className="flex gap-2">
                            <Link href="/dashboard/auctions/create">
                                <button className="flex items-center gap-2 bg-[#1b4332] text-white px-4 py-2 rounded-xl text-xs font-black hover:bg-[#153427] transition-all shadow-lg shadow-[#1b4332]/20">
                                    <Plus size={14} />
                                    Create New
                                </button>
                            </Link>
                            <span className="flex items-center gap-1 text-[10px] font-black text-[#1b4332] bg-[#1b4332]/10 px-2 py-1 rounded-full">
                                <TrendingUp size={12} />
                                +12%
                            </span>
                        </div>
                    </div>
                    <BiddingActivityChart />
                </div>
            </div>

            {/* Bottom Section - Recent List (Wait, no, user said replace active auctions) */}
            {/* But maybe a small "Recent Winners" or something? No, I'll stick to analytics for now. */}

        </div>
    );
}
