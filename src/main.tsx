import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AppDefaultRouterProvider } from '@/providers/AppDefaultRouterProvider';
import { TanStackQueryProvider } from './providers/TanStackQueryProvider';
import { ThemeProvider } from './providers/ThemeProvider';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <TanStackQueryProvider>
                <AppDefaultRouterProvider />
            </TanStackQueryProvider>
        </ThemeProvider>
    </StrictMode>,
);
