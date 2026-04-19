'use client';

import { useState } from 'react';
import { 
    ClipboardList, 
    PieChart as PieIcon, 
    BarChart3 as BarIcon, 
    ChevronRight, 
    CheckCircle2,
    Undo2,
    Users,
    AlertTriangle,
    Zap,
    Smartphone
} from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/custom-button/Button';

export default function IndustrySurveyPage() {
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [answers, setAnswers] = useState<Record<string, any>>({
        role: '',
        challenges: [],
        digitalReady: '',
        features: []
    });

    const totalSteps = 4;

    const handleSingleChoice = (field: string, value: string) => {
        setAnswers({ ...answers, [field]: value });
        setTimeout(() => nextStep(), 300);
    };

    const handleMultiChoice = (field: string, value: string) => {
        const current = answers[field] || [];
        const updated = current.includes(value)
            ? current.filter((v: string) => v !== value)
            : [...current, value];
        setAnswers({ ...answers, [field]: updated });
    };

    const nextStep = () => {
        if (step < totalSteps) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center p-4">
                <div className="max-w-md w-full text-center bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="text-[#1b4332]" size={40} />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-4">Dhanyabaad!</h2>
                    <p className="text-gray-600 mb-8 font-medium">
                        Your insights have been recorded. This data will help us build a more transparent industry with Bids Awesome.
                    </p>
                    <Link href="/">
                        <Button className="w-full rounded-2xl py-4 font-bold">Back to Home</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fffcf5] py-12 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Progress Bar */}
                <div className="mb-12">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#1b4332]/50 block mb-1">Bids Awesome Nepal</span>
                            <h1 className="text-2xl font-black text-gray-900">Industry Insights Survey</h1>
                        </div>
                        <span className="text-sm font-bold text-gray-400">Step {step} of {totalSteps}</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-[#1b4332] transition-all duration-500 ease-out"
                            style={{ width: `${(step / totalSteps) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Question Cards */}
                <div className="bg-white rounded-[32px] border border-gray-100 shadow-2xl p-8 md:p-12 relative overflow-hidden">
                    
                    {/* Background Decorative Icon */}
                    <div className="absolute -right-10 -top-10 text-gray-50 opacity-10 rotate-12">
                        <ClipboardList size={200} />
                    </div>

                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-right duration-500">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                    <PieIcon size={20} />
                                </div>
                                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Pie Chart Result</span>
                            </div>
                            <h2 className="text-2xl font-black text-gray-900 mb-8 leading-tight">
                                Q1. What is your primary role in the Industry?
                            </h2>
                            <div className="grid grid-cols-1 gap-4">
                                {['Sugarcane Farmer', 'Sugar Mill Owner', 'Licensed Trader', 'Middleman/Agent'].map((role) => (
                                    <button
                                        key={role}
                                        onClick={() => handleSingleChoice('role', role)}
                                        className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all group ${
                                            answers.role === role 
                                            ? 'border-[#1b4332] bg-[#1b4332]/5 shadow-md' 
                                            : 'border-gray-100 hover:border-gray-300 bg-white'
                                        }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-xl transition-colors ${answers.role === role ? 'bg-[#1b4332] text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'}`}>
                                                <Users size={20} />
                                            </div>
                                            <span className={`font-bold ${answers.role === role ? 'text-[#1b4332]' : 'text-gray-700'}`}>{role}</span>
                                        </div>
                                        {answers.role === role && <CheckCircle2 className="text-[#1b4332]" size={20} />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-right duration-500">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                                    <BarIcon size={20} />
                                </div>
                                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Bar Chart Result</span>
                            </div>
                            <h2 className="text-2xl font-black text-gray-900 mb-8 leading-tight">
                                Q2. What are the biggest challenges you face currently? <span className="text-gray-400 font-medium">(Select all that apply)</span>
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                {[
                                    'Delayed Payments from Mills', 
                                    'Unfair Pricing by Middlemen', 
                                    'Transportation / Logistics', 
                                    'Lack of Real-time Prices',
                                    'High Recovery Rate Disputes',
                                    'Market Monopoly by Few Buyers'
                                ].map((challenge) => (
                                    <button
                                        key={challenge}
                                        onClick={() => handleMultiChoice('challenges', challenge)}
                                        className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${
                                            answers.challenges.includes(challenge)
                                            ? 'border-[#1b4332] bg-[#1b4332]/5 shadow-sm' 
                                            : 'border-gray-100 hover:border-gray-200 bg-white'
                                        }`}
                                    >
                                        <div className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-colors ${
                                            answers.challenges.includes(challenge) ? 'bg-[#1b4332] border-[#1b4332]' : 'border-gray-200'
                                        }`}>
                                            {answers.challenges.includes(challenge) && <CheckCircle2 className="text-white" size={14} />}
                                        </div>
                                        <span className={`text-sm font-bold text-left ${answers.challenges.includes(challenge) ? 'text-[#1b4332]' : 'text-gray-600'}`}>{challenge}</span>
                                    </button>
                                ))}
                            </div>
                            <Button onClick={nextStep} disabled={answers.challenges.length === 0} className="w-full rounded-2xl py-4 font-bold flex items-center justify-center gap-2">
                                Continue <ChevronRight size={18} />
                            </Button>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-in fade-in slide-in-from-right duration-500">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                                    <PieIcon size={20} />
                                </div>
                                <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Pie Chart Result</span>
                            </div>
                            <h2 className="text-2xl font-black text-gray-900 mb-8 leading-tight">
                                Q3. Would you transition to a Digital Bidding System if it guaranteed instant payment settlement?
                            </h2>
                            <div className="grid grid-cols-1 gap-4">
                                {[
                                    { label: 'Yes, absolutely ready', icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-50' },
                                    { label: 'Yes, if taught how to use it', icon: Smartphone, color: 'text-blue-600', bg: 'bg-blue-50' },
                                    { label: 'Maybe, need more information', icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-50' },
                                    { label: 'No, prefer traditional method', icon: Undo2, color: 'text-gray-600', bg: 'bg-gray-50' }
                                ].map((choice) => (
                                    <button
                                        key={choice.label}
                                        onClick={() => handleSingleChoice('digitalReady', choice.label)}
                                        className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all group ${
                                            answers.digitalReady === choice.label 
                                            ? 'border-[#1b4332] bg-[#1b4332]/5 shadow-md' 
                                            : 'border-gray-100 hover:border-gray-300 bg-white'
                                        }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-xl ${choice.bg} ${choice.color}`}>
                                                <choice.icon size={20} />
                                            </div>
                                            <span className={`font-bold ${answers.digitalReady === choice.label ? 'text-[#1b4332]' : 'text-gray-700'}`}>{choice.label}</span>
                                        </div>
                                        {answers.digitalReady === choice.label && <CheckCircle2 className="text-[#1b4332]" size={20} />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="animate-in fade-in slide-in-from-right duration-500">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                                    <BarIcon size={20} />
                                </div>
                                <span className="text-xs font-bold text-green-600 uppercase tracking-wider">Bar Chart Result</span>
                            </div>
                            <h2 className="text-2xl font-black text-gray-900 mb-8 leading-tight">
                                Q4. Which features are most important to you? <span className="text-gray-400 font-medium">(Select top features)</span>
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                {[
                                    'Real-time Live Bidding', 
                                    'Secure SMS Payment Alerts', 
                                    'Transparent Quality Grading', 
                                    'Mobile Phone Accessibility',
                                    'Historical Price Tracking',
                                    'Direct Mill-to-Farmer Support'
                                ].map((feature) => (
                                    <button
                                        key={feature}
                                        onClick={() => handleMultiChoice('features', feature)}
                                        className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${
                                            answers.features.includes(feature)
                                            ? 'border-[#1b4332] bg-[#1b4332]/5 shadow-sm' 
                                            : 'border-gray-100 hover:border-gray-200 bg-white'
                                        }`}
                                    >
                                        <div className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-colors ${
                                            answers.features.includes(feature) ? 'bg-[#1b4332] border-[#1b4332]' : 'border-gray-200'
                                        }`}>
                                            {answers.features.includes(feature) && <CheckCircle2 className="text-white" size={14} />}
                                        </div>
                                        <span className={`text-sm font-bold text-left ${answers.features.includes(feature) ? 'text-[#1b4332]' : 'text-gray-600'}`}>{feature}</span>
                                    </button>
                                ))}
                            </div>
                            <Button onClick={handleSubmit} disabled={answers.features.length === 0} className="w-full rounded-2xl py-5 text-lg font-black bg-[#1b4332] hover:bg-[#153427] text-white shadow-xl shadow-[#1b4332]/20 transition-all flex items-center justify-center gap-3">
                                <ClipboardList size={22} /> Submit Survey Responses
                            </Button>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    {step > 1 && (
                        <button 
                            onClick={prevStep}
                            className="mt-8 text-sm font-bold text-gray-400 hover:text-gray-900 flex items-center gap-2 transition-colors"
                        >
                            <Undo2 size={16} /> Previous Question
                        </button>
                    )}
                </div>

                {/* Footer Info */}
                <p className="text-center mt-10 text-gray-400 text-xs font-medium">
                    © {new Date().getFullYear()} Bids Awesome Nepal. Data collected is anonymous and for industry analysis only.
                </p>
            </div>
        </div>
    );
}
