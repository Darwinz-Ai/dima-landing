import RequestDemoButton from '@/components/shared/form/RequestDemoButton'
import SectionWrapper from '@/components/shared/SectionWrapper'

const solutions = [
    "Social Listening & Traditional Media Monitoring",
    "Market & Consumer Insights",
    "Public Relations & Reputation Management",
    "Crisis Monitoring & Rapid Response",
    "Influencer & Campaign Tracking",
    "Competitor Benchmarking"
];

const ForTheRegionSection = () => {
    return (
        <SectionWrapper className='container mx-auto'>
            <header className='flex flex-col justify-center items-center gap-6'>
                <h2 className="text-[24px] md:text-[44px] font-normal text-center leading-tight max-w-4xl capitalize">
                    Built in The Region, For The Region
                </h2>
                <p className='text-lg md:text-2xl text-center max-w-7xl leading-tight'>We empower leading agencies and enterprises with dialect-specific, culturally intelligent monitoring across both traditional and social media channels</p>

                <RequestDemoButton size="xl" />
            </header>

            <div className='w-full flex gap-8 mt-10'>
                <ul className='flex flex-col gap-4 basis-2/5'>
                    {solutions.map((sl) => (
                        <li key={sl} className='border border-black border-l-4 border-l-[#11A8CF] rounded-r-2xl p-4 text-[17px]'>
                            {sl}
                        </li>
                    ))}
                </ul>

                <div className='basis-3/5 bg-muted '>

                </div>
            </div>


        </SectionWrapper>
    )
}

export default ForTheRegionSection