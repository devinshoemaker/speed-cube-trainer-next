import { redirect } from 'next/navigation';
import React from 'react';

import { auth } from '@/auth';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await auth();
  if (user) {
    redirect('/dashboard');
  }

  return <>{children}</>;
}
