'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { XCircle } from 'lucide-react';
import Button from '@/components/ui/custom-button/Button';

export default function PaymentFailurePage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 text-center space-y-6">
                <div className="flex flex-col items-center">
                    <XCircle className="w-20 h-20 text-red-500 mb-4" />
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Payment Cancelled</h2>
                    <p className="text-gray-600 mb-6">You cancelled the payment process. You can try again from the auction details page.</p>
                    <Button
                        onClick={() => router.push('/auctions')}
                        className="w-full bg-[var(--primary)] hover:bg-[#153427] text-white"
                    >
                        Return to Auctions
                    </Button>
                </div>
            </div>
        </div>
    );
}
