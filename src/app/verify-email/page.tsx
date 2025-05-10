import React, { Suspense } from 'react';
import { VerifyEmail } from '@/components/auth/verify-email';

export default function VerifyEmailPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Suspense fallback="Loading...">
        <VerifyEmail />
      </Suspense>
    </div>
  );
}
