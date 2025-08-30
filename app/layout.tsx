//llp/app/globals.css

import type { Metadata } from 'next';
import { Inter, Allerta_Stencil, Barlow } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/components/AuthProvider'; // Import client wrapper

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const allerta = Allerta_Stencil({ weight: '400', subsets: ['latin'], variable: '--font-stencil' });
const barlow = Barlow({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-barlow' });

export const metadata: Metadata = {
  title: 'LLP - Tiên phong phân phối thiết bị công nghệ',
  description: 'Homepage for LLP Technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.variable} ${allerta.variable} ${barlow.variable} bg-background`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}