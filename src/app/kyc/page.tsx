import React from 'react';
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation';
import KYCVerificationForm from '@/components/kyc/kyc-verification-form';

export default async function Page() {
  const session = await getServerSession();
  
  // Redirect if not authenticated
  if (!session) {
    redirect("/login");
  }
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className=" w-full">
        <KYCVerificationForm />
      </div>
    </div>
  );
}
