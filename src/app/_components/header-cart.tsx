import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ShoppingCart } from 'lucide-react';

export function Cart() {
  return (
    <div className="relative">
      <Link href="/cart">
        <ShoppingCart />
        <sup className="absolute -top-2 -right-3">
          <Badge variant="destructive" className="rounded-full">2</Badge>
        </sup>
      </Link>
    </div>
  );
}