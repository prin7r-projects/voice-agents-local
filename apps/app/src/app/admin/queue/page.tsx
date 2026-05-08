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
      <header className="mb-8 border-b border-line pb-6">
        <h1 className="font-display text-3xl font-semibold">Onboarding Queue</h1>
        <p className="mt-1 text-slate">{shops.length} shops total</p>
      </header>

      <div className="space-y-4">
        {shops.map((shop) => (
          <div
            key={shop.id}
            className="rounded-[10px] border border-line bg-white p-5 flex items-start justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg font-semibold">{shop.name}</h2>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider font-mono ${
                    shop.status === "live"
                      ? "bg-sage/10 text-sage"
                      : shop.status === "onboarding"
                      ? "bg-copper/10 text-copper"
                      : "bg-slate/10 text-slate"
                  }`}
                >
                  {shop.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate">
                {shop.industry} · {shop.ownerEmail}
              </p>
              <p className="mt-1 text-xs text-slate font-mono">
                {shop.numbers.map((n) => n.twilioPhoneNumber).join(", ") || "No number yet"}
              </p>
            </div>
            <a
              href={`/admin/shop/${shop.id}`}
              className="shrink-0 rounded-[10px] border border-line px-3 py-2 text-xs font-medium hover:border-copper transition-colors"
            >
              Open
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
export const dynamic = 'force-dynamic';
