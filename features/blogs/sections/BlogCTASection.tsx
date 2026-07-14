import Image from "next/image";
import { Link } from "@/i18n/navigation";
import blackComputerIcon from "@/public/computer-black.svg";
import whiteComputerIcon from "@/public/computer.svg";
import { Button } from "@/components/ui/button";

import { getTranslations } from "next-intl/server";

export default async function BlogCTA() {
    const t = await getTranslations("Blogs.cta");

    return (
        <div className="bg-[#053A60]">
            <div className="container mx-auto flex flex-col justify-center items-center gap-6 text-white py-12 px-4">

                <h2 className="text-3xl lg:text-[44px] font-bold text-center leading-tight">
                    {t("title")}
                </h2>


                <p className="text-base lg:text-lg font-normal max-w-lg text-center opacity-90">
                    {t("description")}
                </p>

                <Link href="/request-demo">
                    <Button className="group bg-white! text-black! hover:text-white! hover:bg-black! transition-colors duration-300 w-fit mt-2" size="xl">
                        <div className="relative w-[30px] h-[30px] mr-2">
                            {/* Black icon (default) */}
                            <Image
                                src={blackComputerIcon}
                                alt="black computer icon"
                                fill
                                sizes="30px"
                                className="object-contain transition-opacity duration-300 group-hover:opacity-0"
                                unoptimized={true}
                            />
                            {/* White icon (shown on hover) */}
                            <Image
                                src={whiteComputerIcon}
                                alt="white computer icon"
                                fill
                                sizes="30px"
                                className="object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100 absolute top-0 left-0"
                                unoptimized={true}
                            />
                        </div>

                        <span className="tracking-wide">{t("buttonText")}</span>
                    </Button>
                </Link>
            </div>
        </div>
    );
}