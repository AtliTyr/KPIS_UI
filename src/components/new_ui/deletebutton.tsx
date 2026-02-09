import * as React from 'react';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DeleteButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onClose?: () => void;
    size?: 'sm' | 'md' | 'lg';
    iconClassName?: string;
}

const DeleteButton = React.forwardRef<HTMLButtonElement, DeleteButtonProps>(
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
            md: 'w-8 h-8 p-1.5',
            lg: 'w-10 h-10 p-2'
        };

        return (
            <button
                ref={ref}
                onClick={handleClick}
                className={cn(
                    'shrink-0 rounded-full bg-[var(--color-accent-red-bg)]',
                    'cursor-pointer hover:bg-[var(--color-button-red-hover)]',
                    'transition-colors duration-200 text-[var(--color-bg)]',
                    sizeClasses[size],
                    className
                )}
                {...props}
            >
                <Trash2
                    className={cn('h-full w-full', iconClassName)}
                    strokeWidth={2}
                />
                <span className="sr-only">Close</span>
            </button>
        );
    }
);

DeleteButton.displayName = 'DeleteButton';

export { DeleteButton };