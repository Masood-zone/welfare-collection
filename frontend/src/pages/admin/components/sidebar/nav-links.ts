import { Settings2, SquareTerminal, Users, Wallet } from "lucide-react";

export const data = {
  navMain: [
    {
      title: "Platform",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/admin",
        },
        {
          title: "Welfares",
          url: "/admin/welfares",
        },
      ],
    },
    {
      title: "Members",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Members",
          url: "/admin/members",
        },
        {
          title: "Enrollments",
          url: "/admin/enrollment",
        },
      ],
    },
    {
      title: "Accounting",
      url: "#",
      icon: Wallet,
      items: [
        {
          title: "Payments",
          url: "/admin/payments",
        },
        {
          title: "Expenses",
          url: "/admin/expenses",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/admin/settings",
        },
      ],
    },
  ],
};
