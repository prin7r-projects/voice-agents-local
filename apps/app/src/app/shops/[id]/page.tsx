import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ShopPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { id } = await params;

  const shop = await prisma.shop.findUnique({
    where: { id },
    include: {
      scriptProfile: true,
      integration: true,
      numbers: true,
      calls: { orderBy: { startedAt: "desc" }, take: 10 },
    },
  });

  if (!shop) {
    return (
      <main className="min-h-screen p-8">
        <p>Shop not found.</p>
        <Link href="/queue" className="text-black hover:underline">
          ← Back to queue
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/queue" className="text-sm text-black hover:underline">
          ← Back to queue
        </Link>
        <h1 className="text-3xl font-bold mt-2">{shop.name}</h1>
        <div className="flex items-center gap-3 mt-2">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              shop.status === "live"
                ? "bg-emerald-50 text-emerald-700"
                : shop.status === "onboarding"
                ? "bg-amber-50 text-amber-700"
                : "bg-slate-50 text-slate-700"
            }`}
          >
            {shop.status}
          </span>
          <span className="text-sm text-muted-foreground">
            {shop.industry} · {shop.tz}
          </span>
        </div>
      </div>

      <div className="grid gap-6">
        <section className="rounded-lg border bg-white p-6">
          <h2 className="text-lg font-semibold mb-4">Contact</h2>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Owner email</dt>
              <dd>{shop.ownerEmail}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Owner SMS</dt>
              <dd>{shop.ownerSms ?? "—"}</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-lg border bg-white p-6">
          <h2 className="text-lg font-semibold mb-4">Hours</h2>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {Object.entries(shop.hours as Record<string, number[]>).map(
              ([day, range]) => (
                <div key={day}>
                  <dt className="capitalize text-muted-foreground">{day}</dt>
                  <dd>
                    {range.length === 2
                      ? `${range[0]}:00 – ${range[1]}:00`
                      : "Closed"}
                  </dd>
                </div>
              )
            )}
          </dl>
        </section>

        {shop.scriptProfile && (
          <section className="rounded-lg border bg-white p-6">
            <h2 className="text-lg font-semibold mb-4">Script Profile</h2>
            <dl className="grid gap-3 text-sm">
              <div>
                <dt className="text-muted-foreground">Vapi Assistant ID</dt>
                <dd className="font-mono text-xs">
                  {shop.scriptProfile.vapiAssistantId ?? "Not provisioned"}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Pricing</dt>
                <dd>
                  <ul className="list-disc pl-4">
                    {(
                      (shop.scriptProfile.pricing as any[]) ?? []
                    ).map((p: any, i: number) => (
                      <li key={i}>
                        {p.service} — ${(p.priceCents / 100).toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Urgency triggers</dt>
                <dd>
                  {(shop.scriptProfile.urgencyTriggers as string[] ?? []).join(
                    ", "
                  ) || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Fallback text</dt>
                <dd className="italic text-muted-foreground">
                  {shop.scriptProfile.fallbackText ?? "—"}
                </dd>
              </div>
            </dl>
          </section>
        )}

        <section className="rounded-lg border bg-white p-6">
          <h2 className="text-lg font-semibold mb-4">Numbers</h2>
          {shop.numbers.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No numbers provisioned yet.
            </p>
          ) : (
            <ul className="divide-y">
              {shop.numbers.map((n) => (
                <li key={n.id} className="py-2 text-sm flex justify-between">
                  <span className="font-mono">{n.twilioPhoneNumber}</span>
                  <span className="text-muted-foreground">{n.status}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-lg border bg-white p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Calls</h2>
          {shop.calls.length === 0 ? (
            <p className="text-sm text-muted-foreground">No calls yet.</p>
          ) : (
            <ul className="divide-y">
              {shop.calls.map((c) => (
                <li key={c.id} className="py-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-mono">{c.callerNumber}</span>
                    <span className="text-muted-foreground">
                      {c.startedAt.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-muted-foreground mt-0.5">
                    {c.intent ?? "unknown intent"} ·{" "}
                    {c.outcome ?? "no outcome"} · {c.durationS ?? 0}s
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
