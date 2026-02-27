import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { getProduct, getAllProductIds } from "@/lib/api";
import { ImageCarousel } from "@/components/image-carousel";
import { AvailabilityBadge } from "@/components/availability-badge";
import { Badge } from "@/components/ui/badge";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const ids = await getAllProductIds();
  return ids.slice(0, 10).map((id) => ({ id: String(id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(Number(id));
  return {
    title: `${product.title} | ProductStore`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [{ url: product.thumbnail }],
    },
  };
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);
}

function getDiscountedPrice(price: number, discountPercentage: number): number {
  return price * (1 - discountPercentage / 100);
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const productId = Number(id);
  if (Number.isNaN(productId)) notFound();

  const product = await getProduct(productId);

  const discountedPrice = getDiscountedPrice(product.price, product.discountPercentage);
  const stars = Math.round(product.rating);

  return (
    <div className="container mx-auto px-4 py-6">
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Products
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link
          href={`/?category=${product.category}`}
          className="hover:text-foreground transition-colors capitalize"
        >
          {product.category}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground truncate max-w-[200px]">{product.title}</span>
      </nav>

      <div className="grid gap-8 md:grid-cols-2">
        <ImageCarousel images={product.images} alt={product.title} />

        <div className="flex flex-col gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {product.brand && (
                <span className="text-sm font-medium text-muted-foreground">{product.brand}</span>
              )}
              <AvailabilityBadge status={product.availabilityStatus} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{product.title}</h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex" aria-label={`${product.rating} out of 5 stars`}>
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={i < stars ? "text-amber-500" : "text-muted-foreground/30"}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating.toFixed(1)}
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{formatPrice(discountedPrice)}</span>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.price)}
                </span>
                <Badge variant="secondary" className="text-xs">
                  −{Math.round(product.discountPercentage)}%
                </Badge>
              </>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          <div className="mt-2 grid gap-3 rounded-lg border p-4 text-sm">
            <DetailRow label="Category" value={product.category} capitalize />
            {product.brand && <DetailRow label="Brand" value={product.brand} />}
            <DetailRow label="SKU" value={product.sku} />
            <DetailRow label="Weight" value={`${product.weight}g`} />
            <DetailRow
              label="Dimensions"
              value={`${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} cm`}
            />
            <DetailRow label="Warranty" value={product.warrantyInformation} />
            <DetailRow label="Shipping" value={product.shippingInformation} />
            <DetailRow label="Return Policy" value={product.returnPolicy} />
            <DetailRow label="Min. Order" value={String(product.minimumOrderQuantity)} />
          </div>

          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {product.reviews.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-4">
            Reviews ({product.reviews.length})
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {product.reviews.map((review, i) => (
              <div key={i} className="rounded-lg border p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{review.reviewerName}</span>
                  <div className="flex text-xs">
                    {Array.from({ length: 5 }, (_, j) => (
                      <span
                        key={j}
                        className={j < review.rating ? "text-amber-500" : "text-muted-foreground/30"}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
                <time className="mt-2 block text-xs text-muted-foreground/70">
                  {new Date(review.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function DetailRow({
  label,
  value,
  capitalize,
}: {
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-medium ${capitalize ? "capitalize" : ""}`}>{value}</span>
    </div>
  );
}
