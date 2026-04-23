'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const footerLinks = {
    Navigation: [
        { name: 'Home', href: '/' },
        { name: 'Auctions', href: '/auctions' },
        { name: 'How it Works', href: '/how-it-works' },
        { name: 'Contact Us', href: '/contact' },
    ],
    Legal: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
    ],
    Connect: [
        { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
        { name: 'Facebook', href: 'https://facebook.com', icon: Facebook },
        { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
        { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
        { name: 'GitHub', href: 'https://github.com', icon: Github },
    ],
};

export default function Footer() {
    const pathname = usePathname();

    // Don't show footer on dashboard routes
    if (pathname?.startsWith('/dashboard')) {
        return null;
    }

    return (
        <footer className="bg-[#1b4332] text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand Section */}
                    <div className="lg:col-span-2 space-y-4">
                        <Link href="/" className="flex items-center space-x-3 group w-fit text-white decoration-0 hover:no-underline font-black italic uppercase text-lg">
                            <div className="h-14 w-14 rounded-2xl bg-white p-2 flex items-center justify-center transition-all duration-500 group-hover:rotate-12 group-hover:scale-105 shadow-xl shadow-black/20">
                                <Image 
                                    src="/logo.png" 
                                    alt="Bids Awesome Logo" 
                                    width={64}
                                    height={64}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <span>Bids Awesome</span>
                        </Link>
                        <p className="text-white/60 max-w-sm leading-relaxed text-xs font-medium">
                            The premier digital marketplace for sugarcane auctions. 
                            Connecting farmers and buyers through transparent, 
                            real-time bidding technology.
                        </p>
                        <div className="flex space-x-2.5">
                            {footerLinks.Connect.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
                                        aria-label={item.name}
                                    >
                                        <Icon className="h-4 w-4 text-white/80" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Links Section */}
                    {Object.entries(footerLinks)
                        .filter(([key]) => key !== 'Connect')
                        .map(([category, links]) => (
                            <div key={category} className="space-y-4">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">{category}</h3>
                                <ul className="space-y-2.5">
                                    {links.map((link) => (
                                        <li key={link.name}>
                                            <Link
                                                href={link.href}
                                                className="text-white/70 hover:text-white transition-all duration-300 flex items-center gap-2 group text-xs font-bold decoration-0 hover:no-underline"
                                            >
                                                <div className="w-0 group-hover:w-1 h-1 bg-white rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100" />
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 mt-10 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="space-y-0.5 text-center md:text-left">
                            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">
                                © {new Date().getFullYear()} Bids Awesome. All rights reserved.
                            </p>
                            <p className="text-white/10 text-[8px] font-bold uppercase tracking-tighter">
                                Built with Next.js 15, Tailwind CSS, and ❤️
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
