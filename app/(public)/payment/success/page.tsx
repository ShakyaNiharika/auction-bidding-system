'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useVerifyPayment } from '@/hooks/payment/useVerifyPayment';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import Button from '@/components/ui/custom-button/Button';

function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { mutate: verifyPayment, isPending } = useVerifyPayment();
    
    const [status, setStatus] = useState<'verifying' | 'success' | 'failed'>('verifying');
    const [message, setMessage] = useState('Verifying your payment...');

    useEffect(() => {
        const pidx = searchParams.get('pidx');
        const transactionId = searchParams.get('transaction_id');

        if (!pidx) {
            setStatus('failed');
            setMessage('Missing payment identifier');
            return;
        }

        verifyPayment(
            { pidx },
            {
                onSuccess: (data) => {
                    if (data.success) {
                        setStatus('success');
                        setMessage('Your payment was successful and the auction has been finalized.');
                    } else {
                        setStatus('failed');
                        setMessage(data.message || 'Payment verification failed');
                    }
                },
                onError: (error) => {
                    setStatus('failed');
                    setMessage('An error occurred while verifying the payment.');
                }
            }
        );
    }, [searchParams, verifyPayment]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 text-center space-y-6">
                {status === 'verifying' && (
                    <div className="flex flex-col items-center text-gray-500">
                        <Loader2 className="w-16 h-16 animate-spin text-[var(--primary)] mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900">Verifying Payment...</h2>
                        <p className="mt-2">{message}</p>
                    </div>
                )}
                
                {status === 'success' && (
                    <div className="flex flex-col items-center">
                        <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
                        <p className="text-gray-600 mb-6">{message}</p>
                        <Button
                            onClick={() => router.push('/auctions')}
                            className="w-full bg-[var(--primary)] hover:bg-[#153427] text-white"
                        >
                            Return to Auctions
                        </Button>
                    </div>
                )}

                {status === 'failed' && (
                    <div className="flex flex-col items-center">
                        <XCircle className="w-20 h-20 text-red-500 mb-4" />
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Payment Failed</h2>
                        <p className="text-gray-600 mb-6">{message}</p>
                        <Button
                            onClick={() => router.push('/auctions')}
                            className="w-full bg-red-600 hover:bg-red-700 text-white"
                        >
                            Go Back
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex justify-center items-center"><Loader2 className="animate-spin w-8 h-8" /></div>}>
            <PaymentSuccessContent />
        </Suspense>
    );
}
