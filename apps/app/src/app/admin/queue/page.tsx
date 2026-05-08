import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function OnboardingQueuePage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/signin");

  const shops = await prisma.shop.findMany({
    orderBy: { createdAt: "desc" },
    include: { scriptProfile: true, numbers: true },
  });

  return (
    <main className="max-w-prose mx-auto px-6 md:px-10 py-12">
      <header className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-semibold text-gray-900">Onboarding Queue</h1>
        <p className="mt-1 text-gray-500">{shops.length} shops total</p>
      </header>

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
              className="rounded-lg border border-gray-200 bg-white p-5 flex items-start justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-gray-900">{shop.name}</h2>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      shop.status === "live"
                        ? "bg-emerald-50 text-emerald-700"
                        : shop.status === "onboarding"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {shop.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {shop.industry} · {shop.ownerEmail}
                </p>
                <p className="mt-1 text-xs text-gray-400 font-mono">
                  {shop.numbers.map((n) => n.twilioPhoneNumber).join(", ") || "No number yet"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
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
                <a
                  href={`/admin/shop/${shop.id}`}
                  className="shrink-0 rounded-md border border-gray-200 px-3 py-2 text-xs font-medium hover:border-black transition-colors"
                >
                  Open
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
export const dynamic = 'force-dynamic';
