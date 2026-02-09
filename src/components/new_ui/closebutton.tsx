import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onClose?: () => void;
    size?: 'sm' | 'md' | 'lg';
    iconClassName?: string;
}

const CloseButton = React.forwardRef<HTMLButtonElement, CloseButtonProps>(
    ({
        className,
        onClose,
        size = 'md',
        iconClassName,
        onClick,
        ...props
    }, ref) => {
        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            onClick?.(event);
            onClose?.();
        };

        const sizeClasses = {
            sm: 'w-6 h-6 p-1',
            md: 'w-8 h-8 p-0.5',
            lg: 'w-10 h-10 p-0.5'
        };

        return (
            <button
                ref={ref}
                onClick={handleClick}
                className={cn(
                    'shrink-0 rounded-full bg-[var(--color-accent-blue-bg)]',
                    'cursor-pointer hover:bg-[var(--color-button-blue-hover)]',
                    'transition-colors duration-200 text-[var(--color-bg)]',
                    sizeClasses[size],
                    className
                )}
                {...props}
            >
                <X
                    className={cn('h-full w-full', iconClassName)}
                    strokeWidth={2.5}
                />
                <span className="sr-only">Close</span>
            </button>
        );
    }
);

CloseButton.displayName = 'CloseButton';

export { CloseButton };