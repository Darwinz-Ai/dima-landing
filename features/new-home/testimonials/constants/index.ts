import { type TestimonialType } from "../types"

/** How long each testimonial stays on screen before the carousel advances. */
export const TESTIMONIAL_DURATION_MS = 5000

export const TESTIMONIALS: TestimonialType[] = [
  {
    quote:
      "dima blends data, creativity and strategy to make a real difference to customer satisfaction and brand perception.",
    name: "Samer Yassa",
    photo: "/people/samer-yassa.png",
    role: "Business Development Manager at Wadi Degla",
    company: "Wadi Degla",
    logo: "/brands/wadi-degla-logo.png",
  },
  {
    quote:
      "Managing over 50 locations in 3 different continents is not easy, but dima makes it easier by providing tailored business insights to our different audiences 24/7 so that we can provide a tailored marketing strategy that targets our various audience segments.",
    name: "Mostafa AlSagheer",
    photo: "/people/mostafa-alsagheer.png",
    role: "Vice Chairman at AlSagheer Group",
    company: "AlSagheer Group",
    logo: "/brands/al-sagheer-logo.png",
  },
  {
    quote:
      "dima has enabled our media monitoring PR experts to offer easier, faster and more accurate media coverage and analysis.",
    name: "Dina El Sewefy",
    role: "CEO at MountPR",
    company: "MountPR",
    logo: "/brands/mount-pr-logo.jpeg",
    logoFit: "scale-[4]",
  },
  {
    quote:
      "Being top of mind in the F&B market is difficult, everyday we see new players and trends. dima helps us to truly monitor where we stand in the market at all times and to maintain market leadership by staying in tune with the next big thing.",
    name: "Mohamed Osman",
    role: "Chairman at Tico Group",
    company: "Tico Group",
    logo: "/brands/tico-group-logo.png",
  },
  {
    quote:
      "We now understand what drives engagement and can build strategy around real audience reactions.",
    name: "Omar Al Masry",
    photo: "/people/omar-al-masry.png",
    role: "Senior Brand Manager at Mori International",
    company: "Mori International",
    logo: "/brands/mori-international-logo.png",
  },
]
