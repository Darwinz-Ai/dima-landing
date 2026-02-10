
import { Button } from "@/components/ui/button";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import "@/app/[locale]/globals.css"
import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
    const t = useTranslations("NotFound")
    return (
        <NextIntlClientProvider>
            <div className="min-h-dvh h-full flex flex-col justify-between">
                <Navbar />
                <div className="min-h-[80dvh] flex flex-col justify-center items-center">
                    <h1 className="text-7xl font-extrabold mb-4 text-primary">404</h1>
                    <h2 className="text-3xl font-semibold mb-4">{t("pageNotFound")}</h2>
                    <p className="text-center mb-6 max-w-md">
                        {t("description")}
                    </p>

                    <div className="flex gap-4">
                        <Link href="/">
                            <Button className="p-4 rounded-md">
                                {t("goHome")}
                            </Button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        </NextIntlClientProvider>
    );
}
