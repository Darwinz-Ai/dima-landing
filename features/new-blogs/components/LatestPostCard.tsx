import { Blog } from "@/types/blog"
import Image from "next/image"
import Link from "next/link"
import { formatDate } from "../constants/helpers"



/**
 * The sidebar's compact list row. Split out of `BlogCard` rather than made a
 * third variant of it: it drops the summary, the read-more link and the meta
 * line, and its thumbnail is decorative — the title link is the only route out.
 */
export const LatestPostCard = ({ post }: { post: Blog }) => (
  <article className="grid grid-cols-[4.75rem_1fr] gap-2.5 py-2.5">
    <Link
      className="relative block aspect-4/3 overflow-hidden bg-ui-chrome"
      href={`/blogs/${post.id}`}
      tabIndex={-1}
      aria-hidden="true"
    >
      <Image
        className="object-cover object-center rounded-sm"
        src={post.thumbnail}
        alt=""
        sizes="76px"
        fill
      />
    </Link>

    <div className="min-w-0">
      {/* <span className="text-2.5 font-medium text-brand-dark">
        {post.category}
      </span> */}
      <h3 className="mt-0.5 text-3 leading-[1.3] font-[520]">
        <Link
          className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          href={`/blogs/${post.id}`}
        >
          {post.content.title}
        </Link>
      </h3>
      <p className="mt-1 text-2.25 text-copy">
        <time dateTime={post.dateCreated.toDate().toISOString()}>{formatDate(post.dateCreated.toDate().toISOString())}</time>
        {/* <span aria-hidden="true"> · </span> */}
        {/* <span>{post.readingTimeMinutes} min read</span> */}
      </p>
    </div>
  </article>
)
