'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

function MockCheckoutContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [mobile, setMobile] = useState('9800000000');
    const [pin, setPin] = useState('');
    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const amount = Number(searchParams.get('amount') || 0) / 100;
    const title = searchParams.get('title') || 'Auction Payment';
    const pidx = searchParams.get('pidx');
    const transactionId = searchParams.get('transaction_id');
    const purchaseOrderId = searchParams.get('purchase_order_id');

    useEffect(() => {
        if (!pidx) {
            router.push('/auctions');
        }
    }, [pidx, router]);

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (mobile && pin.length >= 4) {
            setIsProcessing(true);
            setTimeout(() => {
                setIsProcessing(false);
                setStep(2);
            }, 800);
        }
    };

    const handlePay = (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length > 2) {
            setIsProcessing(true);
            setTimeout(() => {
                // Redirect to actual success page with standard Khalti parameters
                router.push(`/payment/success?pidx=${pidx}&transaction_id=${transactionId}&purchase_order_id=${purchaseOrderId}`);
            }, 1200);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm overflow-hidden flex flex-col">

                {/* Header matching Khalti's purple */}
                <div className="bg-[#5E32BA] p-6 text-white text-center flex flex-col items-center">
                    {/* Simulated Khalti Logo text since we don't have the image file */}
                    <div className="text-3xl font-black italic tracking-tighter mb-2">khalti</div>
                    <div className="text-sm opacity-90">Pay securely with Khalti Wallet</div>
                </div>

                {/* Amount info */}
                <div className="bg-[#F2EEFB] p-4 text-center border-b border-[#5E32BA]/20">
                    <p className="text-gray-600 text-sm mb-1">{title}</p>
                    <p className="text-2xl font-bold text-[#5E32BA]">Rs. {amount.toLocaleString()}</p>
                </div>

                {/* Form area */}
                <div className="p-6">
                    {step === 1 ? (
                        <form onSubmit={handleNext} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                                <input
                                    type="text"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    className="w-full text-gray-700 h-12 px-4 border border-gray-300 rounded focus:ring-2 focus:ring-[#5E32BA] outline-none"
                                    placeholder="Enter your Khalti mobile number"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Khalti PIN</label>
                                <input
                                    type="password"
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                    className="w-full text-gray-700 h-12 px-4 border border-gray-300 rounded focus:ring-2 focus:ring-[#5E32BA] outline-none"
                                    placeholder="Enter your PIN (e.g., 1111)"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="w-full h-12 mt-4 bg-[#5E32BA] hover:bg-[#4E2A9D] text-white font-bold rounded transition-colors flex items-center justify-center"
                            >
                                {isProcessing ? <Loader2 className="animate-spin w-5 h-5" /> : 'Pay Rs. ' + amount.toLocaleString()}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handlePay} className="space-y-4">
                            <div className="text-sm text-gray-600 text-center mb-4">
                                A confirmation code has been sent to <br /> <span className="font-bold text-gray-900">{mobile}</span>.
                                <br /><span className="text-xs text-gray-500">(For this demo, type any code)</span>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirmation Code (OTP)</label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full h-12 px-4 border text-gray-700 border-gray-300 rounded focus:ring-2 focus:ring-[#5E32BA] outline-none text-center text-lg tracking-widest font-bold"
                                    placeholder="• • • • • •"
                                    maxLength={6}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="w-full h-12 mt-4 bg-[#5E32BA] hover:bg-[#4E2A9D] text-white font-bold rounded transition-colors flex items-center justify-center gap-2"
                            >
                                {isProcessing ? <Loader2 className="animate-spin w-5 h-5" /> : 'Confirm Payment'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                disabled={isProcessing}
                                className="w-full h-8 mt-2 text-sm text-[#5E32BA] font-medium"
                            >
                                Cancel
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function MockCheckoutPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#5E32BA]" /></div>}>
            <MockCheckoutContent />
        </Suspense>
    );
}
