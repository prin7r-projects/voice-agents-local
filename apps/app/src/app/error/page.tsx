export default function ErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-canvas">
      <div className="w-full max-w-sm text-center space-y-4 rounded-xl border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-ink">Something went wrong</h1>
        <p className="text-sm text-muted-foreground">
          We couldn't sign you in. Please try again or contact support.
        </p>
      </div>
    </main>
  );
}
