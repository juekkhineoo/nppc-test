'use client';

import { HeroUIProvider } from '@heroui/react';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, ThemeProviderProps } from 'next-themes';

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}
export function Providers({ children, themeProps}: Readonly<ProvidersProps>) {
  return (
    <ThemeProvider {...themeProps}>
      <HeroUIProvider>
        <SnackbarProvider 
          maxSnack={3}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {children}
        </SnackbarProvider>
      </HeroUIProvider>
    </ThemeProvider>
  );
}
