import React from 'react';
import './globals.css';
// import { Inter } from 'next/font/google';

// const inter = Inter({ subsets: ['latin'] });

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
        {children}
      </body>
    </html>
  );
}
