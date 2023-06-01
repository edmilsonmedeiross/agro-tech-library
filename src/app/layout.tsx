import React, { Suspense } from 'react';
import './globals.css';
import Header from '@/components/Header';
import MenuMobile from '@/components/MenuMobile';
import LoadingScreen from './loading';

export const metadata = {
  title: 'Agro Tech Library',
  description: 'Uma biblioteca online onde você pode encontrar livros sobre tecnologia agrícola.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning={ true }>
      <body suppressHydrationWarning={ true }>
        <Suspense fallback={ <LoadingScreen /> }></Suspense>
        <Header />
        <MenuMobile />
        {children}
        <Suspense />
      </body>
    </html>
  );
}
