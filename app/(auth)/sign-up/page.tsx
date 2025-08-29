import SignUpForm from "@/features/auth/components/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Sign Up</h2>
        <SignUpForm />
      </div>
    </div>
  );
}
