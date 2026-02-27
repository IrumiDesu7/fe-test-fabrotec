export default function HomeLoading() {
  return (
    <div className="container mx-auto px-4 py-6 animate-pulse">
      <div className="flex flex-col gap-6 lg:flex-row">
        <aside className="w-full shrink-0 lg:w-56">
          <div className="mb-4 h-4 w-20 rounded bg-muted" />
          <div className="flex flex-col gap-1.5">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="h-8 rounded bg-muted" />
            ))}
          </div>
        </aside>

        <main className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <div className="space-y-1">
              <div className="h-6 w-32 rounded bg-muted" />
              <div className="h-4 w-20 rounded bg-muted" />
            </div>
            <div className="h-9 w-[180px] rounded bg-muted" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="overflow-hidden rounded-lg border">
                <div className="aspect-square bg-muted" />
                <div className="space-y-2 p-3">
                  <div className="h-4 w-3/4 rounded bg-muted" />
                  <div className="h-3 w-1/2 rounded bg-muted" />
                  <div className="h-5 w-1/3 rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
