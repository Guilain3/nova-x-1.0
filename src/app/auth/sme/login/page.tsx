import Image from "next/image";
import LoginForm from "../_form/login-form";
import { Roboto } from "next/font/google";
import { cn } from "@/lib/utils";

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"],
});

function Login() {
    return (
        <div className="grid lg:grid-cols-2 gap-5 p-5 px-10 min-h-screen bg-white">
            <div className="max-w-md mx-auto w-full flex flex-col justify-between">
                <div className="w-1 h-1 invisible" />
                <div className="flex flex-col gap-5">
                    <div className="relative mx-auto w-60 h-40 mb-6">
                        <Image
                            src="/images/nova-logo.png"
                            alt="Nova X Logo"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="font-bold text-[#0C1421] text-2xl">
                            Welcome Back 👋
                        </h3>
                        <p className="text-base text-gray-600 leading-6">
                            Sign in to accelerate your growth and lead the market!
                        </p>
                    </div>
                    <LoginForm />
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

export default Login;
