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
    <nav className="flex flex-col gap-1">
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
    </nav>
  );
}
