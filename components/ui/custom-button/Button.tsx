'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                    'disabled:pointer-events-none disabled:opacity-50',

                    // Variants
                    variant === 'primary' && 'bg-[var(--primary)] text-white hover:opacity-90',
                    variant === 'secondary' && 'bg-gray-200 text-gray-900 hover:bg-gray-300',
                    variant === 'outline' && 'border border-gray-300 hover:bg-gray-50',
                    variant === 'ghost' && 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',

                    // Sizes
                    size === 'sm' && 'px-3 py-1.5 text-sm',
                    size === 'md' && 'px-4 py-2',
                    size === 'lg' && 'px-6 py-3 text-lg',

                    className
                )}
                disabled={isLoading}
                {...props}
            >
                {isLoading ? 'Loading...' : children}
            </button>
        );
    }
);

Button.displayName = 'Button';
export default Button;