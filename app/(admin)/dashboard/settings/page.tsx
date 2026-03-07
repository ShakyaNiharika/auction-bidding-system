'use client';

import { Settings, User, Bell, Shield, CreditCard } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function SettingsPage() {
    const { user } = useAuth();

    const sections = [
        { name: 'Profile Information', desc: 'Update your personal details and business info.', icon: User },
        { name: 'Notifications', desc: 'Manage how you receive updates about your auctions.', icon: Bell },
        { name: 'Security', desc: 'Update your password and account security settings.', icon: Shield },
        { name: 'Payment Methods', desc: 'Manage where you receive funds from successful bids.', icon: CreditCard },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-extrabold text-gray-900">Portal Settings</h1>
                <p className="text-gray-500 mt-2">Manage your account preferences and business settings.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sections.map((section, i) => (
                    <button key={i} className="flex items-start gap-6 p-8 bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all text-left">
                        <div className="p-4 bg-gray-50 rounded-2xl text-gray-400">
                            <section.icon size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{section.name}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed font-medium">{section.desc}</p>
                        </div>
                    </button>
                ))}
            </div>

            <div className="bg-blue-50 p-8 rounded-[32px] border border-blue-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="space-y-1">
                    <h3 className="text-lg font-bold text-blue-900">Advanced Control</h3>
                    <p className="text-sm text-blue-600 font-medium">Reset your API keys or delete your seller account.</p>
                </div>
                <button className="px-8 py-3 bg-white text-blue-600 rounded-2xl text-sm font-black shadow-sm hover:bg-blue-600 hover:text-white transition-all">
                    System Console
                </button>
            </div>
        </div>
    );
}
