'use client';

import localFont from 'next/font/local';
import './globals.css';
import { ReactQueryProvider } from './ReactQuery/ReactQueryProvider';
import InitialLoading from 'kan/components/InitialLoading';
import { useState } from 'react';
import { AppContext } from 'kan/contexts/AppContext';
import Head from 'next/head';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <html lang="en">
      <Head>
        <title>Ocean Tab Game</title>
        <meta name="description" content="Catch shells, fish, and treasure!" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} overscroll-none antialiased`}
      >
        <ReactQueryProvider>
          <AppContext.Provider
            value={{
              isPlaying,
              setIsPlaying,
            }}
          >
            <InitialLoading>{children}</InitialLoading>
          </AppContext.Provider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
