import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/api";

interface PopularProductsProps {
  products: Product[];
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

const SKELETON_COUNT = 6;

export function PopularProductsSkeleton() {
  return (
    <section className="mb-6 animate-pulse">
      <div className="mb-3 h-5 w-36 rounded bg-muted" />
      <div className="-mx-4">
        <div className="flex gap-3 px-4">
          {Array.from({ length: SKELETON_COUNT }, (_, i) => (
            <div key={i} className="w-40 shrink-0 overflow-hidden rounded-xl border sm:w-44">
              <div className="aspect-4/3 bg-muted" />
              <div className="space-y-1.5 p-2.5">
                <div className="h-3 w-3/4 rounded bg-muted" />
                <div className="h-4 w-1/2 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PopularProducts({ products }: PopularProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="mb-6">
      <div className="mb-3">
        <h2 className="text-base font-bold tracking-tight">Popular Products</h2>
      </div>
      <div className="-mx-4">
        <div className="flex gap-3 overflow-x-auto px-4 pb-4 scrollbar-none snap-x snap-mandatory">
          {products.map((product, i) => {
            const discountedPrice =
              product.price * (1 - product.discountPercentage / 100);
            return (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group shrink-0 snap-start"
              >
                <div className="w-40 overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md sm:w-44">
                  <div className="relative aspect-4/3 overflow-hidden bg-muted">
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      fill
                      sizes="176px"
                      className="object-cover transition-transform group-hover:scale-105"
                      priority={i < 5}
                    />
                    <div className="absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-black/50 to-transparent" />
                    <span className="absolute bottom-1 left-2 text-2xl font-black leading-none text-white/90 drop-shadow-sm select-none">
                      #{i + 1}
                    </span>
                  </div>
                  <div className="p-2.5">
                    <h3 className="line-clamp-1 text-xs font-medium leading-tight">
                      {product.title}
                    </h3>
                    <div className="mt-1 flex items-baseline gap-1.5">
                      <span className="text-sm font-bold">
                        {formatPrice(discountedPrice)}
                      </span>
                      {product.discountPercentage > 0 && (
                        <span className="text-[10px] text-muted-foreground line-through">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
