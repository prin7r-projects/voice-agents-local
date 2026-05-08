import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function OperatorQueuePage() {
  const shops = await prisma.shop.findMany({
    where: { status: "onboarding" },
    orderBy: { createdAt: "asc" },
    include: { scriptProfile: true, integration: true },
  });

  return (
    <main className="max-w-5xl mx-auto px-6 md:px-10 py-12">
      <header className="mb-8 border-b border-gray-200 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Onboarding queue</h1>
          <p className="mt-1 text-gray-500">{shops.length} shop{shops.length === 1 ? "" : "s"} waiting</p>
        </div>
      </header>

      {shops.length === 0 ? (
        <p className="text-gray-500">No shops in onboarding queue.</p>
      ) : (
        <div className="space-y-4">
          {shops.map((shop) => {
            const hoursSince = Math.floor(
              (Date.now() - shop.createdAt.getTime()) / (1000 * 60 * 60)
            );
            const slaUrgent = hoursSince >= 48;
            const slaWarning = hoursSince >= 24;

            return (
              <div
                key={shop.id}
                className="rounded-lg border border-gray-200 bg-white p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{shop.name}</h2>
                    <p className="text-sm text-gray-500 mt-0.5 capitalize">
                      {shop.industry} · {shop.ownerEmail}
                    </p>
                  </div>
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
                </div>

                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider font-mono">Timezone</p>
                    <p className="mt-0.5">{shop.tz}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider font-mono">Owner SMS</p>
                    <p className="mt-0.5">{shop.ownerSms ?? "—"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider font-mono">Booking provider</p>
                    <p className="mt-0.5 capitalize">{shop.integration?.bookingProvider ?? "—"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider font-mono">Created</p>
                    <p className="mt-0.5">{shop.createdAt.toLocaleDateString()}</p>
                  </div>
                </div>

                {shop.scriptProfile?.urgencyTriggers && (
                  <div className="mt-3">
                    <p className="text-gray-400 text-xs uppercase tracking-wider font-mono">Urgency triggers</p>
                    <p className="mt-0.5 text-sm">
                      {(shop.scriptProfile.urgencyTriggers as string[]).join(", ")}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
