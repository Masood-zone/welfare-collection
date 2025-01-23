import { Banknote, HandCoins, NotebookPen } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useUserStore } from "@/store/use-user.store";
import Welfare from "@/pages/client/home/welfare";

export default function UserDashboard() {
  const { user } = useUserStore();
  const sidebarItems = [
    {
      title: "Payments",
      href: "payments",
      icon: HandCoins,
      description: "Manage your payments.",
    },
    {
      title: "Track Payments",
      href: "track-payments",
      icon: Banknote,
      description: "Track your payments.",
    },

    {
      title: "Welfares",
      href: "welfares",
      icon: NotebookPen,
      description: "Manage your welfares.",
    },
  ];
  return (
    <div className="space-y-6">
      <div className="py-1 md:py-3">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome, {user?.name}! 🎉
        </h1>
        <p className="text-muted-foreground">
          Manage your account details, payments, track payments, and welfares
          here.
        </p>
      </div>
      {/* Pages */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sidebarItems.map((item) => (
          <Link key={item.href} to={`/user/${user?.id}/${item.href}`}>
            <Card className="h-full hover:bg-accent/20 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="rounded-md bg-primary/10 p-2">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </div>
                <CardDescription className="pt-2">
                  {item.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
      {/* Welfare Programs */}
      <Welfare />
    </div>
  );
}
