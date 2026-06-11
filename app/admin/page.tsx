import { getSupabaseAdminClient } from "@/lib/supabase-admin";
import { TrendingUp, Users, Mail, DollarSign } from "lucide-react";

export default async function AdminDashboard() {
  let totalTemplates = 0;
  let totalSubscribers = 0;
  let totalProUsers = 0;
  let topTemplates: Array<{ title: string; copy_count: number; view_count: number; upvote_count: number }> = [];
  let recentEvents: Array<{ event_type: string; created_at: string }> = [];

  const hasSupabaseAdminCredentials = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  if (hasSupabaseAdminCredentials) {
    try {
      const supabaseAdmin = getSupabaseAdminClient();
      const templatesCount = await supabaseAdmin
        .from("templates")
        .select("*", { count: "exact", head: true });
      totalTemplates = templatesCount.count || 0;

      const subscribersCount = await supabaseAdmin
        .from("subscribers")
        .select("*", { count: "exact", head: true });
      totalSubscribers = subscribersCount.count || 0;

      const proUsersCount = await supabaseAdmin
        .from("pro_users")
        .select("*", { count: "exact", head: true })
        .eq("subscription_status", "active");
      totalProUsers = proUsersCount.count || 0;

      const topResult = await supabaseAdmin
        .from("templates")
        .select("title, copy_count, view_count, upvote_count")
        .order("copy_count", { ascending: false })
        .limit(10);
      topTemplates = topResult.data || [];

      const eventsResult = await supabaseAdmin
        .from("events")
        .select("event_type, created_at")
        .order("created_at", { ascending: false })
        .limit(50);
      recentEvents = eventsResult.data || [];
    } catch (error) {
      console.warn("Admin dashboard skipped because Supabase admin credentials are not configured.");
    }
  }

  const estimatedMRR = totalProUsers * 19;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">📊 Admin Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Mail} label="Templates" value={totalTemplates} color="text-blue-600" />
        <StatCard icon={Users} label="Subscribers" value={totalSubscribers} color="text-green-600" />
        <StatCard icon={TrendingUp} label="Pro Users" value={totalProUsers} color="text-purple-600" />
        <StatCard icon={DollarSign} label="Est. MRR" value={`$${estimatedMRR}`} color="text-yellow-600" />
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">🏆 Top Templates (by copies)</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Template</th>
              <th className="text-right">Copies</th>
              <th className="text-right">Views</th>
              <th className="text-right">Upvotes</th>
            </tr>
          </thead>
          <tbody>
            {topTemplates.map((t) => (
              <tr key={t.title} className="border-b">
                <td className="py-3">{t.title}</td>
                <td className="text-right">{t.copy_count}</td>
                <td className="text-right">{t.view_count}</td>
                <td className="text-right">{t.upvote_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">⚡ Recent Activity</h2>
        <div className="space-y-2 text-sm max-h-96 overflow-y-auto">
          {recentEvents.map((e, i) => (
            <div key={i} className="flex justify-between border-b py-2">
              <span>
                <span className="font-mono text-xs text-gray-500">
                  {new Date(e.created_at).toLocaleTimeString()}
                </span>{" "}
                <span className="font-medium">{e.event_type}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: any) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <Icon className={`w-8 h-8 ${color} mb-2`} />
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
