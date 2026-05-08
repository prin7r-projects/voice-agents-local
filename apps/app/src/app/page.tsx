import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function HomePage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/signin");
  }

  return (
    <main className="max-w-prose mx-auto px-6 md:px-10 py-20">
      <header className="mb-12 border-b border-gray-200 pb-6">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
          PickupCraft
        </h1>
        <p className="mt-2 text-gray-500">Welcome, {session.user.email}</p>
      </header>

      <nav className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/dashboard"
          className="rounded-lg border border-gray-200 bg-white p-6 hover:border-black transition-colors"
        >
          <h2 className="text-xl font-semibold text-gray-900">Dashboard</h2>
          <p className="mt-1 text-sm text-gray-500">Calls, transcripts, and urgent alerts.</p>
        </Link>
        <Link
          href="/settings"
          className="rounded-lg border border-gray-200 bg-white p-6 hover:border-black transition-colors"
        >
          <h2 className="text-xl font-semibold text-gray-900">Voice Settings</h2>
          <p className="mt-1 text-sm text-gray-500">Hours, pricing, and script tuning.</p>
        </Link>
        <Link
          href="/billing"
          className="rounded-lg border border-gray-200 bg-white p-6 hover:border-black transition-colors"
        >
          <h2 className="text-xl font-semibold text-gray-900">Billing</h2>
          <p className="mt-1 text-sm text-gray-500">Subscription and usage.</p>
        </Link>
        <Link
          href="/admin/queue"
          className="rounded-lg border border-gray-200 bg-white p-6 hover:border-black transition-colors"
        >
          <h2 className="text-xl font-semibold text-gray-900">Onboarding Queue</h2>
          <p className="mt-1 text-sm text-gray-500">Operator view — new shop intake.</p>
        </Link>
      </nav>
    </main>
  );
}
export const dynamic = 'force-dynamic';
