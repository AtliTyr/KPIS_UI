// src/providers/ThemeProvider.tsx
import React, { useEffect, useState, ReactNode } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import { Theme } from '@/types';
import '@/index.css';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [ theme, setThemeState ] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            return (localStorage.getItem('theme') as Theme) || 'light';
        }
        return 'light';
    });

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [ theme ]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
