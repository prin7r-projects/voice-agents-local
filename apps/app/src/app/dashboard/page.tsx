import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/signin");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const calls = session.user.shopId
    ? await prisma.call.findMany({
        where: { shopId: session.user.shopId, startedAt: { gte: today } },
        orderBy: { startedAt: "desc" },
        take: 20,
        include: { booking: true },
      })
    : [];

  const shop = session.user.shopId
    ? await prisma.shop.findUnique({ where: { id: session.user.shopId } })
    : null;

  return (
    <main className="max-w-prose mx-auto px-6 md:px-10 py-12">
      <header className="mb-8 border-b border-line pb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold">Dashboard</h1>
          <p className="mt-1 text-slate">{shop?.name ?? "No shop linked"}</p>
        </div>
        <Link
          href="/"
          className="rounded-[10px] border border-line px-4 py-2 text-sm hover:border-copper transition-colors"
        >
          Home
        </Link>
      </header>

      <section>
        <h2 className="font-display text-xl font-semibold mb-4">Today's calls</h2>
        {calls.length === 0 ? (
          <p className="text-slate">No calls yet today.</p>
        ) : (
          <div className="space-y-3">
            {calls.map((call) => (
              <div
                key={call.id}
                className="rounded-[10px] border border-line bg-white p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-slate uppercase tracking-wider">
                    {call.callerNumber}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider font-mono ${
                      call.outcome === "booked"
                        ? "bg-sage/10 text-sage"
                        : call.outcome === "escalated"
                        ? "bg-copper/10 text-copper"
                        : "bg-slate/10 text-slate"
                    }`}
                  >
                    {call.outcome}
                  </span>
                </div>
                <p className="mt-2 text-sm">{call.transcript?.slice(0, 120)}…</p>
                {call.booking && (
                  <p className="mt-2 text-xs text-sage font-mono">
                    Booked {call.booking.scheduledAt?.toLocaleString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
export const dynamic = 'force-dynamic';
