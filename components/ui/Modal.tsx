'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useRef, useEffect, MouseEvent } from 'react';
import { X } from 'lucide-react';

export default function Modal({ children }: { children: React.ReactNode }) {
    const overlay = useRef<HTMLDivElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const onDismiss = useCallback(() => {
        router.back();
    }, [router]);

    const onClick = useCallback(
        (e: MouseEvent) => {
            if (e.target === overlay.current || e.target === wrapper.current) {
                if (onDismiss) onDismiss();
            }
        },
        [onDismiss, overlay, wrapper]
    );

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onDismiss();
        };

        document.addEventListener('keydown', onKeyDown);
        // Lock scroll on mount
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            // Restore scroll on unmount
            document.body.style.overflow = 'unset';
        };
    }, [onDismiss]);

    return (
        <div
            ref={overlay}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
            onClick={onClick}
        >
            <div
                ref={wrapper}
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 scrollbar-hide"
            >
                <button
                    onClick={onDismiss}
                    className="absolute top-4 right-4 z-50 p-2 bg-black/5 hover:bg-black/10 rounded-full text-gray-500 transition-colors"
                >
                    <X size={20} />
                </button>
                {children}
            </div>
        </div>
    );
}
