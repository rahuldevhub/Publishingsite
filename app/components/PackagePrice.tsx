"use client";
import { useCurrency } from "@/hooks/useCurrency";
import { formatPackagePrice, type PackageKey } from "@/lib/pricing";

export default function PackagePrice({ packageKey }: { packageKey: PackageKey }) {
  const { currency } = useCurrency();
  return <>{formatPackagePrice(packageKey, currency)}</>;
}
