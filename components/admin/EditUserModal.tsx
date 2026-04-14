'use client';

import { useState, useEffect } from 'react';
import { X, Edit2, Mail, User, Phone, MapPin, Calendar, Briefcase } from 'lucide-react';
import Button from '@/components/ui/custom-button/Button';
import { useUpdateUser } from '@/hooks/user/useUserQueries';
import { registerSchema, RegisterFormData } from '@/validations/authValidation';
import * as yup from 'yup';

interface EditUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    userData: any;
}

export default function EditUserModal({ isOpen, onClose, onSuccess, userData }: EditUserModalProps) {
    const updateMutation = useUpdateUser();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        phone_number: '',
        date_of_birth: '',
        address: '',
        role: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (userData) {
            setFormData({
                first_name: userData.first_name || '',
                last_name: userData.last_name || '',
                email: userData.email || '',
                username: userData.username || '',
                phone_number: userData.phone_number || '',
                date_of_birth: userData.date_of_birth ? new Date(userData.date_of_birth).toISOString().split('T')[0] : '',
                address: userData.address || '',
                role: userData.role || '',
            });
        }
    }, [userData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        try {
            // Validate with a partial schema or ignore password requirements
            // For now, simple validation or reuse parts of schema
            updateMutation.mutate({ id: userData._id, data: formData }, {
                onSuccess: () => {
                    onSuccess();
                    onClose();
                },
            });
        } catch (err) {
            console.error('Validation error:', err);
        }
    };

    if (!isOpen) return null;

    const inputClass = (field: string) =>
        `w-full pl-10 pr-4 py-3 bg-gray-50 rounded-2xl border ${errors[field] ? 'border-red-400' : 'border-transparent'} focus:bg-white focus:ring-2 focus:ring-[#1b4332]/10 outline-none transition-all placeholder:text-gray-400 text-sm font-medium text-gray-900`;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose} />
            
            <div className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 fade-in duration-200">
                {/* Header */}
                <div className="px-8 pt-8 pb-6 border-b border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#1b4332]/5 rounded-2xl flex items-center justify-center text-[#1b4332]">
                            <Edit2 size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 leading-tight">Edit User</h2>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Administrator Portal</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all">
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 max-h-[70vh] overflow-y-auto scrollbar-hide">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* First Name */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">First Name</label>
                            <div className="relative">
                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                                <input name="first_name" value={formData.first_name} onChange={handleChange} placeholder="Enter first name" className={inputClass('first_name')} />
                            </div>
                            {errors.first_name && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.first_name}</p>}
                        </div>

                        {/* Last Name */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Last Name</label>
                            <div className="relative">
                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                                <input name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Enter last name" className={inputClass('last_name')} />
                            </div>
                            {errors.last_name && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.last_name}</p>}
                        </div>

                        {/* Username */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Username</label>
                            <div className="relative">
                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                                <input name="username" value={formData.username} onChange={handleChange} placeholder="Choose username" className={inputClass('username')} />
                            </div>
                            {errors.username && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.username}</p>}
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                                <input name="email" value={formData.email} onChange={handleChange} placeholder="user@example.com" className={inputClass('email')} />
                            </div>
                            {errors.email && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.email}</p>}
                        </div>

                        {/* Phone */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                                <input name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="10-digit number" className={inputClass('phone_number')} />
                            </div>
                            {errors.phone_number && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.phone_number}</p>}
                        </div>

                        {/* Role */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Account Role</label>
                            <div className="relative">
                                <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                                <select name="role" value={formData.role} onChange={handleChange} className={inputClass('role')}>
                                    <option value="" className="text-gray-900">Select Role</option>
                                    <option value="buyer" className="text-gray-900">Buyer</option>
                                    <option value="seller" className="text-gray-900">Seller</option>
                                    <option value="admin" className="text-gray-900">Administrator</option>
                                </select>
                            </div>
                            {errors.role && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.role}</p>}
                        </div>

                        {/* Address */}
                        <div className="md:col-span-2 space-y-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Address (Optional)</label>
                            <div className="relative">
                                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                                <input name="address" value={formData.address} onChange={handleChange} placeholder="User address" className={inputClass('address')} />
                            </div>
                        </div>

                        {/* DOB */}
                        <div className="md:col-span-2 space-y-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Date of Birth (Optional)</label>
                            <div className="relative">
                                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                                <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} className={inputClass('date_of_birth')} />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-10">
                        <Button type="button" variant="secondary" onClick={onClose} className="flex-1 py-4 rounded-2xl font-bold bg-gray-50 border-transparent text-gray-600 hover:bg-gray-100">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={updateMutation.isPending} className="flex-1 py-4 rounded-2xl font-black bg-[#1b4332] text-white hover:bg-[#153427] shadow-xl shadow-green-100 disabled:opacity-50 transition-all active:scale-[0.98]">
                            {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
