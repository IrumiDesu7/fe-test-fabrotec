import { Suspense } from "react";
import type { SortOrder } from "@/lib/api";
import { getProducts, getCategories } from "@/lib/api";
import { ProductGrid } from "@/components/product-grid";
import { CategoryFilter } from "@/components/category-filter";
import { SortControl } from "@/components/sort-control";
import { Pagination } from "@/components/pagination";

interface Props {
  searchParams: Promise<{
    category?: string;
    sort?: string;
    page?: string;
  }>;
}

const PRODUCTS_PER_PAGE = 20;

export default async function HomePage({ searchParams }: Props) {
  const params = await searchParams;
  const category = params.category;
  const sort: SortOrder = params.sort === "desc" ? "desc" : "asc";
  const page = Math.max(1, Number(params.page) || 1);

  const [productsData, categories] = await Promise.all([
    getProducts(page, sort, category),
    getCategories(),
  ]);

  const totalPages = Math.ceil(productsData.total / PRODUCTS_PER_PAGE);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col gap-6 lg:flex-row">
        <aside className="w-full shrink-0 lg:w-56">
          <CategoryFilter categories={categories} activeCategory={category} sort={sort} />
        </aside>

        <main className="flex-1 min-w-0">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold capitalize">
                {category ?? "All Products"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {productsData.total} product{productsData.total !== 1 && "s"}
              </p>
            </div>
            <Suspense>
              <SortControl />
            </Suspense>
          </div>

          <ProductGrid products={productsData.products} />

          <div className="mt-8">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              category={category}
              sort={sort}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
