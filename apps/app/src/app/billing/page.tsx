import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function BillingPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/signin");

  return (
    <main className="max-w-prose mx-auto px-6 md:px-10 py-12">
      <header className="mb-8 border-b border-line pb-6">
        <h1 className="font-display text-3xl font-semibold">Billing</h1>
        <p className="mt-1 text-slate">Manage your subscription.</p>
      </header>

      <div className="rounded-[10px] border border-line bg-white p-6">
        <p className="text-slate">Billing details will appear here once your subscription is active.</p>
      </div>
    </main>
  );
}
export const dynamic = 'force-dynamic';
