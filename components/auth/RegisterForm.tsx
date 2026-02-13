'use client';

import Link from 'next/link';
import Button from '@/components/ui/custom-button/Button';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import usePostRegister from '@/hooks/auth/usePostRegister';
import { registerSchema, RegisterFormData } from '@/validations/authValidation';
import * as yup from 'yup';

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();
    const registerMutation = usePostRegister();

    // Form state (extends RegisterFormData to allow empty strings for initial values)
    const [formData, setFormData] = useState<Omit<RegisterFormData, 'role'> & { role: '' | 'buyer' | 'seller' }>({
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

    // Validation errors state
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error on change
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        try {
            await registerSchema.validate(formData, { abortEarly: false });

            // Validation passed — send to API (exclude confirmPassword)
            const { confirmPassword, ...payload } = formData;
            registerMutation.mutate(payload, {
                onSuccess: () => {
                    router.push('/auth/loginPage');
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

    // Helper to get input border class
    const inputClass = (field: string) =>
        `w-full px-4 py-3 rounded-2xl border ${errors[field] ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-900 hover:border-gray-400`;

    return (
        <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-[850px] min-h-[500px] overflow-hidden relative flex flex-col md:flex-row mx-auto">
            {/* Left Side - Form (Pinterest Style) */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center text-center">

                {/* Header */}
                <div className="mb-4 flex flex-col items-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">Registration page</h1>
                    <p className="text-gray-500 text-sm">Create your account to get started</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3 max-w-sm mx-auto w-full text-left">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-medium text-gray-600 ml-1 mb-1 block">First Name</label>
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                placeholder="First name"
                                className={inputClass('first_name')} />
                            {errors.first_name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.first_name}</p>}
                        </div>
                        <div>
                            <label className="text-xs font-medium text-gray-600 ml-1 mb-1 block">Last Name</label>
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                placeholder="Last name"
                                className={inputClass('last_name')} />
                            {errors.last_name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.last_name}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-medium text-gray-600 ml-1 mb-1 block">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className={inputClass('email')} />
                        {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-medium text-gray-600 ml-1 mb-1 block">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Username"
                                className={inputClass('username')} />
                            {errors.username && <p className="text-red-500 text-xs mt-1 ml-1">{errors.username}</p>}
                        </div>
                        <div>
                            <label className="text-xs font-medium text-gray-600 ml-1 mb-1 block">Phone Number</label>
                            <input
                                type="tel"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                placeholder="Phone number"
                                className={inputClass('phone_number')} />
                            {errors.phone_number && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone_number}</p>}
                        </div>
                    </div>

                    <div className="relative">
                        <label className="text-xs font-medium text-gray-600 ml-1 mb-1 block">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            className={inputClass('password')} />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-[30px] text-gray-500 hover:text-gray-700 font-bold text-sm"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>}
                    </div>

                    <div className="relative">
                        <label className="text-xs font-medium text-gray-600 ml-1 mb-1 block">Confirm Password</label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm password"
                            className={inputClass('confirmPassword')} />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-[30px] text-gray-500 hover:text-gray-700 font-bold text-sm"
                        >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 ml-1">{errors.confirmPassword}</p>}
                    </div>

                    <div>
                        <div>
                            <label className="text-xs font-medium text-gray-600 ml-1 mb-1 block">Date of Birth</label>
                            <input
                                type="date"
                                name="date_of_birth"
                                value={formData.date_of_birth}
                                onChange={handleChange}
                                className={inputClass('date_of_birth')} />
                        </div>
                    </div>

                    <div>
                        <div>
                            <label className="text-xs font-medium text-gray-600 ml-1 mb-1 block">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Address"
                                className={inputClass('address')} />
                        </div>
                    </div>

                    {/* Role Field */}
                    <div>
                        <label className="text-xs font-medium text-gray-600 ml-1 mb-1 block">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className={inputClass('role')}
                        >
                            <option value="">Select your role</option>
                            <option value="buyer">Buyer</option>
                            <option value="seller">Seller</option>
                        </select>
                        {errors.role && <p className="text-red-500 text-xs mt-1 ml-1">{errors.role}</p>}
                    </div>

                    <Button
                        type="submit"
                        disabled={registerMutation.isPending}
                        className="w-full py-3 rounded-full text-base font-bold mt-4 bg-red-600 hover:bg-red-700 text-white shadow-none transition-transform active:scale-95 disabled:opacity-50"
                    >
                        {registerMutation.isPending ? 'Creating Account...' : 'Create Account'}
                    </Button>
                </form>

                <div className="mt-6 text-[11px] text-gray-500 leading-tight">
                    <div className="border-t border-gray-200 my-3 w-10 mx-auto"></div>
                    <Link href="/auth/loginPage" scroll={false} replace className="text-gray-800 font-bold hover:underline text-xs">
                        Already have an account? Log in
                    </Link>
                </div>
            </div>

            {/* Right Side - Custom Promo (Pinterest Style) */}
            <div className="hidden md:flex w-[380px] bg-gray-100 flex-col items-center justify-center p-8 relative overflow-hidden">
                {/* Background Image/Graphic */}
                <div className="absolute inset-0 z-0">
                    <div className="w-full h-full bg-slate-50 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_70%)] opacity-10"></div>
                        <div className="grid grid-cols-2 gap-4 -rotate-6 opacity-80">
                            <div className="w-32 h-40 bg-zinc-100 rounded-xl shadow-lg transform -translate-y-8"></div>
                            <div className="w-32 h-40 bg-white rounded-xl shadow-lg transform translate-y-4"></div>
                            <div className="w-32 h-40 bg-white rounded-xl shadow-lg transform translate-y-2"></div>
                            <div className="w-32 h-40 bg-zinc-200 rounded-xl shadow-lg transform -translate-y-6"></div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-center bg-white/80 backdrop-blur-md p-6 rounded-[24px] shadow-sm max-w-[280px]">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Join the Community</h3>
                    <p className="text-xs text-gray-600 mb-4 px-2">
                        Create an account to start bidding and selling. It takes less than a minute.
                    </p>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-2xl">✨</span>
                    </div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-gray-500">Free to Join</p>
                </div>
            </div>
        </div>
    );
}