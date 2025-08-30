"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { signIn } from "next-auth/react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const FormSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have at least 8 characters"),
});

const SignInForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setLoading(true);
    setError(null);

    // Gửi request đến NextAuth credentials provider
    const res = await signIn("credentials", {
      redirect: false,
      username: values.username,
      password: values.password,
    });

    setLoading(false);

    if (!res?.error) {
      // ✅ Lấy session để kiểm tra role
      const sessionRes = await fetch("/api/auth/session");
      const sessionData = await sessionRes.json();

      if (sessionData?.user?.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/home");
      }
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}
          <Button className="w-full mt-6" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
          or
        </div>
        <GoogleSignInButton callbackUrl="/home">
          Sign in with Google
        </GoogleSignInButton>
        <p className="text-center text-sm text-gray-600 mt-2">
          If you don&apos;t have an account, please&nbsp;
          <Link className="text-blue-500 hover:underline" href="/sign-up">
            Sign up
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default SignInForm;
