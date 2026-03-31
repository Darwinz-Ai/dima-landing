import SectionWrapper from "@/components/shared/SectionWrapper"

const MapSection = () => {
    return (
        <SectionWrapper>
            <div className="container relative h-[666px]">
                <div className="h-[570px] bg-gray-300 rounded-4xl"></div>
                <div className="absolute bottom-0 left-0 flex justify-center w-full">
                    <div className="bg-[linear-gradient(to_bottom,#95DDEE_0%,#11A8CF_32%,#95DDEE_46%,#11A8CF_100%)] h-48 max-w-3xl w-full rounded-4xl"></div>
                </div>
            </div>
        </SectionWrapper>
    )
}

export default MapSection