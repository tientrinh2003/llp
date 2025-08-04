// app/layout.tsx
import type { Metadata } from 'next';
import { Inter,Allerta_Stencil } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const allerta = Allerta_Stencil({ weight: '400', subsets: ['latin'], variable: '--font-stencil' });

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
      <body className={`${inter.variable} ${allerta.variable} bg-background`}>
        {/* Chỉ render children, không có sidebar hay div bao bọc */}
        {children}
      </body>
    </html>
  );
}