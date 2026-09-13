import Image from "next/image"

import { cva, type VariantProps } from "class-variance-authority"

import Link from "next/link"

import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons"

// import { type BlogPostType } from "../types/validation"
import { PostMeta } from "./PostMeta"
import { Blog } from "@/types/blog"
import { Icon } from "@/components/shared/Icon"
import { cn } from "@/lib/utils"
import { SafeImage } from "@/components/shared/SafeImage"
import { getTranslations } from "next-intl/server"

const blogCardVariants = cva(
  // Removed flex-col from the base so we can control it per-variant
  "flex h-full border border-line bg-white overflow-hidden rounded-md",
  {
    variants: {
      variant: {
        standard: "flex-col hover:border-brand",
        // Stack on mobile, side-by-side on tablet/desktop
        featured: "flex-col md:flex-row",
      },
    },
    defaultVariants: {
      variant: "standard",
    },
  }
)

const blogCardMediaVariants = cva(
  "relative block shrink-0 overflow-hidden focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand",
  {
    variants: {
      variant: {
        standard: "aspect-4/3 border-b border-line bg-ui-chrome",
        // Keep it square, take up 50% width on desktop, move border from bottom to right
        featured: "aspect-square border-b border-line bg-soft-cyan md:w-1/2 md:border-b-0 md:border-r",
      },
    },
    defaultVariants: {
      variant: "standard",
    },
  }
)

const blogCardBodyVariants = cva("flex flex-1 flex-col", {
  variants: {
    variant: {
      standard: "p-4",
      // Space out the text and the arrow, add a bit more padding for the horizontal layout
      featured: "justify-between p-6 md:p-8",
    },
  },
  defaultVariants: {
    variant: "standard",
  },
})

const blogCardHeadingVariants = cva("font-[520] hover:text-brand hover:underline transition-colors", {
  variants: {
    variant: {
      standard: "mt-3 text-4.5 leading-[1.22] font-[550] tracking-tight",
      // Slightly reduced max-width so it wraps beautifully in the 50% column
      featured: "mt-3 max-w-sm text-[clamp(1.375rem,2.15vw,2.125rem)] leading-[1.1] tracking-tight",
    },
  },
  defaultVariants: {
    variant: "standard",
  },
})

const blogCardSummaryVariants = cva("mt-2 text-2.5 leading-[1.55] text-copy", {
  variants: {
    variant: {
      standard: "line-clamp-2",
      featured: "max-w-155 line-clamp-3",
    },
  },
  defaultVariants: {
    variant: "standard",
  },
})

const STANDARD_IMAGE_SIZES =
  "(max-width: 800px) calc(100vw - 2rem), (max-width: 1100px) 50vw, 33vw"
const FEATURED_IMAGE_SIZES =
  "(max-width: 800px) calc(100vw - 2rem), (max-width: 1100px) 450px, 450px"

type BlogCardProps = {
  post: Blog
} & VariantProps<typeof blogCardVariants>

export const BlogCard = async ({ post, variant = "standard" }: BlogCardProps) => {
  const t = await getTranslations("Blogs");

  const isFeatured = variant === "featured"
  const Heading = isFeatured ? "h2" : "h3"

  return (
    <article className={blogCardVariants({ variant })}>
      <Link
        className={blogCardMediaVariants({ variant })}
        href={`/blogs/${post.id}`}
        aria-label={
          isFeatured
            ? `Read featured article: ${post.content.title}`
            : `Read ${post.content.title}`
        }
      >
        <SafeImage
          className="object-cover object-center"
          src={post.thumbnail}
          alt={post.content.title}
          sizes={isFeatured ? FEATURED_IMAGE_SIZES : STANDARD_IMAGE_SIZES}
          fill
        />
        {isFeatured ? (
          <span className="absolute top-3 left-3 bg-ink px-2.5 py-1 text-2.25 font-medium tracking-[.12em] text-white uppercase">
            Featured
          </span>
        ) : null}
      </Link>

      <div className={blogCardBodyVariants({ variant })}>
        <div>
          <PostMeta publishedAt={post.dateCreated.toDate().toISOString()} />
          <Heading className={blogCardHeadingVariants({ variant })}>
            <Link
              className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
              href={`/blogs/${post.id}`}
            >
              {post.content.title}
            </Link>
          </Heading>
          <p className={cn(blogCardSummaryVariants({ variant }), "mt-4")}>
            {post.content.description}
          </p>
        </div>

        {isFeatured ? (
          <span
            className="self-end mt-6 grid size-10 shrink-0 place-items-center bg-brand text-ink"
            aria-hidden="true"
          >
            <Icon icon={ArrowUpRight01Icon} size={18} />
          </span>
        ) : (
          <Link
            className="mt-auto flex items-center gap-2 pt-4 text-2.75 font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand"
            href={`/blogs/${post.id}`}
          >
            {t("readArticle")}
            <Icon className="text-brand" icon={ArrowUpRight01Icon} size={16} />
          </Link>
        )}
      </div>
    </article>
  )
}
