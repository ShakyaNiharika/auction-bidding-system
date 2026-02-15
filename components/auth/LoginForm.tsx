'use client';

import Link from 'next/link';
import Button from '@/components/ui/custom-button/Button';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import usePostLogin from '@/hooks/auth/usePostLogin';
import { loginSchema, LoginFormData } from '@/validations/authValidation';
import * as yup from 'yup';

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { mutate: loginMutation, isPending: isLoginLoading } = usePostLogin();

    // Form state
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });

    // Validation errors state
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            await loginSchema.validate(formData, { abortEarly: false });

            // Validation passed — call API
            loginMutation(formData, {
                onSuccess: () => {
                    router.push('/');
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

    return (
        <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-[850px] min-h-[500px] overflow-hidden relative flex flex-col md:flex-row mx-auto">
            {/* Left Side - Form (Pinterest Style: Form is prominent) */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center text-center">

                {/* Header */}
                <div className="mb-4 flex flex-col items-center">
                    {/* Logo Icon */}
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center mb-4">
                        <span className="text-white font-bold text-xl">B</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">Welcome to BIDS</h1>
                    <p className="text-gray-500 text-sm">Find new ideas to try</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3 max-w-sm mx-auto w-full text-left">
                    <div>
                        <label className="text-xs font-medium text-gray-600 ml-1 mb-1 ">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className={`w-full px-4 py-3 rounded-2xl border ${errors.email ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-900 hover:border-gray-400`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
                    </div>

                    <div className="relative">
                        <label className="text-xs font-medium text-gray-600 ml-1 mb-1 block">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className={`w-full px-4 py-3 rounded-2xl border ${errors.password ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-900 hover:border-gray-400`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-[30px] text-gray-500 hover:text-gray-700 font-bold text-sm"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>}
                    </div>

                    <a href="#" className="text-xs font-semibold text-gray-900 block mt-1 hover:underline">Forgot your password?</a>

                    <Button
                        type="submit"
                        disabled={isLoginLoading}
                        className="w-full py-3 rounded-full text-base font-bold mt-4 bg-primary hover:bg-primary/90 text-white shadow-none transition-transform active:scale-95 disabled:opacity-50"
                    >
                        {isLoginLoading ? 'Logging in...' : 'Log in'}
                    </Button>

                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-500 font-medium">OR</span>
                        </div>
                    </div>

                    <button type="button" className="w-full py-2.5 rounded-full border border-gray-300 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors relative font-medium text-slate-700">
                        {/* Google Icon */}
                        <svg className="w-5 h-5 absolute left-4" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </button>
                </form>

                <div className="mt-6 text-[11px] text-gray-500 leading-tight">
                    By continuing, you agree to BIDS&apos;s <a href="#" className="text-gray-800 font-bold hover:underline">Terms of Service</a> and acknowledge you&apos;ve read our <a href="#" className="text-gray-800 font-bold hover:underline">Privacy Policy</a>.
                    <div className="border-t border-gray-200 my-3 w-10 mx-auto"></div>
                    <Link href="/auth/registration" scroll={false} replace className="text-gray-800 font-bold hover:underline text-xs">
                        Not on BIDS yet? Sign up
                    </Link>
                </div>
            </div>

            {/* Right Side - Custom Promo (Pinterest Style) */}
            {/* Hidden on mobile, takes about 45% width on desktop */}
            <div className="hidden md:flex w-[380px] bg-gray-100 flex-col items-center justify-center p-8 relative overflow-hidden">
                {/* Background Image/Graphic */}
                <div className="absolute inset-0 z-0">
                    {/* Abstract simple pattern for "BIDS" */}
                    <div className="w-full h-full bg-slate-50 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_70%)] opacity-10"></div>
                        <div className="grid grid-cols-2 gap-4 rotate-12 opacity-80">
                            <div className="w-32 h-40 bg-white rounded-xl shadow-lg transform translate-y-8"></div>
                            <div className="w-32 h-40 bg-zinc-200 rounded-xl shadow-lg"></div>
                            <div className="w-32 h-40 bg-zinc-100 rounded-xl shadow-lg transform -translate-y-4"></div>
                            <div className="w-32 h-40 bg-white rounded-xl shadow-lg transform translate-y-4"></div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-center bg-white/80 backdrop-blur-md p-6 rounded-[24px] shadow-sm max-w-[280px]">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Bid Instantly</h3>
                    <p className="text-xs text-gray-600 mb-4 px-2">
                        Scan to download the app and start bidding on exclusive items right away.
                    </p>

                    {/* Fake QR Code */}
                    <div className="w-32 h-32 bg-gray-900 mx-auto rounded-xl flex items-center justify-center mb-2">
                        <div className="w-28 h-28 bg-white rounded-lg flex flex-wrap content-center justify-center p-1 gap-1">
                            <div className="w-12 h-12 border-2 border-black rounded-sm border-t-4 border-l-4"></div>
                            <div className="w-12 h-12 border-2 border-black rounded-sm border-t-4 border-r-4"></div>
                            <div className="w-12 h-12 border-2 border-black rounded-sm border-b-4 border-l-4"></div>
                            <div className="w-12 h-12 bg-black rounded-lg"></div>
                        </div>
                    </div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-gray-500">Scan QR Code</p>
                </div>
            </div>
        </div>
    );
}
