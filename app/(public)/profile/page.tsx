'use client';

import { useState } from 'react';
import { useGetProfile } from '@/hooks/user/useProfile';
import { useGetMyAuctions, useGetMyBids } from '@/hooks/auction/useAuctionQueries';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/custom-button/Button';
import EditProfileModal from '@/components/profile/EditProfileModal';
import {
    User, Mail, Phone, MapPin, Calendar, Shield,
    Gavel, Award, Clock, Edit3, Loader2, LogOut,
    ExternalLink, Camera
} from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
    const { user: authUser, logout } = useAuth();
    const { data: profile, isLoading, isError } = useGetProfile();
    const { data: myAuctions } = useGetMyAuctions();
    const { data: myBids } = useGetMyBids();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    if (isLoading) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-12 h-12 animate-spin text-red-600" />
                <p className="text-gray-500 font-bold animate-pulse">Loading your profile...</p>
            </div>
        );
    }

    if (isError || !profile) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center gap-6 px-4 text-center">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500">
                    <Shield size={40} />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-gray-900">Session Expired</h2>
                    <p className="text-gray-500 mt-2">Please log in again to view your profile.</p>
                </div>
                <Link href="/auth/loginPage">
                    <Button className="px-8 py-4 rounded-2xl font-black shadow-xl shadow-red-500/10">
                        Go to Login
                    </Button>
                </Link>
            </div>
        );
    }

    const stats = [
        {
            label: profile.role === 'seller' ? 'Active Auctions' : 'Unique Bids',
            value: profile.role === 'seller' ? (myAuctions?.filter(a => a.status === 'active').length || 0) : (myBids?.length || 0),
            icon: Gavel,
            color: 'bg-blue-50 text-blue-600'
        },
        {
            label: profile.role === 'seller' ? 'Total Auctions' : 'Won Auctions',
            value: profile.role === 'seller' ? (myAuctions?.length || 0) : (profile.role === 'admin' ? '—' : '0'),
            icon: Award,
            color: 'bg-green-50 text-green-600'
        },
        {
            label: 'Member Since',
            value: new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            icon: Clock,
            color: 'bg-purple-50 text-purple-600'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 pb-20">
            {/* Header / Banner */}
            <div className="h-48 bg-[#1b4332] relative">
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 sm:left-24 sm:translate-x-0">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-white">
                            {profile.profile_picture ? (
                                <img
                                    src={`${(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '')}${profile.profile_picture}`}
                                    alt={profile.username}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-red-50 flex items-center justify-center text-red-400">
                                    <User size={48} />
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:text-red-500 transition-all active:scale-95"
                        >
                            <Camera size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-20">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Stats & Actions */}
                    <div className="lg:w-1/3 space-y-6">
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 text-center sm:text-left">
                            <h1 className="text-3xl font-black text-gray-900 leading-tight">
                                {profile.first_name} {profile.last_name}
                            </h1>
                            <p className="text-gray-400 font-bold mt-1 flex items-center justify-center sm:justify-start gap-2">
                                @{profile.username}
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                <span className="uppercase tracking-[0.2em] text-[10px] text-red-500 font-black">{profile.role}</span>
                            </p>

                            <div className="mt-8 flex flex-col gap-3">
                                <Button
                                    onClick={() => setIsEditModalOpen(true)}
                                    className="w-full py-4 rounded-2xl font-black shadow-lg shadow-red-500/10 flex items-center justify-center gap-2"
                                >
                                    <Edit3 size={18} />
                                    Edit Profile
                                </Button>
                                {profile.role === 'seller' && (
                                    <Link href="/dashboard">
                                        <Button variant="outline" className="w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
                                            <Shield size={18} />
                                            Seller Dashboard
                                        </Button>
                                    </Link>
                                )}
                                <button
                                    onClick={() => logout()}
                                    className="w-full py-4 rounded-2xl font-bold text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all flex items-center justify-center gap-2 mt-2"
                                >
                                    <LogOut size={18} />
                                    Sign Out
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {stats.map((stat, i) => (
                                <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:border-red-100 transition-all cursor-default">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 ${stat.color}`}>
                                        <stat.icon size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-black tracking-widest text-gray-400">{stat.label}</p>
                                        <p className="text-xl font-black text-gray-900">{stat.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Information Cards */}
                    <div className="lg:w-2/3 space-y-6">
                        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
                            <h2 className="text-xl font-black text-gray-900 mb-8 border-b border-gray-50 pb-6 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
                                    <User size={16} />
                                </div>
                                Personal Information
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <InfoItem
                                    icon={Mail}
                                    label="Email Address"
                                    value={profile.email}
                                    verified={true}
                                />
                                <InfoItem
                                    icon={Phone}
                                    label="Phone Number"
                                    value={profile.phone_number}
                                />
                                <InfoItem
                                    icon={MapPin}
                                    label="Address"
                                    value={profile.address || 'No address added yet'}
                                />
                                <InfoItem
                                    icon={Calendar}
                                    label="Date of Birth"
                                    value={profile.date_of_birth ? new Date(profile.date_of_birth).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Not set'}
                                />
                            </div>
                        </div>



                        {/* Bid History Section */}
                        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
                            <h2 className="text-xl font-black text-gray-900 mb-8 border-b border-gray-50 pb-6 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-[#1b4332]/10 flex items-center justify-center text-[#1b4332]">
                                    <Clock size={16} />
                                </div>
                                Bid History
                            </h2>

                            {!myBids || myBids.length === 0 ? (
                                <div className="text-center py-10">
                                    <p className="text-gray-400 font-medium">You haven't placed any bids yet.</p>
                                    <Link href="/auctions">
                                        <button className="text-[#1b4332] font-black mt-2 hover:underline">Browse Auctions</button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {myBids.map((bid: any) => (
                                        <div key={bid.auction._id} className="flex items-center justify-between p-5 rounded-2xl bg-gray-50/50 border border-gray-100 hover:border-red-100 transition-all group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-white rounded-xl border border-gray-100 overflow-hidden shrink-0 group-hover:scale-110 transition-transform">
                                                    {bid.auction.images?.[0] ? (
                                                        <img
                                                            src={`${(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '')}${bid.auction.images[0]}`}
                                                            alt={bid.auction.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                            <Gavel size={20} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <Link href={`/auctions/${bid.auction._id}`}>
                                                        <p className="font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-tight">
                                                            {bid.auction.title}
                                                        </p>
                                                    </Link>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-sm ${bid.auction.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                                                            }`}>
                                                            {bid.auction.status}
                                                        </span>
                                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                                                            Last bid: {new Date(bid.bidTime).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-black text-gray-900 leading-none mb-1">
                                                    Rs. {bid.myLastBid.toLocaleString()}
                                                </p>
                                                {bid.auction.winner?._id === profile._id ? (
                                                    <span className="text-[10px] font-black uppercase text-green-600">Won</span>
                                                ) : bid.auction.status === 'completed' ? (
                                                    <span className="text-[10px] font-black uppercase text-red-400">Outbid</span>
                                                ) : (
                                                    <span className="text-[10px] font-black uppercase text-blue-500">Your Last Bid</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                profile={profile}
            />
        </div>
    );
}

function InfoItem({ icon: Icon, label, value, verified = false }: any) {
    return (
        <div className="space-y-1.5 group">
            <div className="flex items-center gap-2">
                <Icon size={14} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                <span className="text-[10px] uppercase font-black tracking-widest text-gray-400">{label}</span>
                {verified && (
                    <span className="text-[8px] font-black text-green-500 bg-green-50 px-1.5 py-0.5 rounded-sm uppercase tracking-tighter">Verified</span>
                )}
            </div>
            <p className="text-gray-900 font-bold tracking-tight text-lg pl-5 break-all">
                {value}
            </p>
        </div>
    );
}
