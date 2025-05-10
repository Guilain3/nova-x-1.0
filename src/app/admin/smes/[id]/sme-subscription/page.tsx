"use client";

import { useParams } from "next/navigation";
import { smeList } from "@/app/admin/smes/mockdata";
import { CreditCard, Calendar } from "lucide-react";

export default function SubscriptionPage() {
  const { id } = useParams();
  const sme = smeList.find((item) => item.id === id);

  if (!sme) return <div className="p-6">SME not found.</div>;

  const subscription = sme.subscription;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-blue-700">Subscription</h2>

      {subscription ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <CreditCard className="text-blue-600 w-5 h-5 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Plan</p>
              <p className="text-base font-semibold">{subscription.plan}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="text-blue-600 w-5 h-5 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Expires On</p>
              <p className="text-base font-semibold">{subscription.expiresOn}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-md bg-yellow-50 border border-yellow-200 text-yellow-800">
          This business does not have an active subscription.
        </div>
      )}
    </div>
  );
}
