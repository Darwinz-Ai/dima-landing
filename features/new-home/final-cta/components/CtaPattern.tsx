/** Subtle topographic contours that run behind the closing panel. */
export const CtaPattern = () => (
  <svg
    className="pointer-events-none absolute inset-0 h-full w-full text-white"
    viewBox="0 0 1280 560"
    preserveAspectRatio="none"
    fill="none"
    aria-hidden
  >
    <g
      stroke="currentColor"
      strokeWidth="1.15"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity=".17"
      vectorEffect="non-scaling-stroke"
    >
      {/* Broad folds entering from the left edge. */}
      <path d="M-92-42C12 22 54 86 22 162-8 234 2 298 92 332c105 39 154 115 139 244" />
      <path d="M-44-48C53 20 92 88 61 166c-28 70-14 122 71 157 112 45 163 127 150 252" />
      <path d="M12-47c90 65 121 132 92 210-25 66-7 108 71 143 116 51 169 138 161 269" />
      <path d="M72-46c79 58 104 121 80 195-20 61 0 97 69 132 119 59 177 151 174 294" />

      {/* An irregular basin around the upper-left quadrant. */}
      <path d="M165-44c28 56 73 81 137 88 78 8 112 48 95 108-16 58 1 103 56 136 50 31 64 79 37 139-21 45-18 91 14 148" />
      <path d="M224-43c27 40 61 57 116 65 91 12 130 61 111 133-15 57 4 93 48 122 61 41 74 99 45 163-17 39-12 83 19 135" />
      <path d="M287-43c20 27 46 38 90 44 98 14 143 72 126 150-12 54 7 85 43 112 71 51 82 119 51 188-15 34-8 75 24 124" />
      <path d="M356-42c109 14 169 76 162 165-5 64 10 99 56 137 67 55 77 126 50 194-15 37-4 77 32 121" />

      {/* A narrow channel cutting down through the middle. */}
      <path d="M586-45c78 75 95 141 50 205-41 59-34 117 24 169 62 56 66 131 22 246" />
      <path d="M642-44c68 70 80 130 39 191-38 56-29 106 24 156 70 65 76 150 33 268" />
      <path d="M700-44c56 65 64 122 27 180-35 54-26 98 22 146 75 74 83 167 46 293" />

      {/* Looser contours sweep toward the right edge. */}
      <path d="M817-44c-17 80-4 138 55 184 66 51 78 115 34 187-44 71-31 150 51 248" />
      <path d="M876-44c-15 67-1 117 52 159 77 60 92 132 46 209-42 70-25 153 53 251" />
      <path d="M938-44c-10 53 6 93 51 130 86 70 105 149 57 235-39 69-17 157 52 254" />
      <path d="M1002-44c-3 39 14 69 50 100 94 80 119 167 69 263-35 67-11 157 48 256" />

      {/* Tight nested lines make one natural focal knot off-canvas. */}
      <path d="M1158-42c-13 76 8 133 62 174 67 50 80 113 42 185-42 80-32 167 34 258" />
      <path d="M1211-43c-9 62 10 108 55 145 76 61 92 133 53 211-39 78-26 168 38 262" />
      <path d="M1265-43c-4 47 12 83 47 114 84 74 104 153 65 240-35 78-17 169 43 264" />
      <path d="M1319-42c2 33 15 59 40 84 92 91 115 177 76 267-32 76-10 169 46 266" />
    </g>
  </svg>
)
