"use client";
import { ChevronUp } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import useDropdownHoverDelay from "./hooks/useDropdownHoverDelay";

type CustomDropdownProps = {
    triggerName: string;
    children: React.ReactNode
}

function NavigationDropdown({ triggerName, children }: CustomDropdownProps) {
    const { isOpen, handleMouseEnter, handleMouseLeave, closeDropdown } = useDropdownHoverDelay();

    return (
        <div className="hidden lg:block group">
            {/* Trigger */}
            <div
                className="inline-flex items-center relative z-20"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="relative">
                    <span className="text-base">{triggerName}</span>
                    <AnimatePresence>
                        {isOpen && (
                            <m.div
                                initial={{ width: 0 }}
                                animate={{ width: 20, transition: { duration: 0.2, ease: "easeOut" } }}
                                exit={{ width: 0 }}
                                className="h-0.5 bg-primary absolute -bottom-0.5 left-1/2 -translate-x-1/2"></m.div>
                        )}
                    </AnimatePresence>
                </div>
                <ChevronUp size={14} className={`${isOpen ? "rotate-0 text-primary" : "rotate-180"} transition-all duration-300 mx-1`} />

                {/* Menu Content */}
                <AnimatePresence>
                    {isOpen && (
                        <m.div
                            className="bg-white fixed top-[85px] left-0 p-8 w-full border-t shadow-xl rounded-2xl"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            initial={{
                                translateY: 5,
                                opacity: 0
                            }}
                            animate={{
                                translateY: 0,
                                opacity: 1,
                                transition: { duration: 0.2, ease: "easeOut" }
                            }}
                        >
                            <div onClick={closeDropdown}>
                                {children}
                            </div>
                        </m.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default NavigationDropdown;