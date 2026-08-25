"use client";

import { createPortal } from "react-dom";
import { useState } from "react";
import { ChevronUp } from "lucide-react";

import {
    Popover,
    PopoverAnchor,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useNavbarSurface } from "../../NavbarSurface";

type CustomDropdownProps = {
    triggerName: string;
    children: React.ReactNode;
};

function NavigationDropdown({ triggerName, children }: CustomDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const surface = useNavbarSurface();

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            {surface
                ? createPortal(
                    <PopoverAnchor asChild>
                        <span
                            aria-hidden
                            className="pointer-events-none absolute inset-0"
                        />
                    </PopoverAnchor>,
                    surface
                )
                : null}

            <PopoverTrigger asChild>
                <button
                    type="button"
                    className="relative z-20 inline-flex cursor-pointer items-center bg-transparent"
                    aria-expanded={isOpen}
                >
                    <span className="relative text-base">
                        {triggerName}
                        <span
                            className={`absolute -bottom-0.5 left-1/2 h-0.5 -translate-x-1/2 bg-brand transition-all duration-200 ${isOpen ? "w-5" : "w-0"}`}
                        />
                    </span>
                    <ChevronUp
                        size={14}
                        className={`${isOpen ? "rotate-0 text-primary" : "rotate-180"} mx-1 transition-all duration-300`}
                    />
                </button>
            </PopoverTrigger>

            <PopoverContent
                align="center"
                side="bottom"
                sideOffset={5}
                avoidCollisions={false}
                onOpenAutoFocus={(event) => event.preventDefault()}
                onClick={(event) => {
                    if ((event.target as HTMLElement).closest("a")) {
                        setIsOpen(false);
                    }
                }}

                className="z-60 w-(--radix-popover-trigger-width) max-w-(--radix-popover-trigger-width) rounded-b-2xl border-t bg-white p-8 shadow-xl origin-top data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-4 data-[state=open]:slide-in-from-top-4"
            >
                {children}
            </PopoverContent>
        </Popover>
    );
}

export default NavigationDropdown;