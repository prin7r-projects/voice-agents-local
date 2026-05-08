import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function QueuePage() {
  const shops = await prisma.shop.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      scriptProfile: true,
      integration: true,
      _count: { select: { numbers: true } },
    },
  });

  const byStatus = {
    onboarding: shops.filter((s) => s.status === "onboarding"),
    live: shops.filter((s) => s.status === "live"),
    paused: shops.filter((s) => s.status === "paused"),
    cancelled: shops.filter((s) => s.status === "cancelled"),
  };

  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            PickupCraft Operator Console
          </h1>
          <p className="text-gray-500 mt-1">
            Onboarding queue · {shops.length} shops total
          </p>
        </div>
        <div className="flex gap-3 text-sm">
          <StatusBadge count={byStatus.onboarding.length} label="Onboarding" color="amber" />
          <StatusBadge count={byStatus.live.length} label="Live" color="emerald" />
          <StatusBadge count={byStatus.paused.length} label="Paused" color="gray" />
        </div>
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Onboarding Queue</h2>
        {byStatus.onboarding.length === 0 ? (
          <div className="rounded-lg border border-dashed p-8 text-center text-gray-400">
            No shops in onboarding queue.
          </div>
        ) : (
          <div className="grid gap-3">
            {byStatus.onboarding.map((shop) => {
              const hoursSince = Math.floor(
                (Date.now() - shop.createdAt.getTime()) / (1000 * 60 * 60)
              );
              const slaUrgent = hoursSince >= 48;
              const slaWarning = hoursSince >= 24;

              return (
                <div
                  key={shop.id}
                  className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium text-gray-900">{shop.name}</div>
                    <div className="text-sm text-gray-500">
                      {shop.industry} · {shop.ownerEmail} ·{" "}
                      {shop.createdAt.toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Numbers: {shop._count.numbers} · Provider:{" "}
                      {shop.integration?.bookingProvider ?? "none"} · Script:{" "}
                      {shop.scriptProfile ? "configured" : "missing"}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        slaUrgent
                          ? "bg-red-50 text-red-700"
                          : slaWarning
                          ? "bg-amber-50 text-amber-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {slaUrgent
                        ? `${hoursSince}h — overdue`
                        : slaWarning
                        ? `${hoursSince}h — act soon`
                        : `${hoursSince}h — 72h SLA`}
                    </span>
                    <Link
                      href={`/shops/${shop.id}`}
                      className="text-sm font-medium text-black hover:underline"
                    >
                      Open →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-lg font-semibold">Live Shops</h2>
        {byStatus.live.length === 0 ? (
          <div className="rounded-lg border border-dashed p-8 text-center text-gray-400">
            No live shops yet.
          </div>
        ) : (
          <div className="grid gap-3">
            {byStatus.live.map((shop) => (
              <div
                key={shop.id}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm flex items-center justify-between"
              >
                <div>
                  <div className="font-medium text-gray-900">{shop.name}</div>
                  <div className="text-sm text-gray-500">
                    {shop.industry} · {shop.ownerEmail}
                  </div>
                </div>
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                  live
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function StatusBadge({
  count,
  label,
  color,
}: {
  count: number;
  label: string;
  color: "amber" | "emerald" | "gray";
}) {
  const colorMap = {
    amber: "bg-amber-50 text-amber-700",
    emerald: "bg-emerald-50 text-emerald-700",
    gray: "bg-gray-100 text-gray-600",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${colorMap[color]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {count} {label}
    </span>
  );
}
