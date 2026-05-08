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
      <header className="mb-8 border-b border-line pb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold">Onboarding queue</h1>
          <p className="mt-1 text-slate">{shops.length} shop{shops.length === 1 ? "" : "s"} waiting</p>
        </div>
      </header>

      {shops.length === 0 ? (
        <p className="text-slate">No shops in onboarding queue.</p>
      ) : (
        <div className="space-y-4">
          {shops.map((shop) => (
            <div
              key={shop.id}
              className="rounded-[10px] border border-line bg-white p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-lg font-semibold">{shop.name}</h2>
                  <p className="text-sm text-slate mt-0.5 capitalize">
                    {shop.industry} · {shop.ownerEmail}
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider font-mono bg-copper/10 text-copper">
                  {shop.status}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-slate text-xs uppercase tracking-wider font-mono">Timezone</p>
                  <p className="mt-0.5">{shop.tz}</p>
                </div>
                <div>
                  <p className="text-slate text-xs uppercase tracking-wider font-mono">Owner SMS</p>
                  <p className="mt-0.5">{shop.ownerSms ?? "—"}</p>
                </div>
                <div>
                  <p className="text-slate text-xs uppercase tracking-wider font-mono">Booking provider</p>
                  <p className="mt-0.5 capitalize">{shop.integration?.bookingProvider ?? "—"}</p>
                </div>
                <div>
                  <p className="text-slate text-xs uppercase tracking-wider font-mono">Created</p>
                  <p className="mt-0.5">{shop.createdAt.toLocaleDateString()}</p>
                </div>
              </div>

              {shop.scriptProfile?.urgencyTriggers && (
                <div className="mt-3">
                  <p className="text-slate text-xs uppercase tracking-wider font-mono">Urgency triggers</p>
                  <p className="mt-0.5 text-sm">
                    {(shop.scriptProfile.urgencyTriggers as string[]).join(", ")}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
