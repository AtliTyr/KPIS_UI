// src/components/ui/Search.tsx
import React, { useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Search: React.FC<SearchProps> = ({
    value = '',
    onChange,
    placeholder = 'Поиск',
    className = '',
}) => {
    const [ isFocused, setIsFocused ] = useState(false);

    // Функция для очистки поля поиска
    const handleClear = () => {
        onChange?.('');
    };

    return (
        <div
            // className={`relative flex items-center gap-2 w-full max-w-sm px-3 py-2 rounded-[8px] border transition-colors duration-150
            //     bg-[var(--color-some-els)] border-[var(--color-some-els)]
            //     ${isFocused ? 'ring-3 ring-[var(--color-outline)]' : ''}
            //     ${className}
            // `}
            className={
                cn('relative flex items-center gap-2 w-full px-3 py-2 rounded-[15px] border-1 transition-colors duration-150',
                    'bg-[var(--color-outline)]/0 border-[var(--color-outline)] hover:bg-[var(--color-bg-els-inside-main-el)]/75',
                    isFocused ? '' : '',
                    className
                )
            }
        >
            <SearchIcon
                size={16}
                // className="searchIcon shrink-0"
                className="text-[var(--color-inconspicuous-font)] shrink-0"
            />

            <input
                type="search"
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                className={
                    cn('w-full bg-transparent outline-none text-[var(--color-font)] placeholder-[var(--color-inconspicuous-font)]',
                        value ? 'accent-bold' : 'standard-text',
                        '[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none \
                        [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none'
                    )
                }
            />

            {/* Кнопка очистки - показывается только когда есть текст */}
            {value && (
                <button
                    type="button"
                    onClick={handleClear}
                    className="p-1 rounded-sm hover:bg-[var(--color-inconspicuous-font)]/40 bg-[var(--color-outline)]/40 cursor-pointer transition-colors duration-150"
                    aria-label="Очистить поиск"
                >
                    <X
                        size={16}
                        className="text-[var(--color-font)]"
                    />
                </button>
            )}
        </div>
    );
};
