'use client';

import { useState, useEffect } from 'react';
import { UserProfile, useUpdateProfile } from '@/hooks/user/useProfile';
import Button from '@/components/ui/custom-button/Button';
import { X, Loader2, Camera, User, Mail, Phone, MapPin, Calendar } from 'lucide-react';

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    profile: UserProfile;
}

export default function EditProfileModal({ isOpen, onClose, profile }: EditProfileModalProps) {
    const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
    const [formData, setFormData] = useState({
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone_number: profile.phone_number,
        address: profile.address || '',
        date_of_birth: profile.date_of_birth ? new Date(profile.date_of_birth).toISOString().split('T')[0] : '',
        profile_picture: profile.profile_picture || ''
    });
    const [isUploading, setIsUploading] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setIsUploading(true);
            const file = e.target.files[0];
            const data = new FormData();
            data.append('images', file);

            try {
                const token = localStorage.getItem('userToken');
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/upload`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token}` },
                    body: data
                });
                const result = await res.json();
                if (result.success && result.urls.length > 0) {
                    setFormData(prev => ({ ...prev, profile_picture: result.urls[0] }));
                }
            } catch (err) {
                console.error('Upload failed', err);
            } finally {
                setIsUploading(false);
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile(formData, {
            onSuccess: () => onClose()
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 p-8 sm:p-10 animate-in fade-in zoom-in duration-200">
                <button onClick={onClose} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-all">
                    <X size={20} />
                </button>

                <div className="mb-8">
                    <h3 className="text-2xl font-black text-gray-900">Edit Profile</h3>
                    <p className="text-gray-500 text-sm mt-1">Update your personal information and profile picture.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col items-center mb-8">
                        <label className="relative w-32 h-32 rounded-full border-4 border-white shadow-xl flex flex-col items-center justify-center cursor-pointer hover:opacity-90 transition-all overflow-hidden group">
                            {formData.profile_picture ? (
                                <img 
                                    src={`${(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '')}${formData.profile_picture}`} 
                                    alt="Profile" 
                                    className="w-full h-full object-cover" 
                                />
                            ) : (
                                <div className="w-full h-full bg-red-50 flex items-center justify-center text-red-400">
                                    <User size={48} />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <Camera size={24} className="text-white" />
                            </div>
                            {isUploading && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <Loader2 size={24} className="text-white animate-spin" />
                                </div>
                            )}
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                        </label>
                        <p className="text-[10px] font-bold text-gray-400 mt-3 uppercase tracking-widest text-center">Click to change photo</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <User size={14} className="text-gray-400" /> First Name
                            </label>
                            <input
                                required
                                value={formData.first_name}
                                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                                className="w-full px-5 py-3 text-gray-700 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <User size={14} className="text-gray-400" /> Last Name
                            </label>
                            <input
                                required
                                value={formData.last_name}
                                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                className="w-full px-5 py-3 text-gray-700 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <Phone size={14} className="text-gray-400" /> Phone Number
                            </label>
                            <input
                                required
                                value={formData.phone_number}
                                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                                className="w-full px-5 py-3 text-gray-700 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <Calendar size={14} className="text-gray-400" /> Date of Birth
                            </label>
                            <input
                                type="date"
                                value={formData.date_of_birth}
                                onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                                className="w-full px-5 py-3 text-gray-700 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <MapPin size={14} className="text-gray-400" /> Address
                            </label>
                            <input
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                placeholder="Enter your full address"
                                className="w-full px-5 py-3 text-gray-700 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="pt-6 flex gap-3">
                        <Button type="button" variant="outline" onClick={onClose} className="flex-1 py-4 rounded-2xl font-bold">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isUpdating || isUploading} className="flex-[2] py-4 rounded-2xl font-black text-lg shadow-xl shadow-red-500/10 transition-all">
                            {isUpdating ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
