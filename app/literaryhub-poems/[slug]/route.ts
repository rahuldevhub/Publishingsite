import { NextRequest, NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";

const LEGACY_POEM_REDIRECTS: Record<string, string> = {
  "sun-in-africa": "/litspace/sun-in-africa",
};

function normalizeLegacySlug(slug: string) {
  return slug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const destination = LEGACY_POEM_REDIRECTS[normalizeLegacySlug(slug)];

  if (!destination) {
    return new NextResponse(null, { status: 404 });
  }

  const redirectUrl = new URL(destination, SITE_URL);
  redirectUrl.search = request.nextUrl.search;

  return NextResponse.redirect(redirectUrl, 308);
}
