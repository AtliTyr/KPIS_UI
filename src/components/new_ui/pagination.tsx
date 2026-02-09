import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onChange?: (currentPage: number) => void
    className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    onChange,
    totalPages,
    className = '',
}) => {
    return (
        <div className={cn('flex flex-row', className)}>
            <ChevronLeft
                className={cn('cursor-pointer', currentPage === 0 && 'opacity-50 pointer-events-none')}
                onClick={() => onChange?.(currentPage - 1)}>
            </ChevronLeft>
            <span className='accent-semibold self-center'>{currentPage + 1} / {totalPages}</span>
            <ChevronRight
                className={cn('cursor-pointer', currentPage + 1 >= totalPages && 'opacity-50 pointer-events-none')}
                onClick={() => onChange?.(currentPage + 1)}>
            </ChevronRight>
        </div>
    );
};
