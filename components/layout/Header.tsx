'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Button from '../ui/custom-button/Button';

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'How It Works', href: '/how-it-works' },
    // { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    // Check which auth page is active
    const isLoginPage = pathname === '/auth/loginPage';
    const isRegistrationPage = pathname === '/auth/registration';

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-gray-900 hidden sm:inline-block">
                                BIDS AWSOME
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

                        {/* Auth Buttons */}
                        <div className="flex items-center space-x-2">
                            {/* Sign In Button */}
                            {/* <Link
                                href="/auth/loginPage"
                                scroll={false}
                            >
                                <Button
                                    variant={isLoginPage ? "primary" : "outline"}
                                    size="sm"
                                    className={`transition-all duration-200 ${isLoginPage ? 'shadow-md' : ''}`}
                                >
                                    <span className={isLoginPage ? 'text-white' : 'text-primary'}>
                                        Sign In
                                    </span>
                                </Button>
                            </Link> */}
                            <Link
                                href="/auth/loginPage"
                                scroll={false}
                            >
                                <Button
                                    variant="primary"
                                    size="sm"
                                >
                                    <span>Sign In</span>
                                </Button>
                            </Link>

                            {/* Sign Up Button */}
                            <Link
                                href="/auth/registration"
                                scroll={false}
                            >
                                <Button
                                    variant={isRegistrationPage ? "primary" : "outline"}
                                    size="sm"
                                    className={`transition-all duration-200 ${isRegistrationPage ? 'shadow-md' : ''}`}
                                >
                                    <span className={isRegistrationPage ? 'text-white' : 'text-primary'}>
                                        Sign Up
                                    </span>
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        {/* <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-gray-600 hover:text-gray-900 md:hidden"
                        >
                            {isMenuOpen ? 'X' : '☰'}
                        </button> */}
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t py-4">
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
                            <div className="pt-4 space-y-3">
                                <Link
                                    href="/auth/loginPage"
                                    scroll={false}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="w-full"
                                >
                                    <Button
                                        variant={isLoginPage ? "primary" : "outline"}
                                        className="w-full"
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
                                        className="w-full"
                                    >
                                        <span className={isRegistrationPage ? 'text-white' : 'text-primary'}>
                                            Sign Up
                                        </span>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}