import * as React from 'react';
import { Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EditButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'sm' | 'md' | 'lg';
    iconClassName?: string;
}

const EditButton = React.forwardRef<HTMLButtonElement, EditButtonProps>(
    ({ className, size = 'md', iconClassName, ...props }, ref) => {
        const sizeClasses = {
            sm: 'w-6 h-6 p-1',
            md: 'w-8 h-8 p-1.5',
            lg: 'w-10 h-10 p-2'
        };

        return (
            <button
                ref={ref}
                className={cn(
                    'shrink-0 rounded-full bg-[var(--color-accent-yellow-bg)]',
                    'cursor-pointer hover:bg-[var(--color-button-yellow-hover)]',
                    'transition-colors duration-200 text-[var(--color-bg)]',
                    sizeClasses[size],
                    className
                )}
                {...props}
            >
                <Pencil
                    className={cn('h-full w-full', iconClassName)}
                    strokeWidth={2}
                />
                <span className="sr-only">Edit</span>
            </button>
        );
    }
);

EditButton.displayName = 'EditButton';

export { EditButton };