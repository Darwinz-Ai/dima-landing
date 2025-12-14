
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

function DimaSection() {
    const t = useTranslations("CaseStudies.boostBusiness")
    return (
        <div className="bg-[#053A60]">
            <div className="container mx-auto flex flex-col justify-center items-center gap-8 text-white py-24 px-4">
                <h2 className="text-4xl g:text-[66px] font-bold text-center">{t("title")}</h2>
                <p className="text-lg lg:text-2xl font-medium max-w-2xl text-center">{t("description")}</p>

                <Link href="/request-demo">
                    <Button className="group bg-white! text-black! hover:text-white! hover:bg-black! transition-colors duration-300 w-fit" size="xl">
                        <div className="relative w-[30px] h-[30px]">
                            {/* Black icon (default) */}
                            <Image
                                src="/computer-black.svg"
                                alt="black computer icon"
                                fill
                                sizes="30px"
                                className="object-contain transition-opacity duration-300 group-hover:opacity-0"
                                quality={90}
                            />
                            {/* White icon (shown on hover) */}
                            <Image
                                src="/computer.svg"
                                alt="white computer icon"
                                fill
                                sizes="30px"
                                className="object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100 absolute top-0 left-0"
                                quality={90}
                            />
                        </div>

                        <span className="tracking-wide">{t("requestDemo")}</span>
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default DimaSection;