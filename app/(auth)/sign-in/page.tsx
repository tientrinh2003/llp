import SignInForm from "@/components/form/SignInForm";
export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Sign In</h2>
        <SignInForm />
      </div>
    </div>
  );
}