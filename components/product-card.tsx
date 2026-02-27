import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { AvailabilityBadge } from "@/components/availability-badge";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group h-full overflow-hidden transition-shadow hover:shadow-md py-0 gap-0">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform group-hover:scale-105"
            priority={priority}
          />
          {product.discountPercentage > 0 && (
            <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
              −{Math.round(product.discountPercentage)}%
            </span>
          )}
        </div>
        <CardContent className="flex flex-col gap-1.5 p-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 text-sm font-medium leading-tight">{product.title}</h3>
            <AvailabilityBadge status={product.availabilityStatus} />
          </div>
          {product.brand && (
            <span className="text-xs text-muted-foreground">{product.brand}</span>
          )}
          <div className="flex items-center gap-1.5">
            <div className="flex text-xs" aria-label={`${product.rating} out of 5`}>
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className={
                    i < Math.round(product.rating) ? "text-amber-500" : "text-muted-foreground/30"
                  }
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">{product.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold">{formatPrice(discountedPrice)}</span>
            {product.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
