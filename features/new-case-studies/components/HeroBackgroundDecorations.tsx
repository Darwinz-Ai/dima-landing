
const HeroBackgroundDecorations = () => {
    return (
        <>
            {/* Decorative Bottom Left Blue Hint */}
            <div className="absolute bottom-[-30%] left-[-10%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-[#143BB8] rounded-full blur-[120px] md:blur-[160px] pointer-events-none z-0 opacity-50"></div>
            {/* Decorative Top Right Pink Hint */}
            <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-[#A71578] rounded-full blur-[120px] md:blur-[160px] pointer-events-none z-0 opacity-50"></div>
            {/* Decorative Lens Flare / Glow Effect */}
            <div className="absolute top-[-40%] right-[-5%] md:right-[5%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-white/15 rounded-full blur-[100px] md:blur-2xl pointer-events-none z-0"></div>
        </>
    )
}

export default HeroBackgroundDecorations