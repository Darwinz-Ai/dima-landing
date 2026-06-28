"use client";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import posthog from "posthog-js";

import { cn } from "@/lib/utils";

type RequestDemoButtonProps = {
  className?: string;
  computerVariant?: "black" | "white";
  size?: "sm" | "lg" | "xl" | "default" | "2xl" | "icon" | "icon-sm" | "icon-lg" | "icon-xl" | null | undefined;
  location: string;
};

function RequestDemoButton({
  className,
  computerVariant = "white",
  size = "default",
  location
}: RequestDemoButtonProps) {
  const t = useTranslations("Home.hero");

  const handleClick = () => {
    posthog.capture("clicked_request_demo", {
      location
    })
  }
  return (
    <Link href="/request-demo" onClick={handleClick}>
      <Button
        className={cn(className)}
        size={size}
      >
        <Image
          src={
            computerVariant === "white"
              ? "/computer.svg"
              : "/computer-black.svg"
          }
          alt="monitor icon"
          width={28}
          height={28}
          className={cn(
            computerVariant === "black" ? "group-hover:invert transition duration-300" : ""

          )}
        />
        <span className="tracking-wide">{t("cta")}</span>
      </Button>
    </Link>
  );
}

export default RequestDemoButton;
