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
      <header className="mb-8 border-b border-gray-200 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-500">{shop?.name ?? "No shop linked"}</p>
        </div>
        <Link
          href="/"
          className="rounded-md border border-gray-200 px-4 py-2 text-sm hover:border-black transition-colors"
        >
          Home
        </Link>
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Today's calls</h2>
        {calls.length === 0 ? (
          <p className="text-gray-500">No calls yet today.</p>
        ) : (
          <div className="space-y-3">
            {calls.map((call) => (
              <div
                key={call.id}
                className="rounded-lg border border-gray-200 bg-white p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-gray-400 uppercase tracking-wider">
                    {call.callerNumber}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      call.outcome === "booked"
                        ? "bg-emerald-50 text-emerald-700"
                        : call.outcome === "escalated"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {call.outcome}
                  </span>
                </div>
                <p className="mt-2 text-sm">{call.transcript?.slice(0, 120)}…</p>
                {call.booking && (
                  <p className="mt-2 text-xs text-emerald-600 font-mono">
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
