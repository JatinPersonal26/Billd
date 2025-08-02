// components/theme-provider.tsx
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode } from 'react';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"           // puts dark/light class on <html>
      defaultTheme="system"       // respects OS theme by default
      enableSystem
    >
      {children}
    </NextThemesProvider>
  );
}