import { Badge } from "@/components/ui/badge";

const STATUS_VARIANTS: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  "In Stock": "default",
  "Low Stock": "secondary",
  "Out of Stock": "destructive",
};

interface AvailabilityBadgeProps {
  status: string;
}

export function AvailabilityBadge({ status }: AvailabilityBadgeProps) {
  const variant = STATUS_VARIANTS[status] ?? "outline";

  return <Badge variant={variant}>{status}</Badge>;
}
