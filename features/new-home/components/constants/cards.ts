import classifiedReplies from "@/public/hero-slides/classified-replies.png"
import conversationProfile from "@/public/hero-slides/conversation-profile.png"
import hourlyActivity from "@/public/hero-slides/hourly-activity.png"
import keyThemes from "@/public/hero-slides/key-themes.png"
import locationRatings from "@/public/hero-slides/location-ratings.png"
import platformLanguage from "@/public/hero-slides/platform-language.png"
import productReviews from "@/public/hero-slides/product-reviews.png"
import sentimentDistribution from "@/public/hero-slides/sentiment-distribution.png"
import topicCloud from "@/public/hero-slides/topic-cloud.png"

export const HERO_CARDS = [
  { src: locationRatings, alt: "Ratings broken down by location" },
  { src: platformLanguage, alt: "Coverage split by platform and language" },
  { src: hourlyActivity, alt: "Conversation volume by hour of day" },
  { src: keyThemes, alt: "Key themes surfaced from live conversations" },
  { src: conversationProfile, alt: "Profile of an audience conversation" },
  { src: sentimentDistribution, alt: "Sentiment distribution across mentions" },
  { src: topicCloud, alt: "Topic cloud of trending subjects" },
  { src: classifiedReplies, alt: "Replies classified by intent" },
  { src: productReviews, alt: "Product reviews grouped by theme" },
]
