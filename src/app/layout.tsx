import React from 'react';
import './globals.css';
import Header from '@/components/Header';

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
        <Header />
        {children}
      </body>
    </html>
  );
}
