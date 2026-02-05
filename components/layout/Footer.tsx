import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const footerLinks = {
    Product: [
        { name: 'Features', href: '/features' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'API', href: '/api' },
        { name: 'Documentation', href: '/docs' },
    ],
    Company: [
        { name: 'About', href: '/about' },
        { name: 'Blog', href: '/blog' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
    ],
    Support: [
        { name: 'Help Center', href: '/help' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
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
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center space-x-2 mb-6">
                            <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center">
                                <span className="text-primary font-bold text-xl">N</span>
                            </div>
                            <span className="text-2xl font-bold">NextStore</span>
                        </Link>
                        <p className="text-gray-400 max-w-md mb-6">
                            Building the future of e-commerce with cutting-edge technology
                            and exceptional user experiences.
                        </p>
                        <div className="flex space-x-4">
                            {footerLinks.Connect.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                                        aria-label={item.name}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Links Sections */}
                    {Object.entries(footerLinks)
                        .filter(([key]) => key !== 'Connect')
                        .map(([category, links]) => (
                            <div key={category}>
                                <h3 className="text-lg font-semibold mb-4">{category}</h3>
                                <ul className="space-y-3">
                                    {links.map((link) => (
                                        <li key={link.name}>
                                            <Link
                                                href={link.href}
                                                className="text-gray-400 hover:text-white transition-colors"
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} NextStore. All rights reserved.
                        </p>
                        <div className="flex items-center space-x-6 mt-4 md:mt-0">
                            <Link
                                href="/privacy"
                                className="text-sm text-gray-400 hover:text-white"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms"
                                className="text-sm text-gray-400 hover:text-white"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                href="/cookies"
                                className="text-sm text-gray-400 hover:text-white"
                            >
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm mt-4 text-center md:text-left">
                        Built with Next.js 16, Tailwind CSS, and ❤️
                    </p>
                </div>
            </div>
        </footer>
    );
}