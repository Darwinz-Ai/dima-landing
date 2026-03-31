import RequestDemoButton from '@/components/shared/form/RequestDemoButton'
import SectionWrapper from '@/components/shared/SectionWrapper'

const HeroSection = () => {
    return (
        <>
            <SectionWrapper className='mt-24'>
                <header className='container mx-auto flex flex-col justify-center items-center gap-8'>
                    <h1 className='text-2xl md:text-[44px] lg:text-[60px] text-center font-bold text-[#282943] max-w-3xl'>About Us</h1>
                    <h2 className='text-lg md:text-2xl text-center max-w-xl text-gray-500 leading-tight'>Subtitle text</h2>
                </header>
            </SectionWrapper>

            <SectionWrapper className='container mx-auto flex flex-col lg:flex-row items-center justify-between overflow-hidden grow pb-8 px-0 gap-4'>

                <div className='basis-1/2 space-y-8'>
                    <p>Title</p>
                    <p>Sub Title</p>
                    <RequestDemoButton size={"xl"} className="mt-4" />
                </div>

                <figure className='basis-1/2'>
                    <div className='h-[500px] bg-gray-300 rounded-3xl'></div>
                </figure>
            </SectionWrapper>
        </>
    )
}

export default HeroSection