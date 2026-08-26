import { getTranslations } from "next-intl/server"


export const AdvertisementBar = async () => {
    const t = await getTranslations()
    return (
        <div id="top" className="relative z-30 flex min-h-9 items-center justify-center gap-7 bg-ink px-6 py-1.75 text-3.5 tracking-[.02em] text-white max-sm:min-h-8.5 max-sm:px-3">
            <span className="capitalize">{t("Navbar.advertisement")}</span>
        </div>
    )
}