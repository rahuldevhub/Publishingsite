export default function CaseStudiesLoading() {
  return (
    <main>
      {/* Hero skeleton */}
      <section className="bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
          <div className="h-3 w-32 bg-gray-700 rounded mb-4 animate-pulse" />
          <div className="h-12 w-2/3 bg-gray-700 rounded mb-3 animate-pulse" />
          <div className="h-12 w-1/2 bg-gray-700 rounded mb-6 animate-pulse" />
          <div className="h-5 w-3/4 bg-gray-800 rounded mb-2 animate-pulse" />
          <div className="h-5 w-2/3 bg-gray-800 rounded animate-pulse" />
        </div>
      </section>

      {/* Grid skeleton */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="aspect-video bg-gray-200 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="h-4 bg-gray-100 rounded animate-pulse w-1/2" />
                <div className="flex gap-2">
                  <div className="h-5 w-20 bg-amber-50 rounded-full animate-pulse" />
                  <div className="h-5 w-20 bg-amber-50 rounded-full animate-pulse" />
                </div>
                <div className="h-3 bg-gray-100 rounded animate-pulse" />
                <div className="h-3 bg-gray-100 rounded animate-pulse w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
