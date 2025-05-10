import Image from "next/image";
import SignupForm from "./_form/signup";
import { Roboto } from "next/font/google";
import { cn } from "@/lib/utils";

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"],
});

function Signup() {
    return (
        <div className="grid lg:grid-cols-2 gap-5 p-5 px-10 min-h-screen bg-white">
            <div className="hidden lg:flex justify-start">
                <div className="relative max-w-4xl w-full h-full rounded-lg overflow-hidden">
                    <Image
                        src="/images/login.png"
                        alt="Professionals collaborating"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>
            <div className="max-w-md mx-auto w-full flex flex-col justify-between">
                <div className="flex flex-col gap-5">
                    <div className="relative mx-auto w-64 h-40 mb-6">
                        <Image
                            src="/images/nova-logo.png"
                            alt="Nova X Logo"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <SignupForm />
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
        </div>
    );
}

export default Signup;
