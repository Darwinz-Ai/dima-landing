"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex w-fit items-center gap-1 rounded-full border bg-muted/50 p-1 text-sm font-medium" dir="ltr">
      <Link
        href={pathname}
        locale="en"
        className={`rounded-full px-3 py-1.5 transition-all duration-200 ${locale === "en"
          ? "bg-background text-black shadow-sm"
          : "text-muted-foreground hover:text-black"
          }`}
      >
        English
      </Link>

      <Link
        href={pathname}
        locale="ar"
        className={`rounded-full px-3 py-1.5 transition-all duration-200 ${locale === "ar"
          ? "bg-background text-black shadow-sm"
          : "text-muted-foreground hover:text-black"
          }`}
      >
        عربي
      </Link>
    </div>
  );
}