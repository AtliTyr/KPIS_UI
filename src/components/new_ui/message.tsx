import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import { MessageIcons, MessageVariant } from './messageicons';

import { X } from 'lucide-react';

const MessageTitles: Record<MessageVariant, string> = {
    success: 'Успешная операция',
    destructive: 'Произошла ошибка',
    warning: 'Предупреждение',
    info: 'Информация',
};

interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: MessageVariant;
    asChild?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    autoClose?: number;
    showClose?: boolean;
    showIcon?: boolean;
    showTitle?: boolean;
    customIcon?: React.ReactNode;
    customTitle?: string;
}

const Message = React.forwardRef<HTMLDivElement, MessageProps>(
    ({
        className,
        variant = 'info',
        asChild = false,
        open = true,
        onOpenChange,
        autoClose,
        showClose = true,
        showIcon = true,
        showTitle = true,
        customIcon,
        customTitle,
        children,
        ...props
    }, ref) => {
        const Comp = asChild ? Slot : 'div';
        const [ isVisible, setIsVisible ] = React.useState(open);

        React.useEffect(() => {
            setIsVisible(open);
        }, [ open ]);

        React.useEffect(() => {
            if (autoClose && isVisible) {
                const timer = setTimeout(() => {
                    setIsVisible(false);
                    onOpenChange?.(false);
                }, autoClose);

                return () => clearTimeout(timer);
            }
        }, [ autoClose, isVisible, onOpenChange ]);

        const handleClose = () => {
            setIsVisible(false);
            onOpenChange?.(false);
        };

        if (!isVisible) return null;


        // Получаем конкретную иконку для варианта
        const IconComponent = MessageIcons[variant];
        const title = MessageTitles[variant];

        const iconToShow = customIcon || (showIcon ? (
            <IconComponent className="w-9 h-9" />
        ) : null);

        const titleToShow = customTitle || (showTitle ? title : null);

        return (
            <Comp
                data-slot="message"
                className={cn(
                    'fixed top-8 right-8 z-50 max-w-sm w-85  shadow-lg rounded-lg border p-4 transition-all duration-300 ease-in-out transform break-all',
                    'border-0 bg-[var(--color-bg-main-el)]',
                    className
                )}
                ref={ref}
                {...props}
            >
                <div className="flex items-start justify-between gap-1">
                    <div className="flex items-start gap-3">
                        {iconToShow && (
                            <div className="flex-shrink-0 mt-0.5 w-[42px] h-[42px]">
                                {iconToShow}
                            </div>
                        )}
                        <div className="mt-0.5">
                            {titleToShow && (
                                <h3 className="accent-semibold mb-1.5">
                                    {titleToShow}
                                </h3>
                            )}
                            <div className="standard-text text-[var(--color-inconspicuous-font)] break-words whitespace-normal">
                                {children}
                            </div>
                        </div>
                    </div>
                    {showClose && (
                        // <CloseButton
                        //     onClose={handleClose}
                        //     size="md"
                        //     className="self-start mt-1 bg-[var(--color-bg-els-inside-main-el)] text-[var(--color-font)]"
                        // />
                        <button
                            onClick={handleClose}
                            // className="flex-shrink-0 rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            className="max-h-20 shrink-0 rounded-full bg-[var(--color-bg-els-inside-main-el)]/50 p-1.5 cursor-pointer w-10 h-10 hover:bg-[var(--color-bg-els-inside-main-el)]"
                        >
                            <X className="h-full w-full" strokeWidth={1.3}/>
                            <span className="sr-only">Close</span>
                        </button>
                    )}
                </div>
            </Comp>
        );
    }
);

Message.displayName = 'Message';

export { Message };