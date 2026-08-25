import dynamic from "next/dynamic";

import { getLocale, getTranslations } from "next-intl/server";
import { getSiteNavigationElementJsonLd } from "@/lib/jsonLd";

import { Link } from "@/i18n/navigation";
import NavDrawer from "./NavDrawer";
import Image from "next/image";
import SolutionsDropdown from "./components/dropdowns/SolutionsDropdown";
import ResourcesDropdown from "./components/dropdowns/ResourcesDropdown";
import LanguageSwitcher from "../LanguageSwitcher";
import dimaLogo from "@/public/dima-logo/dima-logo.svg";
import JsonLd from "../JsonLd";
import NavbarCTA from "./components/buttons/RequestDemoButtonArrow";
import { AdvertisementBar } from "./components/AdvertisementBar";
import NavbarSurface from "./NavbarSurface";

const NavigationDropdown = dynamic(
    () => import("./components/dropdowns/NavigationDropdown")
);

async function Navbar() {
    const t = await getTranslations("Navbar");
    const locale = await getLocale();

    const navbarItems = [
        { name: t("home"), href: "/" },
        { name: t("solutions.title"), dropdown: <SolutionsDropdown /> },
        { name: t("caseStudies"), href: "/case-studies" },
        { name: t("resources.title"), dropdown: <ResourcesDropdown /> },
        { name: t("tools"), href: "/tools" },
        { name: t("aboutUs"), href: "/about-us" },
    ];

    const orderedNavbarItems =
        locale === "ar" ? [...navbarItems].reverse() : navbarItems;

    const linksJsonLd = await getSiteNavigationElementJsonLd();

    return (
        <>
            <JsonLd data={[linksJsonLd]} />
            <AdvertisementBar />

            <div className="sticky top-0 z-50 flex w-full justify-center">
                <NavbarSurface>
                    <div className="flex max-h-20 items-center justify-between p-4 md:mx-8">
                        <Link href="/" className="order-1">
                            <figure>
                                <Image
                                    src={dimaLogo}
                                    alt="Dima logo"
                                    width={74}
                                    height={30}
                                    unoptimized={true}
                                />
                            </figure>
                        </Link>

                        {/* Navbar for desktop screens */}
                        <nav className="order-2 hidden items-center lg:inline-flex">
                            {orderedNavbarItems.map((item, index) => (
                                <div
                                    key={index}
                                    className={`mx-2 ${item.href ? "group relative cursor-pointer" : ""}`}
                                >
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
                                        <div className="absolute -bottom-0.5 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-primary transition-all duration-200 group-hover:w-4"></div>
                                    )}
                                </div>
                            ))}
                        </nav>

                        <div className="order-3 inline-flex items-center gap-4">
                            {/* Drawer for mobile screens */}
                            <div className="order-3 flex items-center lg:hidden">
                                <NavDrawer />
                            </div>

                            {/* Language Switcher and Request a Demo */}
                            <div className="order-1 inline-flex items-center gap-2 lg:order-3">
                                <div dir={locale === "ar" ? "rtl" : "ltr"}>
                                    <LanguageSwitcher />
                                </div>

                                {/* CTA */}
                                <NavbarCTA location="Navbar" />
                            </div>
                        </div>
                    </div>
                </NavbarSurface>
            </div>
        </>
    );
}

export default Navbar;