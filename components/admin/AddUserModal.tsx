'use client';

import { useState } from 'react';
import { X, UserPlus, Eye, EyeOff, Mail, User, Phone, MapPin, Calendar, Briefcase } from 'lucide-react';
import Button from '@/components/ui/custom-button/Button';
import usePostRegister from '@/hooks/auth/usePostRegister';
import { registerSchema, RegisterFormData } from '@/validations/authValidation';
import * as yup from 'yup';

interface AddUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function AddUserModal({ isOpen, onClose, onSuccess }: AddUserModalProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const registerMutation = usePostRegister();

    const [formData, setFormData] = useState<Omit<RegisterFormData, 'role'> & { role: '' | 'buyer' | 'seller' | 'admin' }>({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        phone_number: '',
        password: '',
        confirmPassword: '',
        date_of_birth: '',
        address: '',
        role: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

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
            await registerSchema.validate(formData, { abortEarly: false });

            const { confirmPassword, ...payload } = formData;
            registerMutation.mutate(payload, {
                onSuccess: () => {
                    onSuccess();
                    onClose();
                    // Reset form
                    setFormData({
                        first_name: '',
                        last_name: '',
                        email: '',
                        username: '',
                        phone_number: '',
                        password: '',
                        confirmPassword: '',
                        date_of_birth: '',
                        address: '',
                        role: '',
                    });
                },
            });
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                const fieldErrors: Record<string, string> = {};
                err.inner.forEach((e) => {
                    if (e.path && !fieldErrors[e.path]) {
                        fieldErrors[e.path] = e.message;
                    }
                });
                setErrors(fieldErrors);
            }
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
                            <UserPlus size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 leading-tight">Create New User</h2>
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

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative">
                                <Eye className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                                <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className={inputClass('password')} />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Confirm Password</label>
                            <div className="relative">
                                <Eye className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                                <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" className={inputClass('confirmPassword')} />
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.confirmPassword}</p>}
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
                        <Button type="submit" disabled={registerMutation.isPending} className="flex-1 py-4 rounded-2xl font-black bg-[#1b4332] text-white hover:bg-[#153427] shadow-xl shadow-green-100 disabled:opacity-50 transition-all active:scale-[0.98]">
                            {registerMutation.isPending ? 'Processing...' : 'Create Account'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
