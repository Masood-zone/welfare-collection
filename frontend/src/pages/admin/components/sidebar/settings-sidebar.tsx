import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}

export function AdminSettingsSidebar({
  className,
  items,
  ...props
}: SidebarNavProps) {
  return (
    <nav
      className={cn("hidden bg-background md:block w-[240px]", className)}
      {...props}
    >
      <ScrollArea>
        <div className="flex flex-col gap-4 p-0">
          <div className="px-3 py-1">
            <h2 className="mb-2 text-lg font-semibold tracking-tight">
              Settings
            </h2>
            <p className="text-sm text-muted-foreground">
              Manage your account settings
            </p>
          </div>
          <Separator className="mx-3" />
          <nav className="flex flex-col gap-y-2">
            {items.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === "/admin/settings"} // Only exact match for the overview route
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </NavLink>
            ))}
          </nav>
        </div>
      </ScrollArea>
    </nav>
  );
}
