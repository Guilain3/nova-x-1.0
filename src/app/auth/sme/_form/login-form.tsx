"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Link from "next/link";

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
import { SMELoginFormData, smeLoginSchema } from "@/lib/validations/auth";
import { useToast } from "@/hooks/use-toast";

const LoginForm = () => {
  const router = useRouter();
  const [isPending, setIsPending] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<SMELoginFormData>({
    resolver: zodResolver(smeLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setIsPending(true);

      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response?.error) {
        console.log(response.error)
        toast({
          title: "Error",
          description:
            response.error === "Please verify your email before logging in"
              ? "Please verify your email before logging in"
              : "Invalid email or password",
          variant: "destructive",
        });
        return;
      }

      // Check if there's a redirect URL
      const searchParams = new URLSearchParams(window.location.search);
      const callbackUrl = searchParams.get("callbackUrl") || "/sme";

      // Show success message
      toast({
        title: "Success",
        description: "Logged in successfully",
        variant: "success",
      });

      // Redirect to callback URL or dashboard
      router.push(callbackUrl);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  });

  return (
    <Form {...form}>
      <form className="max-w-md w-full grid gap-4" onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-darkBlue">
                Email<b className="text-primary font-light"> *</b>
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder="ava.wright@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-darkBlue">
                Password<b className="text-primary font-light"> *</b>
              </FormLabel>
              <FormControl>
                <PasswordInput
                  autoComplete="current-password"
                  placeholder="**********"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-2 flex items-center justify-end gap-1">
          <Link
            href="/auth/sme/forgot-password"
            className="text-base text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <Button
          type="submit"
          disabled={isPending}
          variant={"default"}
          size={"lg"}
        >
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Continue
          <span className="sr-only">Continue</span>
        </Button>
        <div className="flex items-center justify-center gap-1">
          Don{`'`}t you have an account?
          <Link
            href="/auth/sme/signup"
            className="text-base text-primary hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
