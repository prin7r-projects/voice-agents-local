import { signIn } from "@/lib/auth";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-semibold tracking-tight text-center text-gray-900">
          PickupCraft
        </h1>
        <p className="mt-2 text-sm text-gray-500 text-center">
          Sign in with your email to manage your shop.
        </p>
        <form
          action={async (formData) => {
            "use server";
            await signIn("resend", formData);
          }}
          className="mt-8 space-y-4"
        >
          <input
            name="email"
            type="email"
            placeholder="you@shop.com"
            required
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/20"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-black px-4 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
          >
            Send magic link
          </button>
        </form>
      </div>
    </main>
  );
}
