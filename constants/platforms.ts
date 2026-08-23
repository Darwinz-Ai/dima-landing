import linkedinPng from "@/public/socials/linkedin.png"
import instagramPng from "@/public/socials/instagram.png"
import facebookPng from "@/public/socials/facebook.png"
import twitterPng from "@/public/socials/twitter.png"
import tiktokPng from "@/public/socials/tik-tok.png"
import youtubePng from "@/public/socials/youtube.png"
import snapchatPng from "@/public/socials/snapchat.png"
import newsPng from "@/public/socials/news.png"
import printPng from "@/public/socials/print.png"
import tvPng from "@/public/socials/tv.png"
// import radioPng from "@/public/socials/radio.png"


import {
  FacebookIcon,
  InstagramIcon,
  Linkedin01Icon,
  TiktokIcon,
  NewTwitterIcon,
  SnapchatIcon,
  News01Icon,
  PrinterIcon,
  Tv01Icon,
  Radio01Icon,
  YoutubeIcon,
} from "@hugeicons/core-free-icons"

import {
  LINKEDIN_URL,
  INSTAGRAM_URL,
  FACEBOOK_URL,
  X_URL,
  TIKTOK_URL,
  YOUTUBE_URL,
} from "./links"

export const PLATFORMS_IMAGES = [
  { label: "LinkedIn", href: LINKEDIN_URL, image: linkedinPng },
  { label: "Instagram", href: INSTAGRAM_URL, image: instagramPng },
  { label: "Facebook", href: FACEBOOK_URL, image: facebookPng },
  { label: "X", href: X_URL, image: twitterPng },
  { label: "TikTok", href: TIKTOK_URL, image: tiktokPng },
  { label: "YouTube", href: YOUTUBE_URL, image: youtubePng },
  { label: "Snapchat", href: null, image: snapchatPng },
  { label: "Online news", href: null, image: newsPng },
  { label: "Print", href: null, image: printPng },
  { label: "TV", href: null, image: tvPng },
  // { label: "Radio", href: null, image: radioPng },
]




export const PLATFORMS = [
  { label: "LinkedIn", href: LINKEDIN_URL, icon: Linkedin01Icon },
  { label: "Instagram", href: INSTAGRAM_URL, icon: InstagramIcon },
  { label: "Facebook", href: FACEBOOK_URL, icon: FacebookIcon },
  { label: "X", href: X_URL, icon: NewTwitterIcon },
  { label: "TikTok", href: TIKTOK_URL, icon: TiktokIcon },
  { label: "YouTube", href: YOUTUBE_URL, icon: YoutubeIcon },
  { label: "Snapchat", href: null, icon: SnapchatIcon },
  { label: "Online news", href: null, icon: News01Icon },
  { label: "Print", href: null, icon: PrinterIcon },
  { label: "TV", href: null, icon: Tv01Icon },
  { label: "Radio", href: null, icon: Radio01Icon },
]