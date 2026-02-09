import * as React from 'react';
import { Table2, List } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ViewButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    viewType?: 'table' | 'list';
    size?: 'sm' | 'md' | 'lg';
    iconClassName?: string;
    isActive: boolean;
}

const ViewButton = React.forwardRef<HTMLButtonElement, ViewButtonProps>(
    ({
        className,
        viewType = 'table',
        size = 'md',
        iconClassName,
        isActive,
        ...props
    }, ref) => {
        const IconComponent = viewType === 'table' ? Table2 : List;

        const sizeClasses = {
            sm: 'w-6 h-6 p-1 border-1',
            md: 'w-8 h-8 p-0.5 border-2',
            lg: 'w-10 h-10 p-0.5 border-3'
        };

        return (
            <button
                ref={ref}
                className={cn(
                    'shrink-0 rounded-md border-[var(--color-font)]',
                    'cursor-pointer transition-all duration-200',
                    isActive
                        ? 'bg-[var(--color-accent-blue-bg)]/100 text-[var(--color-bg)]'
                        : 'bg-[var(--color-accent-blue-bg)]/30 text-[var(--color-font)]',
                    sizeClasses[size],
                    className
                )}
                {...props}
            >
                <IconComponent
                    className={cn('h-full w-full', iconClassName)}
                    strokeWidth={ viewType === 'table' ? 1.3 : 3.5}
                />
                <span className="sr-only">
                    {viewType === 'table' ? 'Table view' : 'List view'}
                </span>
            </button>
        );
    }
);

ViewButton.displayName = 'ViewButton';

export { ViewButton };