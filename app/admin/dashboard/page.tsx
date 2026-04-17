import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-session";
import { createServerClient } from "@/lib/supabase";
import LogoutButton from "./LogoutButton";

// ── Badge helpers ────────────────────────────────────────────────────────────

function AmberBadge({ label }: { label: string }) {
  return (
    <span style={{ background: "#fef3c7", color: "#92400e", borderRadius: 9999, padding: "2px 8px", fontSize: 11, fontWeight: 600, display: "inline-flex", alignItems: "center" }}>
      {label}
    </span>
  );
}

function RedBadge({ label }: { label: string }) {
  return (
    <span style={{ background: "#fee2e2", color: "#991b1b", borderRadius: 9999, padding: "2px 8px", fontSize: 11, fontWeight: 600, display: "inline-flex", alignItems: "center" }}>
      {label}
    </span>
  );
}

function GreenBadge({ label }: { label: string }) {
  return (
    <span style={{ background: "#dcfce7", color: "#166534", borderRadius: 9999, padding: "2px 8px", fontSize: 11, fontWeight: 600, display: "inline-flex", alignItems: "center" }}>
      {label}
    </span>
  );
}

function StatsLine({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
      {children}
    </div>
  );
}

function Count({ n, label }: { n: number; label: string }) {
  return (
    <span style={{ fontSize: 12, color: "#6b7280" }}>
      {n} {label}
    </span>
  );
}

// ── Static card definitions ──────────────────────────────────────────────────

const contentItems = [
  {
    label: "Employees",
    href: "/admin/employees",
    description: "Manage team members and profiles",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    label: "Blog Posts",
    href: "/admin/blog-posts",
    description: "Create and publish blog articles",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
      </svg>
    ),
  },
  {
    label: "Authors",
    href: "/admin/authors",
    description: "Manage author profiles and bios",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    ),
  },
  {
    label: "Books",
    href: "/admin/books",
    description: "Add and update book listings",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    label: "Careers",
    href: "/admin/careers",
    description: "Post and manage job openings",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
      </svg>
    ),
  },
];

const communityItems = [
  {
    label: "Litspace Posts",
    href: "/admin/litspace-posts",
    description: "Review and approve community submissions",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
  {
    label: "Comments",
    href: "/admin/comments",
    description: "Moderate and manage user comments",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function DashboardPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const adminName = session.name;
  const supabase = createServerClient();

  // Fetch last-viewed timestamps for leads sections (needed before count queries)
  const { data: sectionViews } = await supabase
    .from("admin_section_views")
    .select("section_key, last_viewed_at")
    .in("section_key", ["contact_enquiries", "newsletter_subscribers", "lead_captures", "package_inquiries"]);

  const viewedAt = Object.fromEntries(
    (sectionViews ?? []).map((s) => [s.section_key, s.last_viewed_at as string])
  );
  const fallback = "1970-01-01T00:00:00Z";

  // Fetch all counts in parallel — default to 0 on error
  const results = await Promise.all([
    supabase.from("blog_posts").select("*", { count: "exact", head: true }),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("published", false),
    supabase.from("authors").select("*", { count: "exact", head: true }),
    supabase.from("books").select("*", { count: "exact", head: true }),
    supabase.from("careers").select("*", { count: "exact", head: true }),
    supabase.from("careers").select("*", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("employees").select("*", { count: "exact", head: true }),
    supabase.from("litspace_posts").select("*", { count: "exact", head: true }),
    supabase.from("litspace_posts").select("*", { count: "exact", head: true }).eq("approved", false),
    supabase.from("comments").select("*", { count: "exact", head: true }),
    supabase.from("comments").select("*", { count: "exact", head: true }).eq("approved", false),
    supabase.from("contact_enquiries").select("*", { count: "exact", head: true }),
    supabase.from("newsletter_subscribers").select("*", { count: "exact", head: true }),
    supabase.from("lead_captures").select("*", { count: "exact", head: true }),
    supabase.from("package_inquiries").select("*", { count: "exact", head: true }),
    supabase.from("contact_enquiries").select("*", { count: "exact", head: true }).gt("created_at", viewedAt["contact_enquiries"] ?? fallback),
    supabase.from("newsletter_subscribers").select("*", { count: "exact", head: true }).gt("created_at", viewedAt["newsletter_subscribers"] ?? fallback),
    supabase.from("lead_captures").select("*", { count: "exact", head: true }).gt("created_at", viewedAt["lead_captures"] ?? fallback),
    supabase.from("package_inquiries").select("*", { count: "exact", head: true }).gt("created_at", viewedAt["package_inquiries"] ?? fallback),
  ]);

  const [
    blogTotal,
    blogUnpublished,
    authorsTotal,
    booksTotal,
    careersTotal,
    careersActive,
    employeesTotal,
    litspaceTotal,
    litspacePending,
    commentsTotal,
    commentsPending,
    contactEnquiriesTotal,
    newsletterSubscribersTotal,
    leadCapturesTotal,
    packageInquiriesTotal,
    contactEnquiriesNew,
    newsletterSubscribersNew,
    leadCapturesNew,
    packageInquiriesNew,
  ] = results.map((r) => r.count ?? 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top nav */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              Welcome, <span className="font-medium text-gray-700">{adminName}</span>
            </span>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-12">

        {/* Content Management */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Content Management</h2>
            <p className="mt-1 text-sm text-gray-500">Select a section to manage your content.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* Employees */}
            <a href="/admin/employees" className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-400 hover:shadow-sm transition-all">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                  {contentItems[0].icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-gray-700">Employees</h3>
                  <p className="mt-0.5 text-sm text-gray-500">Manage team members and profiles</p>
                  <StatsLine>
                    <Count n={employeesTotal} label="employees" />
                  </StatsLine>
                </div>
              </div>
            </a>

            {/* Blog Posts */}
            <a href="/admin/blog-posts" className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-400 hover:shadow-sm transition-all">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                  {contentItems[1].icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-gray-700">Blog Posts</h3>
                  <p className="mt-0.5 text-sm text-gray-500">Create and publish blog articles</p>
                  <StatsLine>
                    <Count n={blogTotal} label="posts" />
                    {blogUnpublished > 0 && <AmberBadge label={`${blogUnpublished} drafts`} />}
                  </StatsLine>
                </div>
              </div>
            </a>

            {/* Authors */}
            <a href="/admin/authors" className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-400 hover:shadow-sm transition-all">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                  {contentItems[2].icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-gray-700">Authors</h3>
                  <p className="mt-0.5 text-sm text-gray-500">Manage author profiles and bios</p>
                  <StatsLine>
                    <Count n={authorsTotal} label="authors" />
                  </StatsLine>
                </div>
              </div>
            </a>

            {/* Books */}
            <a href="/admin/books" className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-400 hover:shadow-sm transition-all">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                  {contentItems[3].icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-gray-700">Books</h3>
                  <p className="mt-0.5 text-sm text-gray-500">Add and update book listings</p>
                  <StatsLine>
                    <Count n={booksTotal} label="books" />
                  </StatsLine>
                </div>
              </div>
            </a>

            {/* Careers */}
            <a href="/admin/careers" className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-400 hover:shadow-sm transition-all">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                  {contentItems[4].icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-gray-700">Careers</h3>
                  <p className="mt-0.5 text-sm text-gray-500">Post and manage job openings</p>
                  <StatsLine>
                    <Count n={careersTotal} label="listings" />
                    {careersActive > 0 && <GreenBadge label={`${careersActive} active`} />}
                  </StatsLine>
                </div>
              </div>
            </a>

            {/* Case Studies */}
            <a href="/admin/case-studies" className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-400 hover:shadow-sm transition-all">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-gray-700">Case Studies</h3>
                  <p className="mt-0.5 text-sm text-gray-500">Author success stories with PDF downloads</p>
                </div>
              </div>
            </a>

          </div>
        </div>

        {/* Community Management */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Community Management</h2>
            <p className="mt-1 text-sm text-gray-500">Manage user-generated content and engagement.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* Litspace Posts */}
            <a href="/admin/litspace-posts" className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-400 hover:shadow-sm transition-all">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                  {communityItems[0].icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-gray-700">Litspace Posts</h3>
                  <p className="mt-0.5 text-sm text-gray-500">Review and approve community submissions</p>
                  <StatsLine>
                    <Count n={litspaceTotal} label="posts" />
                    {litspacePending > 0 && <AmberBadge label={`${litspacePending} pending`} />}
                  </StatsLine>
                </div>
              </div>
            </a>

            {/* Comments */}
            <a href="/admin/comments" className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-400 hover:shadow-sm transition-all">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                  {communityItems[1].icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-gray-700">Comments</h3>
                  <p className="mt-0.5 text-sm text-gray-500">Moderate and manage user comments</p>
                  <StatsLine>
                    <Count n={commentsTotal} label="comments" />
                    {commentsPending > 0 && <RedBadge label={`${commentsPending} pending`} />}
                  </StatsLine>
                </div>
              </div>
            </a>

          </div>
        </div>

        {/* Leads & Enquiries */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Leads &amp; Enquiries</h2>
            <p className="mt-1 text-sm text-gray-500">View and manage inbound leads and contact submissions.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* Contact Enquiries */}
            <a href="/admin/contact-enquiries" className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-400 hover:shadow-sm transition-all">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-gray-700">Contact Enquiries</h3>
                  <p className="mt-0.5 text-sm text-gray-500">General contact form submissions</p>
                  <StatsLine>
                    <Count n={contactEnquiriesTotal} label="enquiries" />
                    {contactEnquiriesNew > 0 && <AmberBadge label={`${contactEnquiriesNew} new`} />}
                  </StatsLine>
                </div>
              </div>
            </a>

            {/* Newsletter Subscribers */}
            <a href="/admin/newsletter-subscribers" className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-400 hover:shadow-sm transition-all">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-gray-700">Newsletter Subscribers</h3>
                  <p className="mt-0.5 text-sm text-gray-500">Email subscription list</p>
                  <StatsLine>
                    <Count n={newsletterSubscribersTotal} label="subscribers" />
                    {newsletterSubscribersNew > 0 && <AmberBadge label={`${newsletterSubscribersNew} new`} />}
                  </StatsLine>
                </div>
              </div>
            </a>

            {/* Lead Captures */}
            <a href="/admin/lead-captures" className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-400 hover:shadow-sm transition-all">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-gray-700">Lead Captures</h3>
                  <p className="mt-0.5 text-sm text-gray-500">Case study PDF download leads</p>
                  <StatsLine>
                    <Count n={leadCapturesTotal} label="leads" />
                    {leadCapturesNew > 0 && <AmberBadge label={`${leadCapturesNew} new`} />}
                  </StatsLine>
                </div>
              </div>
            </a>

            {/* Package Inquiries */}
            <a href="/admin/package-inquiries" className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-400 hover:shadow-sm transition-all">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-gray-700">Package Inquiries</h3>
                  <p className="mt-0.5 text-sm text-gray-500">Custom publishing quote requests</p>
                  <StatsLine>
                    <Count n={packageInquiriesTotal} label="inquiries" />
                    {packageInquiriesNew > 0 && <AmberBadge label={`${packageInquiriesNew} new`} />}
                  </StatsLine>
                </div>
              </div>
            </a>

          </div>
        </div>

      </main>
    </div>
  );
}
