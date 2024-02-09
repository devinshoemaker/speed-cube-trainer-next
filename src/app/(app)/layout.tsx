import { redirect } from 'next/navigation';
import React from 'react';

import { auth } from '@/auth';
import SideMenu from '@/components/side-menu';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await auth();
  if (!user) {
    redirect('/login');
  }

  return (
    <div className="relative min-h-screen md:flex w-full">
      <SideMenu />
      <div className="min-h-screen w-full">{children}</div>
    </div>
  );
}
