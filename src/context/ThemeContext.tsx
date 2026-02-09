// src/context/ThemeContext.ts
import { createContext } from 'react';
import { Theme } from '@/types';

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
