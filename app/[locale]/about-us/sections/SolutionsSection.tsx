import SectionWrapper from '@/components/shared/SectionWrapper'
import SolutionCard from '../components/SolutionCard'

const SolutionsSection = () => {
    return (
        <SectionWrapper className=''>
            <div className='container grid grid-cols-4 gap-8'>
                {
                    [0, 1, 2, 3].map((_, i) => (
                        <SolutionCard key={i} />
                    ))
                }
            </div>
        </SectionWrapper>
    )
}

export default SolutionsSection