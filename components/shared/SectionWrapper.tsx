"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function SectionWrapper({
  children,
  className,
  disableAnimation = false,
}: {
  children: React.ReactNode;
  className?: string;
  disableAnimation?: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (disableAnimation) return;

    gsap.from(sectionRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%", // Fires when the top of the section hits 75% down the viewport
        once: true
      }
    });
  }, { scope: sectionRef, dependencies: [disableAnimation] });

  return (
    <section
      ref={sectionRef}
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