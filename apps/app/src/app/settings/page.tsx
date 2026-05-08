import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/signin");

  const shop = session.user.shopId
    ? await prisma.shop.findUnique({
        where: { id: session.user.shopId },
        include: { scriptProfile: true },
      })
    : null;

  return (
    <main className="max-w-prose mx-auto px-6 md:px-10 py-12">
      <header className="mb-8 border-b border-line pb-6">
        <h1 className="font-display text-3xl font-semibold">Voice Settings</h1>
        <p className="mt-1 text-slate">{shop?.name ?? "No shop linked"}</p>
      </header>

      <div className="rounded-[10px] border border-line bg-white p-6">
        <h2 className="font-display text-lg font-semibold mb-4">Shop hours</h2>
        <pre className="font-mono text-xs bg-canvas-2 rounded-[10px] p-4 overflow-auto">
          {JSON.stringify(shop?.hours ?? {}, null, 2)}
        </pre>

        <h2 className="font-display text-lg font-semibold mt-6 mb-4">Pricing</h2>
        <pre className="font-mono text-xs bg-canvas-2 rounded-[10px] p-4 overflow-auto">
          {JSON.stringify(shop?.scriptProfile?.pricing ?? [], null, 2)}
        </pre>

        <h2 className="font-display text-lg font-semibold mt-6 mb-4">Urgency triggers</h2>
        <pre className="font-mono text-xs bg-canvas-2 rounded-[10px] p-4 overflow-auto">
          {JSON.stringify(shop?.scriptProfile?.urgencyTriggers ?? [], null, 2)}
        </pre>
      </div>
    </main>
  );
}
export const dynamic = 'force-dynamic';
