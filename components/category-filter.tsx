import Link from "next/link";
import type { Category, SortOrder } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: Category[];
  activeCategory?: string;
  sort: SortOrder;
}

export function CategoryFilter({ categories, activeCategory, sort }: CategoryFilterProps) {
  return (
    <nav>
      {/* Mobile: horizontal scrollable pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none lg:hidden">
        <Link href={`/?sort=${sort}`} className="shrink-0">
          <Button
            variant={!activeCategory ? "default" : "outline"}
            size="sm"
            className="rounded-full text-xs"
          >
            All
          </Button>
        </Link>
        {categories.map((cat) => (
          <Link key={cat.slug} href={`/?category=${cat.slug}&sort=${sort}`} className="shrink-0">
            <Button
              variant={activeCategory === cat.slug ? "default" : "outline"}
              size="sm"
              className="rounded-full text-xs capitalize"
            >
              {cat.name}
            </Button>
          </Link>
        ))}
      </div>

      {/* Desktop: vertical sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:gap-1">
        <h2 className="mb-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Categories
        </h2>
        <Link href={`/?sort=${sort}`}>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "w-full justify-start",
              !activeCategory && "bg-accent font-medium",
            )}
          >
            All Products
          </Button>
        </Link>
        {categories.map((cat) => (
          <Link key={cat.slug} href={`/?category=${cat.slug}&sort=${sort}`}>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "w-full justify-start capitalize",
                activeCategory === cat.slug && "bg-accent font-medium",
              )}
            >
              {cat.name}
            </Button>
          </Link>
        ))}
      </div>
    </nav>
  );
}
