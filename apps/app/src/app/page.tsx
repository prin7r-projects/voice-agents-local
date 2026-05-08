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
      <header className="mb-12 border-b border-line pb-6">
        <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight">
          PickupCraft
        </h1>
        <p className="mt-2 text-slate">Welcome, {session.user.email}</p>
      </header>

      <nav className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/dashboard"
          className="rounded-[10px] border border-line bg-white p-6 hover:border-copper transition-colors"
        >
          <h2 className="font-display text-xl font-semibold">Dashboard</h2>
          <p className="mt-1 text-sm text-slate">Calls, transcripts, and urgent alerts.</p>
        </Link>
        <Link
          href="/settings"
          className="rounded-[10px] border border-line bg-white p-6 hover:border-copper transition-colors"
        >
          <h2 className="font-display text-xl font-semibold">Voice Settings</h2>
          <p className="mt-1 text-sm text-slate">Hours, pricing, and script tuning.</p>
        </Link>
        <Link
          href="/billing"
          className="rounded-[10px] border border-line bg-white p-6 hover:border-copper transition-colors"
        >
          <h2 className="font-display text-xl font-semibold">Billing</h2>
          <p className="mt-1 text-sm text-slate">Subscription and usage.</p>
        </Link>
        <Link
          href="/admin/queue"
          className="rounded-[10px] border border-line bg-white p-6 hover:border-copper transition-colors"
        >
          <h2 className="font-display text-xl font-semibold">Onboarding Queue</h2>
          <p className="mt-1 text-sm text-slate">Operator view — new shop intake.</p>
        </Link>
      </nav>
    </main>
  );
}
export const dynamic = 'force-dynamic';
