import * as React from 'react';

import { TriangleAlertIcon, Check, X } from 'lucide-react';
export type MessageVariant = 'success' | 'destructive' | 'warning' | 'info';

// Иконки для message по вариантам
export const MessageIcons = {
    success: (props: React.SVGProps<SVGSVGElement>) => (
        <div className="w-full h-full flex items-center justify-center text-[var(--color-bg)] bg-[var(--color-accent-green-bg)] rounded-lg p-1">
            <Check {...props} strokeWidth={3}/>
        </div>
    ),
    destructive: (props: React.SVGProps<SVGSVGElement>) => (
        <div className="w-full h-full flex items-center justify-center text-[var(--color-bg)] bg-[var(--color-accent-red-bg)] rounded-lg p-1">
            <X {...props} strokeWidth={3}/>
        </div>
    ),
    warning: (props: React.SVGProps<SVGSVGElement>) => (
        <div className="w-full h-full flex items-center justify-center text-[var(--color-bg)] bg-[var(--color-accent-yellow-bg)] rounded-lg p-1">
            <TriangleAlertIcon {...props}   />
        </div>
    ),
    info: () => (
        <div className="w-full h-full flex items-center justify-center text-[var(--color-bg)] bg-[var(--color-accent-blue-bg)] rounded-lg p-1">
            <div className='plain-text text-[32px] font-semibold'>
                i
            </div>
        </div>
    ),
};