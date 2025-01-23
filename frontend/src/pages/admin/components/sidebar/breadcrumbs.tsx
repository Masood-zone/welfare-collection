import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

export const Breadcrumbs = () => {
  const { pathname } = useLocation();

  // Generate breadcrumb items based on the current path
  const breadcrumbItems = useMemo(() => {
    const paths = pathname.split("/").filter(Boolean);
    return [
      { name: "Dashboard", href: "/admin" },
      ...paths.slice(1).map((p, idx) => ({
        name: p.charAt(0).toUpperCase() + p.slice(1),
        href: "/" + paths.slice(0, idx + 2).join("/"),
      })),
    ];
  }, [pathname]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={item.href}>
            <BreadcrumbItem className={index === 0 ? "hidden md:block" : ""}>
              {index === breadcrumbItems.length - 1 ? (
                <span className="font-semibold">{item.name}</span>
              ) : (
                <Link to={item.href} className="hover:text-primary-foreground">
                  {item.name}
                </Link>
              )}
            </BreadcrumbItem>
            {index < breadcrumbItems.length - 1 && (
              <BreadcrumbSeparator className="hidden md:block" />
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
