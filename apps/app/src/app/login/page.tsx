import { signIn } from "@/lib/auth";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-sm space-y-6 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">PickupCraft</h1>
          <p className="text-sm text-gray-500 mt-1">
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
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition"
          >
            Send magic link
          </button>
        </form>
      </div>
    </main>
  );
}
