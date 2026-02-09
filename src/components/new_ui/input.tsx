import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface InputProps {
    value: string;
    setValue: (v: string) => void;
    placeholder?: string;
    className?: string;
}


const Input: React.FC<InputProps> = ({
    value,
    setValue,
    className = '',
    placeholder = 'Введите текст...',
}) => {

    const [ isFocused, setIsFocused ] = useState(false);

    return (
        <div
            className={
                cn('relative flex items-center gap-2 w-full max-w-sm px-3 py-2 rounded-[8px] border transition-colors duration-150',
                    'bg-[var(--color-some-els)] border-[var(--color-some-els)]',
                    isFocused ? 'ring-3 ring-[var(--color-outline)]' : '',
                    className
                )
            }
        >
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={
                    cn('w-full bg-transparent outline-none text-[var(--color-font)] placeholder-[var(--color-inconspicuous-font)]',
                        value ? 'accent-bold' : 'standard-text'
                    )
                }
            />
        </div>
    );
};


export { Input };