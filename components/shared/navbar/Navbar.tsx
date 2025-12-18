import { Button } from "../../ui/button";
import Link from "next/link";
import NavDrawer from "./NavDrawer";
import Image from "next/image";
import NavigationDropdown from "./NavigationDropdown";
import { ArrowRight } from "lucide-react";
import SolutionsDropdown from "./dropdowns/SolutionsDropdown";
// import ResourcesDropdown from "./dropdowns/ResourcesDropdown";
import LanguageSwitcher from "../LanguageSwitcher";
import { useLocale, useTranslations } from "next-intl";
import dimaLogo from "@/public/dima-logo/dima-logo.png"

function Navbar() {
    const t = useTranslations("Navbar");
    const locale = useLocale();

    // Define the order of navbar items based on locale
    const navbarItems = [
        { name: t("home"), href: "/" },
        { name: t("solutions.title"), dropdown: <SolutionsDropdown /> },
        // { name: t("resources.title"), dropdown: <ResourcesDropdown /> },
        { name: t("blogs"), href: "/blogs" },
        { name: t("caseStudies"), href: "/case-studies" },
        { name: t("tools"), href: "/tools" },
    ];

    // Reverse the order for Arabic locale
    const orderedNavbarItems = locale === "ar" ? [...navbarItems].reverse() : navbarItems;

    return (
        <header className="fixed top-0 left-1/2 -translate-x-1/2 z-50 shadow-[0_0_15px_rgba(0,0,0,0.12)] bg-white md:mt-4 md:rounded-full container" dir="ltr">
            <div className="max-h-20 flex justify-between items-center p-4 md:mx-8">
                <Link href="/" className="order-1">
                    <figure>
                        <Image
                            src={dimaLogo}
                            alt="Dima logo"
                            width={74}
                            height={30}
                        />
                    </figure>
                </Link>

                {/* Navbar for desktop screens */}
                <nav className="hidden lg:inline-flex items-center order-2">
                    {orderedNavbarItems.map((item, index) => (
                        <div key={index} className="cursor-pointer mx-2 group relative">
                            {item.href ? (
                                <Link href={item.href}>
                                    <span>{item.name}</span>
                                </Link>
                            ) : (
                                <NavigationDropdown triggerName={item.name}>
                                    {item.dropdown}
                                </NavigationDropdown>
                            )}
                            {item.href && (
                                <div className="h-0.5 w-0 bg-primary group-hover:w-4 transition-all duration-200 absolute -bottom-0.5 left-1/2 -translate-x-1/2"></div>
                            )}
                        </div>
                    ))}
                </nav>

                <div className="inline-flex items-center gap-4 order-3">
                    {/* Drawer for mobile screens */}
                    <div className="block lg:hidden order-3">
                        <NavDrawer />
                    </div>

                    {/*  Language Switcher and Request a Demo */}
                    <div className="inline-flex items-center gap-2 order-1 lg:order-3">
                        <div dir={locale === "ar" ? "rtl" : "ltr"}>
                            <LanguageSwitcher />
                        </div>

                        {/* CTA */}
                        <Link href="/request-demo" className="text-[15px]">
                            <Button className="hidden lg:flex justify-between py-2 pl-4 pr-2.5">
                                {t("requestDemo")}
                                <div className="w-7 h-7 rounded-full bg-white flex justify-center items-center">
                                    <ArrowRight color="black" />
                                </div>
                            </Button>
                        </Link>

                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;