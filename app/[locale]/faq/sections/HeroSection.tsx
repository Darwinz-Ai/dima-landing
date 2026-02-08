import SectionWrapper from '@/components/shared/SectionWrapper'
import { getTranslations } from 'next-intl/server'

const HeroSection = async () => {
    const t = await getTranslations("FAQ")
    return (
        <SectionWrapper className='mt-24'>
            <header className='container mx-auto flex flex-col justify-center items-center gap-8'>
                <h1 className='text-2xl md:text-[44px] lg:text-[60px] text-center font-bold text-[#282943] max-w-3xl'>{t("title")}</h1>
                <h2 className='text-lg md:text-2xl text-center max-w-xl text-gray-500 leading-tight'>{t("description")}</h2>
            </header>
        </SectionWrapper>
    )
}

export default HeroSection