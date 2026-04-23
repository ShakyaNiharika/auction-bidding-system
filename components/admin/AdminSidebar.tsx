'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Gavel,
    Users,
    Settings,
    ChevronRight,
    LogOut,
    Home,
    Sprout,
    Mail
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminSidebar() {
    const pathname = usePathname();
    const { logout, user } = useAuth();

    const menuItems = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        {
            name: user?.role === 'admin' ? 'All Auctions' : 'Auction Management',
            href: '/dashboard/auctions',
            icon: Gavel
        },
        { name: 'Variety Management', href: '/dashboard/varieties', icon: Sprout },
        // Only show Manage Users/Participants for admin
        ...(user?.role === 'admin' ? [
            {
                name: 'Manage Users',
                href: '/dashboard/users',
                icon: Users
            },
            {
                name: 'Customer Queries',
                href: '/dashboard/queries',
                icon: Mail
            }
        ] : []),
        // { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    ];

    return (
        <aside className="w-72 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
            {/* Logo Area */}
            <div className="p-8">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center p-1.5 shadow-lg shadow-gray-100 group-hover:scale-110 transition-transform border border-gray-100">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={64}
                            height={64}
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-base font-black text-gray-900 leading-none tracking-tight">Bids</span>
                        <span className="text-sm font-bold text-[#1b4332] leading-none mt-0.5 uppercase tracking-widest">Awesome</span>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2">
                <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Main Menu</p>
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                                flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 group
                                ${isActive
                                    ? 'bg-[#1b4332]/5 text-[#1b4332] shadow-sm'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
                            `}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon size={20} className={isActive ? 'text-[#1b4332]' : 'group-hover:text-[#1b4332] transition-colors'} />
                                <span className="font-bold text-sm tracking-tight">{item.name}</span>
                            </div>
                            {isActive && <ChevronRight size={16} />}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-white hover:text-gray-900 transition-all mb-2 font-bold text-sm"
                >
                    <Home size={18} />
                    Back to Website
                </Link>
                <button
                    onClick={() => logout()}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all font-bold text-sm"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </aside>
    );
}
