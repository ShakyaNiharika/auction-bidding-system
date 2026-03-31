'use client';

import { X, AlertTriangle } from 'lucide-react';
import Button from './custom-button/Button';
import { useEffect, useCallback } from 'react';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'primary';
    isLoading?: boolean;
}

export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'primary',
    isLoading = false
}: ConfirmModalProps) {
    
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, handleKeyDown]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" 
                onClick={onClose}
            />
            
            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 p-8 sm:p-10 animate-in zoom-in-95 fade-in duration-200">
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all"
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col items-center text-center">
                    <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-6 ${
                        variant === 'danger' ? 'bg-red-50 text-red-500' : 'bg-[#1b4332]/10 text-[#1b4332]'
                    }`}>
                        <AlertTriangle size={32} />
                    </div>

                    <h3 className="text-2xl font-black text-gray-900 mb-2">{title}</h3>
                    <p className="text-gray-500 font-medium leading-relaxed mb-10">
                        {message}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                        <Button
                            onClick={onClose}
                            variant="secondary"
                            className="flex-1 rounded-2xl py-4 font-bold border-gray-200 text-gray-700 hover:bg-gray-50"
                        >
                            {cancelText}
                        </Button>
                        <Button
                            onClick={() => {
                                onConfirm();
                                // onClose(); // Usually handled by the parent after mutation
                            }}
                            disabled={isLoading}
                            className={`flex-1 rounded-2xl py-4 font-black shadow-lg ${
                                variant === 'danger' 
                                ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-200' 
                                : 'bg-[#1b4332] hover:bg-[#153427] text-white shadow-green-100'
                            }`}
                        >
                            {isLoading ? 'Processing...' : confirmText}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
