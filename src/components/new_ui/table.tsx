import * as React from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/new_ui/scrollarea';

interface TableProps extends React.ComponentProps<'table'> {
  scrollable?: boolean;
  height?: string;
  scrollOrientation?: 'vertical' | 'horizontal' | 'both';
  rowHeight?: string;
}

function Table({
    className,
    scrollable = true,
    height = '400px',
    scrollOrientation = 'both',
    rowHeight = '40px',
    children,
    ...props
}: TableProps) {
    const headerRef = React.useRef<HTMLTableSectionElement>(null);
    const [ headerHeight, setHeaderHeight ] = React.useState<string>('0px');

    // Автоматически измеряем высоту заголовка
    React.useEffect(() => {
        if (headerRef.current) {
            const height = headerRef.current.offsetHeight;
            setHeaderHeight(`${height}px`);
        }
    }, [ children ]); // Пересчитываем при изменении содержимого

    const tableContent = (
        <table
            data-slot="table"
            className={cn(
                'caption-bottom text-sm',
                '[&_tr]:border-0 [&_th]:border-0 [&_td]:border-0 [&_th:last-child]:border-0 [&_td:last-child]:border-0',
                className
            )}
            {...props}
        >
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child) && child.type === TableHeader) {
                // Используем правильный тип вместо any
                    return React.cloneElement(
                    child as React.ReactElement<React.ComponentProps<'thead'>>,
                    { ref: headerRef }
                    );
                }
                return child;
            })}
        </table>
    );


    const containerStyle = {
        height: scrollable ? height : undefined,
        display: 'grid',
        gridTemplateColumns: 'repeat(1, minmax(0, 1fr))'
    };

    if (scrollable) {
        return (
            <div
                data-slot="table-container"
                className="w-full rounded-md standard-text"
                style={containerStyle}
            >
                <ScrollArea
                    orientation={scrollOrientation}
                    className="w-full h-full"
                    scrollbarOffsetTop={headerHeight}
                >
                    {tableContent}
                </ScrollArea>
            </div>
        );
    }

    return (
        <div
            data-slot="table-container"
            className={cn('w-full rounded-md standard-text overflow-auto', `[&_tr]:max-h-[${rowHeight}] text-ellipsis`)}
            style={containerStyle}
        >
            {tableContent}
        </div>
    );
}

// Обновляем TableHeader для поддержки ref
const TableHeader = React.forwardRef<HTMLTableSectionElement, React.ComponentProps<'thead'>>(
    ({ className, ...props }, ref) => {
        return (
            <thead
                ref={ref}
                data-slot="table-header"
                className={cn(
                    'bg-[var(--color-bg-main-el)] accent-semibold tracking-wide sticky top-0 z-40',
                    className
                )}
                {...props}
            />
        );
    }
);
TableHeader.displayName = 'TableHeader';

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
    return (
        <th
            data-slot="table-head"
            className={cn(
                'h-10 px-3 text-left align-middle text-[var(--color-font)] whitespace-nowrap bg-[var(--color-bg-main-el)] sticky top-0',
                '[&:has([role=checkbox])]:pr-0',
                className
            )}
            {...props}
        />
    );
}

export type SortDirection = 'asc' | 'desc' | 'none';

export interface TableFunctionalHeadProps  extends React.ComponentProps<'th'> {
  onSort: (direction: SortDirection) => void;
}


function TableFunctionalHead(
    {
        className,
        children,
        columnName = '',
        currentDirection = 'none',
        onSort,
        ...props
    }: React.ComponentProps<'th'> & {
        columnName: string;
        onSort: (direction: SortDirection) => void;
        currentDirection?: SortDirection;
        children?: React.ReactNode;
    })
{

    const handleSortClick = () => {
        let nextDirection: SortDirection = 'none';

        switch (currentDirection) {
        case 'asc':
            nextDirection = 'desc';
            break;
        case 'desc':
            nextDirection = 'none';
            break;
        case 'none':
            nextDirection = 'asc';
            break;
        }

        onSort(nextDirection);
    };

    return (
        <th
            data-slot="table-head"
            className={cn(
                'h-10 px-3 text-left align-middle text-[var(--color-font)] whitespace-nowrap bg-[var(--color-bg-main-el)] sticky top-0',
                '[&:has([role=checkbox])]:pr-0',
                className
            )}
            {...props}
        >
            <div
                className='flex flex-row items-center justify-between'
                title={columnName}
                onClick={handleSortClick}
            >
                <span>{children}</span>
                <div>
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={currentDirection != 'none' ? { color: 'var(--color-links)' } : { color: 'var(--color-font)' }}>
                        <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"></path>
                    </svg>
                </div>
            </div>
        </th>
    );
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
    return (
        <tbody
            data-slot="table-body"
            className={cn(
                '[&_tr:nth-child(even)]:bg-[var(--color-bg)] [&_tr:nth-child(even):hover]:bg-[var(--color-some-els)]/35',
                '[&_tr:nth-child(odd)]:bg-[var(--color-bg-separator)]',
                'transition-colors',
                className
            )}
            {...props}
        />
    );
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
    return (
        <tfoot
            data-slot="table-footer"
            className={cn(
                'bg-muted/50 border-t font-medium [&>tr]:last:border-b-0',
                className
            )}
            {...props}
        />
    );
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
    return (
        <tr
            data-slot="table-row"
            className={cn(
                'border border-[var(--color-outline)] transition-colors',
                className
            )}
            {...props}
        />
    );
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
    return (
        <td
            data-slot="table-cell"
            className={cn(
                'p-3 align-middle text-[var(--color-font)] standard-text overflow-hidden text-ellipsis',
                '[&:has([role=checkbox])]:pr-0',
                className
            )}
            {...props}
        />
    );
}

function TableCaption({
    className,
    ...props
}: React.ComponentProps<'caption'>) {
    return (
        <caption
            data-slot="table-caption"
            className={cn('text-muted-foreground mt-4 text-sm', className)}
            {...props}
        />
    );
}

function TableSubheader({
    colspan = 6,
    children,
    className,
    ...props
}: React.ComponentProps<'tr'> & {
    colspan?: number;
    children?: React.ReactNode;
}) {
    return (
        <tr data-slot="table-subheader" className={cn('', className)} {...props}>
            <td
                colSpan={colspan}
                data-slot="table-subheader-cell"
                className="pl-3 py-4 text-[var(--color-font)] text-base accent-bold bg-[var(--color-bg-els-inside-main-el)]"
            >
                {children}
            </td>
        </tr>
    );
}

export {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
    TableSubheader,
    TableFunctionalHead,
};