'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";

export function VerifyEmail() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setError('No verification token provided');
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Verification failed');
        }

        setStatus('success');
        toast({
          title: "Email Verified",
          description: "Your account has been verified successfully.",
          variant: "success",
        });

      } catch (err) {
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Verification failed');
        toast({
          title: "Verification Failed",
          description: err instanceof Error ? err.message : 'Failed to verify email',
          variant: "destructive",
        });
      }
    };

    verifyEmail();
  }, [token, toast]);

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center space-y-4">
        <Icons.spinner className="h-8 w-8 animate-spin" />
        <p>Verifying your email...</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center space-y-4">
        <Icons.warning className="h-8 w-8 text-destructive" />
        <h2 className="text-2xl font-semibold">Verification Failed</h2>
        <p className="text-muted-foreground">{error}</p>
        <Button asChild>
          <Link href="/auth/sme/login">Return to Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <Icons.check className="h-8 w-8 text-green-500" />
      <h2 className="text-2xl font-semibold">Email Verified</h2>
      <p className="text-muted-foreground">
        Your email has been verified. You can now log in to your account.
      </p>
      <Button asChild>
        <Link href="/auth/sme/login">Login</Link>
      </Button>
    </div>
  );
}
