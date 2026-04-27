import SectionWrapper from "@/components/shared/SectionWrapper";
import TestimonialMobile from "@/features/solutions/components/ui/TestimonialMobile";
import TestimonialWeb from "@/features/solutions/components/ui/TestimonialWeb";


function TestimonialSection({ slug }: { slug: string }) {

    return (
        <SectionWrapper>
            {/* For Desktop and Tablet */}
            <TestimonialWeb slug={slug} />

            {/* For Mobile */}
            <TestimonialMobile slug={slug} />
        </SectionWrapper>
    );
}

export default TestimonialSection;
