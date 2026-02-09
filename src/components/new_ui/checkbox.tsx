import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// Типы вариантов чекбокса
type CheckboxVariant = 'default' | 'destructive';

interface CheckboxProps extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
    variant?: CheckboxVariant;
    label?: string;
    onCheckedChange?: (checked: boolean) => void;
    containerClassName?: string;
}

const Checkbox = React.forwardRef<
    React.ElementRef<typeof CheckboxPrimitive.Root>,
    CheckboxProps
>(({
    className,
    variant = 'default',
    label,
    onCheckedChange,
    containerClassName,
    checked,
    ...props
}, ref) => {
    const handleCheckedChange = (checked: boolean) => {
        onCheckedChange?.(checked);
    };

    // Конфигурация для разных вариантов
    const variantConfig = {
        default: {
            checkedBg: 'data-[state=checked]:bg-[var(--color-accent-blue-bg)]',
            checkedBorder: 'data-[state=checked]:border-transparent',
            icon: CheckIcon,
            iconColor: 'text-[var(--color-bg)]'
        },
        destructive: {
            checkedBg: 'data-[state=checked]:bg-[var(--color-accent-red-bg)]',
            checkedBorder: 'data-[state=checked]:border-transparent',
            icon: XIcon,
            iconColor: 'text-[var(--color-bg)]'
        }
    };

    const config = variantConfig[variant];
    const IconComponent = config.icon;

    const checkboxElement = (
        <CheckboxPrimitive.Root
            ref={ref}
            data-slot="checkbox"
            data-variant={variant}
            className={cn(
                // Базовые стили
                'peer border-input dark:bg-input/30',
                'size-5.5 shrink-0 rounded-[9px] border shadow-xs transition-shadow outline-none',
                'disabled:cursor-not-allowed disabled:opacity-50',

                // Варианты состояний
                config.checkedBg,
                config.checkedBorder,

                // Фокус и ховер
                'focus-visible:border-ring focus-visible:ring-ring/50',
                'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',

                // Кастомные стили
                'border-[var(--color-some-icons)]/90 border-[2.5px]',
                'cursor-pointer hover:outline-solid hover:outline-[6px] hover:outline-[var(--color-outline)]',

                className
            )}
            checked={checked}
            onCheckedChange={handleCheckedChange}
            {...props}
        >
            <CheckboxPrimitive.Indicator
                data-slot="checkbox-indicator"
                className={cn(
                    'flex items-center justify-center transition-none',
                    config.iconColor
                )}
            >
                <IconComponent className="size-3.5" />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    );

    // Если есть label, оборачиваем в контейнер
    if (label) {
        return (
            <div className={cn(
                'flex items-center gap-3',
                props.disabled && 'opacity-50 cursor-not-allowed',
                containerClassName
            )}>
                {checkboxElement}
                <label
                    htmlFor={props.id}
                    className={cn(
                        'standard-text text-[var(--color-font)] leading-none cursor-pointer',
                        props.disabled && 'cursor-not-allowed'
                    )}
                    onClick={(e) => {
                        if (props.disabled) {
                            e.preventDefault();
                        }
                    }}
                >
                    {label}
                </label>
            </div>
        );
    }

    return checkboxElement;
});

Checkbox.displayName = 'Checkbox';

export { Checkbox, type CheckboxProps, type CheckboxVariant };