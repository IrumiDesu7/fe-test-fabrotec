export default function ProductDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-6 animate-pulse">
      <div className="mb-6 h-4 w-48 rounded bg-muted" />

      <div className="grid gap-8 md:grid-cols-2">
        <div className="aspect-square rounded-xl bg-muted" />

        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <div className="h-4 w-24 rounded bg-muted" />
            <div className="h-8 w-3/4 rounded bg-muted" />
          </div>
          <div className="h-4 w-20 rounded bg-muted" />
          <div className="h-10 w-32 rounded bg-muted" />
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-5/6 rounded bg-muted" />
            <div className="h-4 w-4/6 rounded bg-muted" />
          </div>
          <div className="h-48 rounded-lg bg-muted" />
        </div>
      </div>
    </div>
  );
}
