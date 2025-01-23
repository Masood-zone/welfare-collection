import { SquareTerminal } from "lucide-react";

export const userSidebarLinks = {
  navMain: [
    {
      title: "Platform",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: "Dashboard", url: "dashboard" },
        { title: "Payments", url: "payments" },
        {
          title: "Track Payments",
          url: "track-payments",
        },
        { title: "Welfares", url: "welfares" },
        { title: "Account", url: "account" },
      ],
    },
  ],
};
