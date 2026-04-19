'use client';

import { useState } from 'react';
import { X, MessageCircle, MessageSquare } from 'lucide-react';

export default function WhatsAppFloatingButton() {
    const [isOpen, setIsOpen] = useState(false);
    
    // Replace with your actual WhatsApp Number
    const whatsappNumber = "9761897298"; 
    const whatsappLink = `https://wa.me/${whatsappNumber}`;
    
    // QR Code generation using a free API (api.qrserver.com)
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(whatsappLink)}`;

    const WhatsAppIcon = ({ className }: { className?: string }) => (
        <svg 
            viewBox="0 0 24 24" 
            className={className}
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    );

    return (
        <>
            {/* Floating Button */}
            <div className="fixed bottom-6 right-6 z-[9999]">
                <button
                    onClick={() => setIsOpen(true)}
                    className="relative w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors" />
                    <WhatsAppIcon className="w-9 h-9" />
                </button>
            </div>

            {/* Modal Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
                    onClick={() => setIsOpen(false)}
                >
                    {/* Modal Container */}
                    <div 
                        className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="bg-[#25D366] px-6 py-4 flex items-center justify-between text-white">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <MessageSquare size={20} fill="white" />
                                Scan to Chat
                            </h3>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-8 flex flex-col items-center">
                            {/* QR Code Container */}
                            <div className="bg-gray-50 p-4 rounded-2xl border-2 border-dashed border-gray-200 mb-6 group transition-all hover:border-[#25D366]/30">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img 
                                    src={qrCodeUrl} 
                                    alt="WhatsApp QR Code" 
                                    className="w-48 h-48 sm:w-56 sm:h-56 object-cover rounded-xl shadow-inner transition-transform group-hover:scale-[1.02]"
                                />
                            </div>

                            <p className="text-gray-600 text-sm font-medium text-center mb-6 leading-relaxed">
                                Scan this QR code with WhatsApp to start a chat.
                            </p>

                            <div className="w-full flex items-center gap-4 mb-6">
                                <div className="h-px flex-1 bg-gray-200" />
                                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">OR</span>
                                <div className="h-px flex-1 bg-gray-200" />
                            </div>

                            <a 
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-[#25D366]/20 hover:translate-y-[-2px] active:translate-y-[0]"
                            >
                                <WhatsAppIcon className="w-6 h-6" />
                                Continue to Chat
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
