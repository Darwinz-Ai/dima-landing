"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { usePathname, useRouter } from "@/i18n/navigation";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { LanguageLink } from "@/types";
import { languages } from "@/data/home-page";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const isRTL = locale === "ar";
  const t = useTranslations("LanguageSwitcher");
  const [open, setOpen] = useState<boolean>(false);
  const [currentLanguage, setCurrentLanguage] = useState<
    LanguageLink | undefined
  >(languages.find((l) => l.locale === locale));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          aria-expanded={open}
          className="w-fit flex justify-between items-center cursor-pointer px-3 py-2 rounded-lg bg-muted transition-colors duration-200"
        >
          <figure className="flex items-center gap-2">
            <Image
              src={currentLanguage?.flag || "/flags/en.png"}
              alt="current language flag"
              width={20}
              height={20}
              quality={90}
            />
          </figure>
          <ChevronDown className={`${isRTL ? "mr-2" : "ml-2"} h-4 w-4 shrink-0 opacity-50 text-muted-foreground`} />
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-[180px] p-0">
        <Command>
          <CommandInput placeholder={t("searchPlaceholder")} />
          <CommandEmpty >{t("emptyFind")}</CommandEmpty>
          <CommandGroup>
            {languages.map((lang) => (
              <CommandItem
                key={lang.locale}
                value={lang.label}
                onSelect={(selectedLabel) => {
                  const selected = languages.find(
                    (l) => l.label === selectedLabel
                  );
                  if (selected) {
                    router.replace(pathname, { locale: selected.locale })
                    router.refresh();
                    setCurrentLanguage(selected);
                    setOpen(false);
                  }
                }}
                className="group px-0"
              >

                <div
                  className="flex items-center gap-2 flex-1 px-2 py-1.5"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 group-hover:text-white transition-colors duration-200",
                      currentLanguage?.label === lang.label
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  <Image
                    src={lang.flag}
                    alt="language flag"
                    width={29}
                    height={29}
                    quality={90}
                  />
                  {lang.label}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
