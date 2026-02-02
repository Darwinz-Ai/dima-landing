"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Drawer,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import SolutionNavLink from "./SolutionNavLink";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { dimaSolutions } from "@/data/home-page";

function NavDrawer() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const t = useTranslations("Navbar");
    const locale = useLocale();
    const isRTL = locale === "ar";

    return (
        <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
                <button aria-label="Open Menu">
                    <Menu size={24} />
                </button>
            </DrawerTrigger>

            <DrawerContent>
                <DrawerTitle className="hidden">Navigation Drawer</DrawerTitle>

                <div className="flex flex-col justify-between h-full">
                    <nav className="p-4 space-y-4 overflow-y-auto max-h-screen">
                        {/* Home Link */}
                        <Link
                            href="/"
                            onClick={() => setIsOpen(false)}
                            className="block text-base font-medium hover:text-primary transition"
                        >
                            {t("home")}
                        </Link>

                        {/* Solutions Accordion */}
                        <Accordion type="single" collapsible>
                            <AccordionItem value="solutions">
                                <AccordionTrigger className="text-base">{t("solutions.title")}</AccordionTrigger>
                                <AccordionContent>
                                    <ul className="space-y-2 pl-3">
                                        {dimaSolutions.map((link) => (
                                            <li key={link.title} onClick={() => setIsOpen(false)}>
                                                <SolutionNavLink {...link} isRTL={isRTL} />
                                            </li>
                                        ))}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        {/* Blogs */}
                        <Link
                            href="/blogs"
                            onClick={() => setIsOpen(false)}
                            className="block text-base font-medium hover:text-primary transition"
                        >
                            {t("blogs")}
                            {/*  */}
                        </Link>

                        {/* Case Studies */}
                        <Link
                            href="/case-studies"
                            onClick={() => setIsOpen(false)}
                            className="block text-base font-medium hover:text-primary transition"
                        >
                            {t("caseStudies")}
                        </Link>

                        {/* Tools */}
                        <Link
                            href="/tools"
                            onClick={() => setIsOpen(false)}
                            className="block text-base font-medium hover:text-primary transition"
                        >
                            {t("tools")}
                        </Link>

                        {/* CTA */}
                        <Button className="lg:hidden flex justify-between py-2 pl-4 pr-2.5">
                            <Link href="/request-demo" className="text-[15px]">{t("requestDemo")}</Link>
                            <div className="w-7 h-7 rounded-full bg-white flex justify-center items-center">
                                <ArrowRight color="black" />
                            </div>
                        </Button>
                    </nav>
                </div>
            </DrawerContent>
        </Drawer>
    );
}

export default NavDrawer;
