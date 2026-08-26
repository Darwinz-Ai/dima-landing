"use client";
import { cn } from "@/lib/utils";

function SectionWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        // Base layout
        "relative flex flex-col justify-center items-center w-full",
        // Visual separation - Section spacing
        "py-12 lg:py-10 px-6",
        className
      )}
    >
      {children}
    </section>
  );
}

export default SectionWrapper;