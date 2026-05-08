import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";

export default async function ShopDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/auth/signin");

  const { id } = await params;
  const shop = await prisma.shop.findUnique({
    where: { id },
    include: { scriptProfile: true, numbers: true, integration: true, calls: { take: 5, orderBy: { startedAt: "desc" } } },
  });

  if (!shop) notFound();

  return (
    <main className="max-w-prose mx-auto px-6 md:px-10 py-12">
      <header className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-semibold text-gray-900">{shop.name}</h1>
        <p className="mt-1 text-gray-500">
          {shop.industry} · {shop.ownerEmail}
        </p>
      </header>

      <div className="space-y-6">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-900">Status</h2>
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

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-900">Numbers</h2>
          {shop.numbers.length === 0 ? (
            <p className="text-gray-500 text-sm">No numbers provisioned.</p>
          ) : (
            <ul className="space-y-1">
              {shop.numbers.map((n) => (
                <li key={n.id} className="font-mono text-sm">
                  {n.twilioPhoneNumber} ({n.status})
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-900">Integrations</h2>
          {shop.integration ? (
            <div key={shop.integration.id} className="flex items-center justify-between text-sm">
              <span className="capitalize">{shop.integration.bookingProvider ?? "—"}</span>
              <span className="font-mono text-xs uppercase">{shop.integration.status}</span>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No integration connected.</p>
          )}
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-900">Recent calls</h2>
          {shop.calls.length === 0 ? (
            <p className="text-gray-500 text-sm">No calls yet.</p>
          ) : (
            <ul className="space-y-2">
              {shop.calls.map((c) => (
                <li key={c.id} className="text-sm">
                  <span className="font-mono text-xs text-gray-400">
                    {c.startedAt.toLocaleString()}
                  </span>{" "}
                  — {c.outcome}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
export const dynamic = 'force-dynamic';
