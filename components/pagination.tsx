import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  category?: string;
  sort: string;
}

export function Pagination({ currentPage, totalPages, category, sort }: PaginationProps) {
  if (totalPages <= 1) return null;

  function buildHref(page: number): string {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    params.set("sort", sort);
    if (page > 1) params.set("page", String(page));
    return `/?${params.toString()}`;
  }

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="Pagination">
      {currentPage > 1 ? (
        <Link href={buildHref(currentPage - 1)}>
          <Button variant="ghost" size="icon" aria-label="Previous page">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
      ) : (
        <Button variant="ghost" size="icon" disabled aria-label="Previous page">
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      {pages.map((page, i) =>
        page === null ? (
          <span key={`ellipsis-${i}`} className="px-1 text-muted-foreground">
            ...
          </span>
        ) : (
          <Link key={page} href={buildHref(page)}>
            <Button
              variant={page === currentPage ? "default" : "ghost"}
              size="icon"
              className="h-9 w-9"
            >
              {page}
            </Button>
          </Link>
        ),
      )}

      {currentPage < totalPages ? (
        <Link href={buildHref(currentPage + 1)}>
          <Button variant="ghost" size="icon" aria-label="Next page">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      ) : (
        <Button variant="ghost" size="icon" disabled aria-label="Next page">
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </nav>
  );
}

function getPageNumbers(current: number, total: number): (number | null)[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  if (current <= 3) return [1, 2, 3, 4, null, total];
  if (current >= total - 2) return [1, null, total - 3, total - 2, total - 1, total];
  return [1, null, current - 1, current, current + 1, null, total];
}
