'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Button from '../ui/custom-button/Button';
import { useAuth } from '@/context/AuthContext';
import { User, LogOut, ChevronDown, UserCircle2, LayoutDashboard } from 'lucide-react';
import NotificationBell from './NotificationBell';

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Auctions', href: '/auctions' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Contact', href: '/contact' },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout, isLoading } = useAuth();
    const accountMenuRef = useRef<HTMLDivElement>(null);

    // Close account menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
                setIsAccountMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Check which auth page is active
    const isLoginPage = pathname === '/auth/loginPage';
    const isRegistrationPage = pathname === '/auth/registration';

    // Don't show header on dashboard routes (for Seller isolation)
    if (pathname?.startsWith('/dashboard')) {
        return null;
    }

    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
                                <img 
                                    src="/logo.png" 
                                    alt="Sugarcane Auction Logo" 
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <span className="text-xl font-black text-[#1b4332] hidden sm:inline-block tracking-tight">
                                Sugarcane Auction
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`
                  px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${pathname === item.href
                                        ? 'bg-gray-100 text-black'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                                    }
                `}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Side Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Search Button */}
                        <button className="p-2 text-gray-600 hover:text-gray-900">
                            {/* Search icon */}
                        </button>

                        {/* Auth / Account Buttons */}
                        <div className="flex items-center space-x-2">
                            {!isLoading && user && <NotificationBell />}
                            {!isLoading && user ? (
                                <div className="relative" ref={accountMenuRef}>
                                    <button
                                        onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                                        className="flex items-center space-x-2 px-3 py-2 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 bg-white shadow-sm"
                                    >
                                        <div className="w-7 h-7 bg-red-100 rounded-full flex items-center justify-center">
                                            <User size={16} className="text-red-600 font-bold" />
                                        </div>
                                        <span className="text-sm font-semibold text-gray-700 max-w-[100px] truncate">
                                            {user.username}
                                        </span>
                                        <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${isAccountMenuOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Account Dropdown */}
                                    {isAccountMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in zoom-in duration-200">
                                            <div className="px-3 py-3 border-b border-gray-100 mb-1">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Signed in as</p>
                                                <p className="text-sm font-bold text-gray-900 truncate">{user.email}</p>
                                            </div>

                                            <Link
                                                href="/profile"
                                                onClick={() => setIsAccountMenuOpen(false)}
                                                className="group flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-50 hover:text-red-600 transition-colors"
                                            >
                                                <UserCircle2 className="mr-3 h-5 w-5 text-gray-400 group-hover:text-red-600" />
                                                My Profile
                                            </Link>

                                            {user.role === 'seller' && (
                                                <Link
                                                    href="/dashboard"
                                                    onClick={() => setIsAccountMenuOpen(false)}
                                                    className="group flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors mt-1"
                                                >
                                                    <LayoutDashboard className="mr-3 h-5 w-5 text-gray-400 group-hover:text-red-600" />
                                                    Admin Portal
                                                </Link>
                                            )}

                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setIsAccountMenuOpen(false);
                                                }}
                                                className="group flex w-full items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors mt-1"
                                            >
                                                <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-red-600" />
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : !isLoading ? (
                                <>
                                    <Link
                                        href="/auth/loginPage"
                                        scroll={false}
                                    >
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="font-medium text-gray-600 hover:text-[var(--primary)]"
                                        >
                                            <span>Sign In</span>
                                        </Button>
                                    </Link>

                                    <Link
                                        href="/auth/registration"
                                        scroll={false}
                                    >
                                        <Button
                                            variant={isRegistrationPage ? "primary" : "outline"}
                                            size="sm"
                                            className={`font-bold rounded-full px-5 transition-all duration-200 ${isRegistrationPage ? 'shadow-md' : ''}`}
                                        >
                                            <span className={isRegistrationPage ? 'text-white' : 'text-primary'}>
                                                Sign Up
                                            </span>
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <div className="animate-pulse flex space-x-2">
                                    <div className="h-9 w-24 bg-gray-100 rounded-full"></div>
                                    <div className="h-9 w-24 bg-gray-100 rounded-full"></div>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-gray-600 hover:text-gray-900 md:hidden"
                        >
                            {isMenuOpen ? (
                                <span className="text-xl font-bold">✕</span>
                            ) : (
                                <span className="text-xl">☰</span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t py-4 animate-in slide-in-from-top duration-300">
                        <div className="flex flex-col space-y-3">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`
                    px-3 py-2 rounded-md text-base font-medium
                    ${pathname === item.href
                                            ? 'bg-gray-100 text-black'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                                        }
                  `}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="pt-4 space-y-3 border-t border-gray-100 mt-2">
                                {!user ? (
                                    <>
                                        <Link
                                            href="/auth/loginPage"
                                            scroll={false}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="w-full"
                                        >
                                            <Button
                                                variant={isLoginPage ? "primary" : "outline"}
                                                className="w-full rounded-full font-bold"
                                            >
                                                <span className={isLoginPage ? 'text-white' : 'text-primary'}>
                                                    Sign In
                                                </span>
                                            </Button>
                                        </Link>
                                        <Link
                                            href="/auth/registration"
                                            scroll={false}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="w-full"
                                        >
                                            <Button
                                                variant={isRegistrationPage ? "primary" : "outline"}
                                                className="w-full rounded-full font-bold"
                                            >
                                                <span className={isRegistrationPage ? 'text-white' : 'text-primary'}>
                                                    Sign Up
                                                </span>
                                            </Button>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/profile"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center px-3 py-3 text-base font-medium text-gray-700 bg-gray-50 rounded-xl"
                                        >
                                            <User className="mr-3 h-5 w-5 text-red-600" />
                                            My Profile
                                        </Link>
                                        <button
                                            onClick={() => {
                                                logout();
                                                setIsMenuOpen(false);
                                            }}
                                            className="flex w-full items-center px-3 py-3 text-base font-medium text-white bg-red-600 rounded-xl"
                                        >
                                            <LogOut className="mr-3 h-5 w-5" />
                                            Logout
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
