'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Gavel,
    Users,
    Settings,
    ChevronRight,
    LogOut,
    Home
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Auctions', href: '/dashboard/auctions', icon: Gavel },
    { name: 'Participants', href: '/dashboard/users', icon: Users },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const { logout } = useAuth();

    return (
        <aside className="w-72 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
            {/* Logo Area */}
            <div className="p-8">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-black group-hover:rotate-12 transition-transform">B</div>
                    <span className="text-xl font-black text-gray-900 tracking-tighter italic">BIDS <span className="text-red-600">AWSOME</span></span>
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
                                    ? 'bg-red-50 text-red-600 shadow-sm'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
                            `}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon size={20} className={isActive ? 'text-red-600' : 'group-hover:text-red-600 transition-colors'} />
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
