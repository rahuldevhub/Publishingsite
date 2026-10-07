import { SITE_URL } from "./site";

export function archivePage(value: string | undefined): number {
  const page = Number(value);
  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}

/** Tracking parameters are excluded; distinct pagination keeps its own URL. */
export function archiveCanonical(path: string, page: number): string {
  return `${SITE_URL}${path}${page > 1 ? `?page=${page}` : ""}`;
}
