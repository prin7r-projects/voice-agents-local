import { signIn } from "@/lib/auth";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-canvas">
      <div className="w-full max-w-sm space-y-6 rounded-xl border bg-white p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-ink">PickupCraft</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Sign in with your email
          </p>
        </div>
        <form
          action={async (formData) => {
            "use server";
            await signIn("resend", formData);
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-coral px-4 py-2 text-sm font-medium text-white hover:bg-coral/90 transition"
          >
            Send magic link
          </button>
        </form>
      </div>
    </main>
  );
}
