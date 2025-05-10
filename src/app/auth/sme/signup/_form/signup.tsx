"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { PasswordInput } from "@/components/ui/password-Input";
import {
    signupStep1Schema,
    signupStep2Schema,
    signupStep3Schema,
    signupStep4Schema,
    type SMESignupStep1,
    type SMESignupStep2,
    type SMESignupStep3,
    type SMESignupStep4
} from "@/lib/validations/auth";
import { useToast } from "@/hooks/use-toast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Check } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { countries } from "@/utils/countries";
import { Checkbox } from "@/components/ui/checkbox";

const industries = [
    "Finance",
    "Retail",
    "Art",
    "Wholesale",
    "Music"
];

type CompleteFormData = {
    step1: SMESignupStep1;
    step2: SMESignupStep2;
    step3: SMESignupStep3;
    step4: SMESignupStep4;
};

interface FormDataState {
    step1: Partial<SMESignupStep1>;
    step2: Partial<SMESignupStep2>;
    step3: Partial<SMESignupStep3>;
    step4: Partial<SMESignupStep4>;
}

export default function SignupForm() {
    const router = useRouter();
    const [isPending, setIsPending] = React.useState(false);
    const [step, setStep] = React.useState(1);
    const { toast } = useToast();
    const [selectedCountry, setSelectedCountry] = React.useState(countries[0]);
    const [formData, setFormData] = React.useState<FormDataState>({
        step1: {},
        step2: {},
        step3: {},
        step4: {}
    });

    // Step 1 Form
    const step1Form = useForm<SMESignupStep1>({
        resolver: zodResolver(signupStep1Schema),
        defaultValues: {
            commencementDate: undefined,
            industry: "",
        },
    });

    // Step 2 Form
    const step2Form = useForm<SMESignupStep2>({
        resolver: zodResolver(signupStep2Schema),
        defaultValues: {
            businessName: "",
            contactPhone: "",
            businessEmail: "",
        },
    });

    // Step 3 Form
    const step3Form = useForm<SMESignupStep3>({
        resolver: zodResolver(signupStep3Schema),
        defaultValues: {
            representativeName: "",
            position: "",
            representativeEmail: "",
            representativePhone: ""
        },
    });

    // Step 4 Form
    const step4Form = useForm<SMESignupStep4>({
        resolver: zodResolver(signupStep4Schema),
        defaultValues: {
            password: "",
            confirm_password: "",
        },
        mode: "onChange",
    });

    async function onSubmit(data: CompleteFormData) {
        try {
            setIsPending(true);

            // Combine all the form data
            const registrationData = {
                commencementDate: data.step1.commencementDate,
                industry: data.step1.industry,
                businessName: data.step2.businessName,
                contactPhone: data.step2.contactPhone,
                businessEmail: data.step2.businessEmail,
                representativeName: data.step3.representativeName,
                position: data.step3.position,
                representativeEmail: data.step3.representativeEmail || undefined,
                representativePhone: data.step3.representativePhone || undefined,
                password: data.step4.password,
                acceptTerms: data.step4.acceptTerms
            };

            // Send registration request
            const response = await fetch('/api/auth/sme/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Registration failed');
            }

            // Show success message
            toast({
                title: "Registration Successful",
                description: "Please check your email to verify your account.",
                variant: "success"
            });

            // Redirect to login page
            router.push('/auth/sme/login');

        } catch (error) {
            // Show error message
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Something went wrong",
                variant: "destructive",
            });
        } finally {
            setIsPending(false);
        }
    }


    const handleStep1Submit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = await step1Form.trigger();
        if (isValid) {
            const step1Data = step1Form.getValues();
            setFormData(prev => ({ ...prev, step1: step1Data }));
            setStep(2);
        }
    };

    const handleStep2Submit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = await step2Form.trigger();
        if (isValid) {
            const step2Data = step2Form.getValues();
            setFormData(prev => ({ ...prev, step2: step2Data }));
            setStep(3);
        }
    };

    const handleStep3Submit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = await step3Form.trigger();
        if (isValid) {
            const step3Data = step3Form.getValues();
            setFormData(prev => ({ ...prev, step3: step3Data }));
            setStep(4);
        }
    };

    const handleStep4Submit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = await step4Form.trigger();
        if (isValid) {
            const step4Data = step4Form.getValues();

            // Update form data
            const updatedFormData = {
                ...formData,
                step4: step4Data
            };

            // Check if all required fields are present
            if (isFormComplete(updatedFormData)) {
                await onSubmit(updatedFormData as CompleteFormData);
            } else {
                toast({
                    title: "Error",
                    description: "Please fill out all required fields",
                    variant: "destructive",
                });
            }
        }
    };

    // Helper function to type check the form data
    function isFormComplete(data: FormDataState): data is CompleteFormData {
        return (
            !!data.step1.commencementDate &&
            !!data.step1.industry &&
            !!data.step2.businessName &&
            !!data.step2.contactPhone &&
            !!data.step2.businessEmail &&
            !!data.step3.representativeName &&
            !!data.step3.position &&
            !!data.step4.password &&
            !!data.step4.confirm_password &&
            !!data.step4.acceptTerms
        );
    }

    const renderStepIndicator = () => (
        <div className="w-full mb-8">
            <div className="text-sm text-gray-500 mb-6">
                {step} of 4 steps completed
            </div>
            <div className="w-full flex items-center justify-between">
                <div className="flex flex-col items-center">
                    <span className="text-sm mb-2">Step 1</span>
                    {step >= 1 ? (
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                        </div>
                    ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-gray-200 flex items-center justify-center">
                            <span className="text-sm text-gray-500">1</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center text-gray-300 text-2xl">
                    <span>•</span>
                    <span>•</span>
                    <span>•</span>
                </div>

                <div className="flex flex-col items-center">
                    <span className="text-sm mb-2">Step 2</span>
                    {step >= 2 ? (
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                        </div>
                    ) : (
                        <div className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center",
                            step === 2 ? "bg-primary" : "border-2 border-gray-200"
                        )}>
                            <span className={cn(
                                "text-sm",
                                step === 2 ? "text-white" : "text-gray-500"
                            )}>2</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center text-gray-300 text-2xl">
                    <span>•</span>
                    <span>•</span>
                    <span>•</span>
                </div>

                <div className="flex flex-col items-center">
                    <span className="text-sm mb-2">Step 3</span>
                    {step >= 3 ? (
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                        </div>
                    ) : (
                        <div className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center",
                            step === 3 ? "bg-primary" : "border-2 border-gray-200"
                        )}>
                            <span className={cn(
                                "text-sm",
                                step === 3 ? "text-white" : "text-gray-500"
                            )}>3</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center text-gray-300 text-2xl">
                    <span>•</span>
                    <span>•</span>
                    <span>•</span>
                </div>

                <div className="flex flex-col items-center">
                    <span className="text-sm mb-2">Step 4</span>
                    {step >= 4 ? (
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                        </div>
                    ) : (
                        <div className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center",
                            step === 4 ? "bg-primary" : "border-2 border-gray-200"
                        )}>
                            <span className={cn(
                                "text-sm",
                                step === 4 ? "text-white" : "text-gray-500"
                            )}>4</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="w-full max-w-md">
            {renderStepIndicator()}

            {step === 1 && (
                <Form {...step1Form}>
                    <form onSubmit={handleStep1Submit} className="space-y-4">
                        <FormField
                            control={step1Form.control}
                            name="commencementDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium">
                                        Commencement Date
                                    </FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={step1Form.control}
                            name="industry"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium">
                                        Select industry
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Search industry..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {industries.map((industry) => (
                                                <SelectItem key={industry} value={industry}>
                                                    {industry}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1"
                                onClick={() => router.back()}
                            >
                                Back
                            </Button>
                            <Button type="submit" className="flex-1">
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            )}

            {step === 2 && (
                <Form {...step2Form}>
                    <form onSubmit={handleStep2Submit} className="space-y-4">
                        <FormField
                            control={step2Form.control}
                            name="businessName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium">
                                        Business Name<span className="text-primary">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your business name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={step2Form.control}
                            name="contactPhone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium">
                                        Contact phone<span className="text-primary">*</span>
                                    </FormLabel>
                                    <div className="flex gap-2">
                                        <Select
                                            value={selectedCountry.name}
                                            onValueChange={(value) => {
                                                const country = countries.find(c => c.name === value);
                                                if (country) setSelectedCountry(country);
                                            }}
                                        >
                                            <SelectTrigger className="w-[140px]">
                                                <SelectValue>
                                                    <span className="flex items-center gap-2">
                                                        <span>{selectedCountry.flag}</span>
                                                        <span>{selectedCountry.code}</span>
                                                    </span>
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {countries.map((country) => (
                                                    <SelectItem key={country.name} value={country.name}>
                                                        <span className="flex items-center gap-2">
                                                            <span>{country.flag}</span>
                                                            <span>{country.name}</span>
                                                            <span className="text-gray-500">{country.code}</span>
                                                        </span>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter phone number"
                                                {...field}
                                                className="flex-1"
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={step2Form.control}
                            name="businessEmail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium">
                                        Business Email<span className="text-primary">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="example@company.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1"
                                onClick={() => setStep(1)}
                            >
                                Back
                            </Button>
                            <Button type="submit" className="flex-1">
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            )}

            {step === 3 && (
                <Form {...step3Form}>
                    <form onSubmit={handleStep3Submit} className="space-y-4">
                        <FormField
                            control={step3Form.control}
                            name="representativeName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium">
                                        Full Name<span className="text-primary">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your full name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={step3Form.control}
                            name="position"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium">
                                        Position/Title<span className="text-primary">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g., CEO, Manager, Director"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={step3Form.control}
                            name="representativeEmail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium">
                                        Email (if different from business email)
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Enter your email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={step3Form.control}
                            name="representativePhone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium">
                                        Phone (if different from business phone)
                                    </FormLabel>
                                    <div className="flex gap-2">
                                        <Select
                                            value={selectedCountry.name}
                                            onValueChange={(value) => {
                                                const country = countries.find(c => c.name === value);
                                                if (country) setSelectedCountry(country);
                                            }}
                                        >
                                            <SelectTrigger className="w-[140px]">
                                                <SelectValue>
                                                    <span className="flex items-center gap-2">
                                                        <span>{selectedCountry.flag}</span>
                                                        <span>{selectedCountry.code}</span>
                                                    </span>
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {countries.map((country) => (
                                                    <SelectItem key={country.name} value={country.name}>
                                                        <span className="flex items-center gap-2">
                                                            <span>{country.flag}</span>
                                                            <span>{country.name}</span>
                                                            <span className="text-gray-500">{country.code}</span>
                                                        </span>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter phone number"
                                                {...field}
                                                className="flex-1"
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1"
                                onClick={() => setStep(2)}
                            >
                                Back
                            </Button>
                            <Button type="submit" className="flex-1">
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            )}

            {step === 4 && (
                <Form {...step4Form}>
                    <form onSubmit={handleStep4Submit} className="space-y-4">
                        <FormField
                            control={step4Form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium">
                                        Password<span className="text-primary">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <PasswordInput
                                            placeholder="Enter your password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={step4Form.control}
                            name="confirm_password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium">
                                        Confirm Password<span className="text-primary">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <PasswordInput
                                            placeholder="Confirm your password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={step4Form.control}
                            name="acceptTerms"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            I accept the <Link href="/terms" className="text-primary hover:underline">terms and conditions</Link>
                                        </FormLabel>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1"
                                onClick={() => setStep(3)}
                            >
                                Back
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1"
                                disabled={isPending}
                            >
                                {isPending && (
                                    <Icons.spinner
                                        className="mr-2 h-4 w-4 animate-spin"
                                        aria-hidden="true"
                                    />
                                )}
                                Sign Up
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    );
}
