import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './ui/globals.css';
import { AuthProvider } from './context/authContext';
import Providers from './helpers/providers';
import { Suspense } from 'react';
import { Toaster } from '@/components/ui/Toasts/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mtotosharp',
  description: 'psychology app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AuthProvider>
            {children}

            <Suspense>
              <Toaster />
            </Suspense>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
