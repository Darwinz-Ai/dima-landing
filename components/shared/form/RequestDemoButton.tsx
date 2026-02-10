import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type RequestDemoButtonProps = {
  className?: string;
  computerVariant?: "black" | "white";
  size?: "sm" | "lg" | "xl" | "default" | "2xl" | "icon" | "icon-sm" | "icon-lg" | "icon-xl" | null | undefined;
};

function RequestDemoButton({
  className,
  computerVariant = "white",
  size = "default"
}: RequestDemoButtonProps) {
  const t = useTranslations("Home.hero");

  return (
    <Link href="/request-demo">
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

        />
        <span className="tracking-wide">{t("cta")}</span>
      </Button>
    </Link>
  );
}

export default RequestDemoButton;
