'use client';

import { LayoutDashboard, Gavel, Users, TrendingUp, Plus } from 'lucide-react';
import Link from 'next/link';
import { useGetDashboardStats } from '@/hooks/auction/useAuctionQueries';
import { Auction } from '@/types/auction';

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

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-900">Active Auctions</h2>
                        <Link href="/dashboard/auctions/create">
                            <button className="flex items-center gap-2 bg-[#1b4332] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#153427] transition-colors shadow-lg shadow-[#1b4332]/10">
                                <Plus size={18} />
                                Create New
                            </button>
                        </Link>
                    </div>
                    <div className="p-0">
                        {isLoading ? (
                            <div className="p-12 text-center text-gray-500 animate-pulse font-bold">Loading recent items...</div>
                        ) : !stats?.recentActivity || stats.recentActivity.length === 0 ? (
                            <div className="p-12 text-center text-gray-400 font-medium italic">No active auctions found.</div>
                        ) : (
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold tracking-widest">
                                    <tr>
                                        <th className="px-8 py-4">Item</th>
                                        <th className="px-8 py-4">Current Bid</th>
                                        <th className="px-8 py-4">Status</th>
                                        <th className="px-8 py-4">Activity</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {stats?.recentActivity?.map((auction: Auction) => (
                                        <tr key={auction._id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-8 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-gray-100 rounded-xl overflow-hidden">
                                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                            <Gavel size={16} className="text-gray-400" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900">{auction.title}</p>
                                                        <p className="text-xs text-gray-400 font-medium">Qty: {auction.quantity} {auction.unit}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-4 text-sm font-black text-gray-900">
                                                Rs. {auction.current_price?.toLocaleString() || auction.starting_price.toLocaleString()}
                                            </td>
                                            <td className="px-8 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${auction.status === 'active' ? 'bg-[#1b4332]/10 text-[#1b4332]' : 'bg-gray-100 text-gray-500'}`}>
                                                    {auction.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-4 text-sm font-bold text-gray-400">
                                                12 Bids
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* Tasks/Quick Actions */}
                <div className="bg-gray-900 rounded-3xl p-8 text-white">
                    <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
                    <div className="space-y-4">
                        {[
                            { label: 'Edit Profile Info', icon: Users },
                            { label: 'View Analytics', icon: TrendingUp },
                            { label: 'Manage Users', icon: Users },
                        ].map((action, i) => (
                            <button key={i} className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <action.icon size={20} className="text-[#1b4332]" />
                                    <span className="font-bold">{action.label}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
