import { signIn } from "@/lib/auth";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-center">
          PickupCraft
        </h1>
        <p className="mt-2 text-sm text-slate text-center">
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
            className="w-full rounded-[10px] border border-line bg-white px-4 py-3 text-sm outline-none focus:border-copper"
          />
          <button
            type="submit"
            className="w-full rounded-[10px] bg-copper px-4 py-3 text-sm font-medium text-white hover:bg-copper-2 transition-colors"
          >
            Send magic link
          </button>
        </form>
      </div>
    </main>
  );
}
