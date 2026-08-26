
export const BlogsGraphic = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 60" className={className} xmlns="http://www.w3.org/2000/svg" direction="ltr">
        <defs>
            <pattern id="lines-bl" width="3.5" height="10" patternUnits="userSpaceOnUse">
                <line x1="1.75" y1="0" x2="1.75" y2="10" stroke="currentColor" strokeWidth="1.5" />
            </pattern>

            <mask id="mask-b">
                <rect x="14" y="0" width="22" height="100" fill="white" />
            </mask>

            <mask id="mask-l">
                <rect x="48" y="36" width="50" height="30" fill="white" />
            </mask>
        </defs>

        {/* Letter 'B' */}
        <text x="16" y="50" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="56" fill="url(#lines-bl)">B</text>
        <text x="16" y="50" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="56" fill="currentColor" mask="url(#mask-b)">B</text>

        {/* Letter 'L' */}
        <text x="52" y="50" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="56" fill="url(#lines-bl)">L</text>
        <text x="52" y="50" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="56" fill="currentColor" mask="url(#mask-l)">L</text>
    </svg>
);

export const FaqsGraphic = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 60" className={className} xmlns="http://www.w3.org/2000/svg" direction="ltr">
        <defs>
            <pattern id="lines-fq" width="3.5" height="10" patternUnits="userSpaceOnUse">
                <line x1="1.75" y1="0" x2="1.75" y2="10" stroke="currentColor" strokeWidth="1.5" />
            </pattern>

            <mask id="mask-f">
                <rect x="14" y="0" width="22" height="100" fill="white" />
            </mask>

            <mask id="mask-q">
                <polygon points="47,60 115,0 115,60" fill="white" />
            </mask>
        </defs>

        {/* Letter 'F' */}
        <text x="16" y="50" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="56" fill="url(#lines-fq)">F</text>
        <text x="16" y="50" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="56" fill="currentColor" mask="url(#mask-f)">F</text>

        {/* 
            Manual stem extension for 'F'. 
            This solid rectangle drops down exactly enough to match the Q's tail. 
            If the F stem looks slightly too wide or narrow on your specific font, 
            just adjust the `width` or `x` value by 1 or 2 pixels!
        */}
        <rect x="19.8" y="49" width="11.9" height="6" fill="currentColor" />

        {/* Letter 'Q' - Restored to original size and position so the tops align perfectly */}
        <text x="45" y="50" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="56" fill="url(#lines-fq)">Q</text>
        <text x="45" y="50" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="56" fill="currentColor" mask="url(#mask-q)">Q</text>
    </svg>
);