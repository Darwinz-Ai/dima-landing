import React from 'react'
import HeroSection from './sections/HeroSection'
import FAQSection from './sections/FAQSection'
import RequestDemoSection from '@/components/shared/form/RequestDemoSection'
import TestimonialSection from '../(home)/sections/TestimonialSection'

const FAQPage = () => {
    return (
        <main>
            <HeroSection />
            <FAQSection />
            <RequestDemoSection />
            <TestimonialSection />
        </main>
    )
}

export default FAQPage