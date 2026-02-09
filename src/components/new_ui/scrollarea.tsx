// ScrollArea.tsx
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { cn } from '@/lib/utils';
import React from 'react';

interface ScrollAreaProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  orientation?: 'vertical' | 'horizontal' | 'both';
  scrollbarOffsetTop?: string; // Новый проп
}

export const ScrollArea = ({
    children,
    className,
    style,
    orientation = 'vertical',
    scrollbarOffsetTop,
}: ScrollAreaProps) => (
    <ScrollAreaPrimitive.Root
        className={cn('relative overflow-hidden', className)}
        style={style}
    >
        <ScrollAreaPrimitive.Viewport className="w-full h-full rounded-[inherit]">
            {children}
        </ScrollAreaPrimitive.Viewport>

        {/* Вертикальный скроллбар */}
        {(orientation === 'vertical' || orientation === 'both') && (
            <ScrollAreaPrimitive.Scrollbar
                orientation="vertical"
                className={cn(
                    'flex select-none touch-none p-[1px] bg-[var(--color-bg)] transition-colors hover:w-2.5 w-1.5 z-50'
                )}
                style={scrollbarOffsetTop ? {
                    top: scrollbarOffsetTop,
                    height: `calc(100% - ${scrollbarOffsetTop})`
                } : undefined}
            >
                <ScrollAreaPrimitive.Thumb
                    className="flex-1 bg-[var(--color-bg-els-inside-main-el)] rounded-full"
                />
            </ScrollAreaPrimitive.Scrollbar>
        )}

        {/* Горизонтальный скроллбар */}
        {(orientation === 'horizontal' || orientation === 'both') && (
            <ScrollAreaPrimitive.Scrollbar
                orientation="horizontal"
                className={cn(
                    'flex select-none touch-none p-[1px] bg-[var(--color-bg)] transition-colors h-1.5 z-50'
                )}
            >
                <ScrollAreaPrimitive.Thumb
                    className="flex-1 bg-[var(--color-bg-els-inside-main-el)] rounded-full hover:bg-[var(--color-bg-els-inside-main-el)]"
                />
            </ScrollAreaPrimitive.Scrollbar>
        )}

        <ScrollAreaPrimitive.Corner className="bg-transparent" />
    </ScrollAreaPrimitive.Root>
);