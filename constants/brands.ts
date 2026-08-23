export const BRANDS: {
  name: string
  src: string
  fit?: string
  main?: true
}[] = [
  { name: "SIC", src: "/brands/sic-logo.jpeg" },
  { name: "Kensho", src: "/brands/kensho-logo.png" },
  { name: "CC Plus", src: "/brands/cc-plus-logo.png" },
  { name: "Al Sagheer Group", src: "/brands/al-sagheer-logo.png" },
  { name: "Mount PR", src: "/brands/mount-pr-logo.jpeg", fit: "scale-[1.32]" },
  { name: "Maison Pyramide", src: "/brands/maison-pyramide-logo.png" },
  { name: "Mori International", src: "/brands/mori-international-logo.png" },
  {
    // in BRANDS, no fit
    name: "Ooredoo",
    src: "/brands/ooredoo-logo.png",
    fit: "scale-[1.35]",
    main: true,
  },
  { name: "Juhayna", src: "/brands/juhayna-logo.png" },
  {
    // in main was: [1.25]
    name: "stc",
    src: "/brands/stc-logo.jpg",
    fit: "scale-[1.32]",
    main: true,
  },
  { name: "ExxonMobil", src: "/brands/exxonmobil-logo.png", main: true },
  {
    // in BRANDS, no fit
    name: "Sela",
    src: "/brands/sela-logo.png",
    fit: "scale-[1.3]",
    main: true,
  },
  { name: "AlBrand", src: "/brands/albrand-logo.jpeg" },
  { name: "LG", src: "/brands/lg-logo.png", main: true },
  {
    name: "Aljazira Bank",
    src: "/brands/aljazira-bank-logo.png",
    fit: "scale-[1.32]",
  },
  {
    name: "Wadi Degla",
    src: "/brands/wadi-degla-logo.png",
    fit: "w-auto! max-w-full!",
  },
  {
    // in BRANDS, no fit
    name: "Vodafone",
    src: "/brands/vodafone-logo.png",
    fit: "scale-[1.35]",
    main: true,
  },
  { name: "Oman Air", src: "/brands/oman-air-logo.png" },
  { name: "Swiss Butter", src: "/brands/swiss-butter-logo.webp" },
  { name: "Tico Group", src: "/brands/tico-group-logo.png" },
]
