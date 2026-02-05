'use client';

import { useRouter } from 'next/navigation';
import { MouseEvent, useCallback, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function ModalWrapper({ children }: { children: React.ReactNode }) {
    const overlay = useRef(null);
    const router = useRouter();

    const onDismiss = useCallback(() => {
        router.back();
    }, [router]);

    const onClick = useCallback(
        (e: MouseEvent) => {
            if (e.target === overlay.current || e.target === overlay.current) {
                if (onDismiss) onDismiss();
            }
        },
        [onDismiss, overlay]
    );

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') onDismiss();
        },
        [onDismiss]
    );

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [onKeyDown]);

    return (
        <div
            ref={overlay}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClick}
        >
            <div className="relative w-full max-w-[850px] animate-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={onDismiss}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-50 text-gray-500 bg-white/80 backdrop-blur"
                >
                    <X size={24} />
                </button>
                {children}
            </div>
        </div>
    );
}
