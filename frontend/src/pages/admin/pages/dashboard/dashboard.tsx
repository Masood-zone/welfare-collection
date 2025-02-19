import { BadgeCent, BookUser, Handshake, Users } from "lucide-react";
import { useGetAnalytics } from "../../services/analytics/queries";
import { StatCard } from "../../components/analytics/stat-card";
import { PaymentChart } from "../../components/analytics/payments-charts";
import { RecentPayments } from "../../components/analytics/recent-payments";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { data: analytics, isLoading } = useGetAnalytics();

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col gap-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <Skeleton className="aspect-video rounded-xl bg-muted" />
          <Skeleton className="aspect-video rounded-xl bg-muted" />
          <Skeleton className="aspect-video rounded-xl bg-muted" />
        </div>
        <Skeleton className="w-full h-96 bg-muted" />
      </div>
    );
  }

  const monthlyPaymentData = analytics?.monthlyPayments?.map(
    (item: { month: string; total: string }) => ({
      name: new Date(item.month).toLocaleString("default", { month: "short" }),
      total: parseFloat(item.total),
    })
  );

  const weeklyPaymentData = analytics?.weeklyPayments?.map(
    (item: { week: string; total: string }) => ({
      name: `Week ${new Date(item.week).getDate()}`,
      total: parseFloat(item.total),
    })
  );

  const dailyPaymentData = analytics?.dailyPayments?.map(
    (item: { day: string; total: string }) => ({
      name: new Date(item.day).toLocaleDateString(),
      total: parseFloat(item.total),
    })
  );

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={`Ghc${analytics?.totalRevenue}`}
          icon={<BadgeCent className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Total Members"
          value={analytics?.totalMembers}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Total Enrollments"
          value={analytics?.totalEnrollments}
          icon={<BookUser className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Welfares Established"
          value={analytics?.totalWelfares}
          icon={<Handshake className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
      {/* Payment Charts */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <PaymentChart
          title="Monthly Payments"
          data={monthlyPaymentData || []}
        />
        <PaymentChart title="Weekly Payments" data={weeklyPaymentData || []} />
        <PaymentChart title="Daily Payments" data={dailyPaymentData || []} />
      </div>
      <div className="mt-8">
        <RecentPayments payments={analytics?.recentPayments || []} />
      </div>
    </section>
  );
}
