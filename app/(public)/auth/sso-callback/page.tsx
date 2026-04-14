'use client';

import { useEffect, Suspense, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

function SSOCallback() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();
    const handledRef = useRef(false);

    useEffect(() => {
        if (handledRef.current) return;
        const token = searchParams.get('token');
        const userDataStr = searchParams.get('user');

        if (token && userDataStr) {
            handledRef.current = true;
            try {
                const userData = JSON.parse(decodeURIComponent(userDataStr));
                
                // Use the login function from AuthContext to store token and user data
                login(userData, token);
                
                toast.success('SSO Login successful!');
                
                // Redirect based on role (similar to usePostLogin)
                if (userData.role === 'seller') {
                    router.push('/dashboard');
                } else {
                    router.push('/');
                }
            } catch (error) {
                console.error('Error parsing SSO user data:', error);
                toast.error('SSO login failed. Please try again.');
                router.push('/auth/loginPage');
            }
        } else {
            toast.error('Invalid SSO callback parameters.');
            router.push('/auth/loginPage');
        }
    }, [searchParams, login, router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600">Completing SSO login...</p>
        </div>
    );
}

export default function SSOCallbackPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SSOCallback />
        </Suspense>
    );
}
