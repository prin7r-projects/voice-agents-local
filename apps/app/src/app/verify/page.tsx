export default function VerifyRequestPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-canvas">
      <div className="w-full max-w-sm text-center space-y-4 rounded-xl border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-ink">Check your email</h1>
        <p className="text-sm text-muted-foreground">
          We sent you a magic link. Click it to sign in to your PickupCraft
          dashboard.
        </p>
      </div>
    </main>
  );
}
