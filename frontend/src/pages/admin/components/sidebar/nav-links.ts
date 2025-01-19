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
          title: "Expenses",
          url: "/admin/expenses",
        },
        {
          title: "Accounting",
          url: "/admin/accounting",
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
