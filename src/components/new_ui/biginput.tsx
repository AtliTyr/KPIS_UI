import React, { useState, useRef, useLayoutEffect } from 'react';
import { cn } from '@/lib/utils';
import TextareaAutosize from 'react-textarea-autosize';
import { ScrollArea } from './scrollarea';

interface InputProps {
  value: string;
  setValue: (v: string) => void;
  placeholder?: string;
  className?: string;
  maxHeight?: number; // px
  minRows?: number;
}

const BigInput: React.FC<InputProps> = ({
    value,
    setValue,
    placeholder = 'Введите текст...',
    className = '',
    maxHeight = 120,
    minRows = 1,
}) => {
    const [ isFocused, setIsFocused ] = useState(false);
    const [ currentHeight, setCurrentHeight ] = useState<number>(0);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    // Авто-рост textarea и вычисление текущей высоты
    useLayoutEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.style.height = 'auto'; // сброс перед измерением
        const scrollHeight = textarea.scrollHeight;

        // Ограничиваем рост до maxHeight
        const newHeight = Math.min(scrollHeight, maxHeight);
        setCurrentHeight(newHeight);

        textarea.style.height = `${scrollHeight}px`; // визуальный рост textarea
    }, [ value, maxHeight ]);

    return (
        <div
            className={cn(
                'relative w-full max-w-sm px-3 py-2 rounded-[8px] border transition-all duration-150',
                'bg-[var(--color-some-els)] border-[var(--color-some-els)]',
                isFocused ? 'ring-3 ring-[var(--color-outline)]' : '',
                className
            )}
        >
            {/* ScrollArea получает высоту = min(текущая высота textarea, maxHeight) */}
            <ScrollArea
                className="w-full"
                style={{ height: `${currentHeight}px` }}
            >
                <TextareaAutosize
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder}
                    minRows={minRows}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={cn(
                        'w-full bg-transparent outline-none resize-none text-[var(--color-font)] placeholder-[var(--color-inconspicuous-font)] overflow-hidden',
                        value ? 'accent-bold' : 'standard-text'
                    )}

                />
            </ScrollArea>
        </div>
    );
};

export { BigInput };
