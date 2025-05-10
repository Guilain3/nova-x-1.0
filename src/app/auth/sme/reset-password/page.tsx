"use client";
import Image from "next/image";
import ResetPasswordForm from "./_form/reset-password-form";
import { Suspense } from "react";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

function Reset() {
  return (
    <div className="grid lg:grid-cols-2 gap-5 p-5 px-10 min-h-screen bg-white">
      <div className="max-w-md mx-auto w-full flex flex-col justify-between">
        <div className="w-1 h-1 invisible" />
        <div className="flex flex-col gap-5">
          <Suspense fallback={<Fallback />}>
            <ResetPasswordForm />
          </Suspense>
        </div>
        <div className="w-full text-center mt-8">
          <span
            className={cn(
              "text-xs text-gray-500 uppercase",
              roboto.className
            )}
          >
            © 2025 ALL RIGHTS RESERVED
          </span>
        </div>
      </div>
      <div className="hidden lg:flex justify-end">
        <div className="relative max-w-3xl w-full h-full rounded-lg overflow-hidden">
          <Image
            src="/images/login.png"
            alt="Professionals collaborating"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

const Fallback = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-[50vh]">
      <Icons.spinner className="h-8 w-8 md:h-12 md:w-12 animate-spin" />
    </div>
  );
};

export default Reset;
