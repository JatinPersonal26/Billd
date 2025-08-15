"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useTheme } from "next-themes";

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const { theme, resolvedTheme } = useTheme();
  const effectiveTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <Breadcrumb className="flex border-dashed  p-1">
      <BreadcrumbItem>
        <BreadcrumbLink
          className={` border-2 border-${
            effectiveTheme !== "dark" ? "black" : "white"
          } rounded-2xl px-2 text-sm`}
          asChild
        >
          <Link href="/">Home</Link>
        </BreadcrumbLink>
        {segments.length > 0 && <BreadcrumbSeparator />}
      </BreadcrumbItem>

      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        return (
          <BreadcrumbItem key={index} className="flex underline ">
            <BreadcrumbLink className="ml-2" asChild>
              <Link href={href}>
                {decodeURIComponent(segment.replace(/-/g, " "))}
              </Link>
            </BreadcrumbLink>
            {index < segments.length - 1 && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}
