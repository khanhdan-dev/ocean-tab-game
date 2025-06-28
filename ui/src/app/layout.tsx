'use cache';

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ReactQueryProvider } from './ReactQuery/ReactQueryProvider';
import InitialLoading from 'kan/components/InitialLoading';
import { GlobalLoading } from 'kan/components/GlobalLoading';
import { MobileOnlyWrapper } from 'kan/components/MobileOnlyWrapper';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Ocean Tab Game',
  description: 'Catch shells, fish, and treasure!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} overscroll-none antialiased`}
      >
        <ReactQueryProvider>
          <MobileOnlyWrapper>
            <InitialLoading>{children}</InitialLoading>
            <GlobalLoading />
          </MobileOnlyWrapper>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
