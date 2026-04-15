import RequestDemoButton from '@/components/shared/form/RequestDemoButton'
import SectionWrapper from '@/components/shared/SectionWrapper'
import TeamCarousel from '../components/TeamCarousel'

const HeroSection = () => {
    return (
        <>
            <SectionWrapper className='mt-24'>
                <header className='container mx-auto flex flex-col justify-center items-center gap-8'>
                    <h1 className='text-2xl md:text-[44px] lg:text-[60px] text-center font-bold text-[#282943] max-w-3xl'>About Us</h1>
                    <h2 className='text-lg md:text-2xl text-center max-w-7xl leading-tight'>Founded in 2021, TheDar.AI is a regional company operating across the GCC and MENA, with offices in Riyadh (KSA), Cairo (Egypt), and Abu Dhabi (UAE). TheDar.AI is building dima, an Arabic-first media monitoring & social listening copilot built for marketing, PR, and brand leaders across the region. </h2>
                </header>
            </SectionWrapper>

            <TeamCarousel />
        </>
    )
}

export default HeroSection