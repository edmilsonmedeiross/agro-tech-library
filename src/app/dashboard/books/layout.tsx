import React from 'react';

export default function Layout({ children }: { children: React.ReactNode}) {
  return (
    <div className="flex min-h-screen py-3 items-center justify-center bg-green-600">
      <div className="bg-purple-900 border border-purple-700 rounded-md flex gap-2 flex-col px-3 py-5 w-1/2 max-w-2xl">
        {children}
      </div>
    </div>
  );
}
