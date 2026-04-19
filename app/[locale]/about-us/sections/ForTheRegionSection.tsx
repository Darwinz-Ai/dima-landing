import { getLocale, getTranslations } from 'next-intl/server';

import Image from 'next/image';
import RequestDemoButton from '@/components/shared/form/RequestDemoButton'
import SectionWrapper from '@/components/shared/SectionWrapper'

import { cn } from '@/lib/utils';

const ForTheRegionSection = async () => {
    const locale = await getLocale();
    const isRTL = locale === "ar";

    const t = await getTranslations("AboutUs.builtForRegion");
    const solutions = t.raw("solutions") as string[];
    return (
        <SectionWrapper className='container mx-auto px-0'>
            <header className='flex flex-col justify-center items-center gap-6'>
                <h2 className="text-[24px] md:text-[44px] font-normal text-center leading-tight max-w-4xl capitalize">
                    {t("title")}
                </h2>
                <p className='text-lg md:text-2xl text-center max-w-5xl leading-tight'>{t("description")}</p>

                <RequestDemoButton size="xl" />
            </header>

            <div className='w-full flex gap-8 mt-10'>
                <ul className='flex justify-between flex-col gap-4 basis-1/3'>
                    {solutions.map((sl) => (
                        <li key={sl} className={cn('border border-black p-4 text-[17px]',
                            isRTL ? "border-r-4 border-r-[#11A8CF] rounded-l-2xl" : "border-l-4 border-l-[#11A8CF] rounded-r-2xl"
                        )}>
                            {sl}
                        </li>
                    ))}
                </ul>

                <figure className='basis-2/3'>
                    <Image
                        src="/about-us/built.png"
                        alt='Built for the region image placeholder'
                        width={856}
                        height={524}
                    />
                </figure>
            </div>


        </SectionWrapper>
    )
}

export default ForTheRegionSection