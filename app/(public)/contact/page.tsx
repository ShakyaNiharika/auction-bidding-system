'use client';

import { MapPin, Phone, Mail, Clock, ShieldCheck, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useCreateInquiry } from '@/hooks/inquiry/useInquiry';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        inquiryType: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const createInquiryMutation = useCreateInquiry();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Simple mock validation
        const newErrors: Record<string, string> = {};
        if (!formData.fullName) newErrors.fullName = "Full Name is required";
        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
        if (!formData.phone) newErrors.phone = "Phone number is required";
        if (!formData.inquiryType) newErrors.inquiryType = "Please select an inquiry type";
        if (!formData.subject) newErrors.subject = "Subject is required";
        if (!formData.message) newErrors.message = "Message is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Handle success
        createInquiryMutation.mutate(formData, {
            onSuccess: () => {
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    inquiryType: '',
                    subject: '',
                    message: ''
                });
            }
        });
    };

    return (
        <div className="min-h-screen bg-[#fffcf5] container mx-auto px-4 py-8">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Get in Touch</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Have questions about your bidding journey? We're here to help! Reach out to us
                        and let's make your auction experience a success.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column: Form */}
                    <div className="lg:col-span-7 bg-white rounded-[32px] border border-gray-100 shadow-2xl p-8 md:p-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">Send us a Message</h2>

                        <form onSubmit={handleSubmit} className="space-y-6 text-left">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm font-bold text-gray-700 block mb-2">Full Name *</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        className={`w-full px-5 py-4 rounded-xl border ${errors.fullName ? 'border-red-400' : 'border-gray-200'} focus:ring-2 focus:ring-[#1b4332]/20 focus:border-[#1b4332] outline-none transition-all placeholder:text-gray-400 text-gray-900`}
                                    />
                                    {errors.fullName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.fullName}</p>}
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-gray-700 block mb-2">Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email address"
                                        className={`w-full px-5 py-4 rounded-xl border ${errors.email ? 'border-red-400' : 'border-gray-200'} focus:ring-2 focus:ring-[#1b4332]/20 focus:border-[#1b4332] outline-none transition-all placeholder:text-gray-400 text-gray-900`}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm font-bold text-gray-700 block mb-2">Phone Number *</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Enter your phone number"
                                        className={`w-full px-5 py-4 rounded-xl border ${errors.phone ? 'border-red-400' : 'border-gray-200'} focus:ring-2 focus:ring-[#1b4332]/20 focus:border-[#1b4332] outline-none transition-all placeholder:text-gray-400 text-gray-900`}
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>}
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-gray-700 block mb-2">Inquiry Type *</label>
                                    <div className="relative">
                                        <select
                                            name="inquiryType"
                                            value={formData.inquiryType}
                                            onChange={handleChange}
                                            className={`w-full px-5 py-4 rounded-xl border ${errors.inquiryType ? 'border-red-400' : 'border-gray-200'} focus:ring-2 focus:ring-[#1b4332]/20 focus:border-[#1b4332] outline-none appearance-none transition-all ${formData.inquiryType ? 'text-gray-900' : 'text-gray-400'}`}
                                        >
                                            <option value="" disabled>Select inquiry type</option>
                                            <option value="General Support" className="text-gray-900">General Support</option>
                                            <option value="Auction Question" className="text-gray-900">Auction Question</option>
                                            <option value="Technical Issue" className="text-gray-900">Technical Issue</option>
                                            <option value="Business Partnership" className="text-gray-900">Business Partnership</option>
                                        </select>
                                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                                    </div>
                                    {errors.inquiryType && <p className="text-red-500 text-xs mt-1 ml-1">{errors.inquiryType}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-700 block mb-2">Subject *</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Enter message subject"
                                    className={`w-full px-5 py-4 rounded-xl border ${errors.subject ? 'border-red-400' : 'border-gray-200'} focus:ring-2 focus:ring-[#1b4332]/20 focus:border-[#1b4332] outline-none transition-all placeholder:text-gray-400 text-gray-900`}
                                />
                                {errors.subject && <p className="text-red-500 text-xs mt-1 ml-1">{errors.subject}</p>}
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-700 block mb-2">Message *</label>
                                <textarea
                                    rows={5}
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us about your inquiry..."
                                    className={`w-full px-5 py-4 rounded-xl border ${errors.message ? 'border-red-400' : 'border-gray-200'} focus:ring-2 focus:ring-[#1b4332]/20 focus:border-[#1b4332] outline-none transition-all placeholder:text-gray-400 text-gray-900 resize-none`}
                                ></textarea>
                                {errors.message && <p className="text-red-500 text-xs mt-1 ml-1">{errors.message}</p>}
                            </div>

                            <button 
                                type="submit" 
                                disabled={createInquiryMutation.isPending}
                                className="w-full py-5 bg-[#1b4332] text-white rounded-xl font-bold hover:bg-[#153427] transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
                            >
                                {createInquiryMutation.isPending ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>

                    {/* Right Column: Info */}
                    <div className="lg:col-span-5 space-y-8">
                        {/* Contact Info Card */}
                        <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl p-8 md:p-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h2>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-[#1b4332]/5 rounded-xl flex items-center justify-center shrink-0">
                                        <MapPin className="text-[#1b4332]" size={22} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Address</h3>
                                        <p className="text-sm text-gray-500 mt-1">Sanepa, Lalitpur Nepal</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-[#1b4332]/5 rounded-xl flex items-center justify-center shrink-0">
                                        <Phone className="text-[#1b4332]" size={22} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Phone</h3>
                                        <p className="text-sm text-gray-500 mt-1">+977-9764801933</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-[#1b4332]/5 rounded-xl flex items-center justify-center shrink-0">
                                        <Mail className="text-[#1b4332]" size={22} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Email</h3>
                                        <p className="text-sm text-gray-500 mt-1">bidsawsome@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-[#1b4332]/5 rounded-xl flex items-center justify-center shrink-0">
                                        <Clock className="text-[#1b4332]" size={22} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Business Hours</h3>
                                        <div className="text-sm text-gray-500 mt-1 space-y-1">
                                            <p>Sunday - Friday: 9:00 AM - 6:00 PM</p>
                                            <p>Saturday: Closed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Guarantee Card */}
                        <div className="bg-[#1b4332]/5 rounded-[32px] border border-[#1b4332]/10 p-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Quick Response Guarantee</h3>
                            <p className="text-sm text-gray-600 leading-relaxed mb-6">
                                We typically respond to all inquiries within 24 hours during business days.
                                For urgent matters, please call us directly.
                            </p>
                            <div className="flex items-center gap-2 text-[#1b4332] font-bold text-sm">
                                <ShieldCheck size={18} />
                                <span>24-hour response time</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
