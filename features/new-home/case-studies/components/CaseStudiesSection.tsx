import { StudyCard } from "./StudyCard"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { FEATURED_CASE_STUDIES } from "../constants"
import { CASE_STUDIES_URL } from "@/constants"
import { cn } from "@/lib/utils"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { TextArrowLink } from "@/components/shared/TextArrowLink"
import { Icon } from "@/components/shared/Icon"

export const CaseStudiesSection = () => (
  <section
    className="section-viewport flex min-h-svh items-center bg-muted max-md:min-h-0 desktop-fit:scroll-mt-nav"
    id="customers"
  >
    <div className="page-container">
      <SectionHeading
        eyebrow="The proof, not the pitch"
        title="Built for moments that matter."
        action={
          // Increased from text-4 to text-4.5
          <TextArrowLink className="gap-2.25 text-4.5" href={CASE_STUDIES_URL}>
            View all case studies
          </TextArrowLink>
        }
      />

      {/* ADDED: gap-px, bg-line, overflow-hidden, and rounded-2xl to create perfect inner and outer borders */}
      <div className="grid grid-cols-[1.35fr_1fr_1fr] gap-px overflow-hidden rounded-2xl border border-line bg-line max-sm:grid-cols-1 sm:max-lg:grid-cols-2">
        {FEATURED_CASE_STUDIES.map((story, index) => {
          const isLead = index === 0

          return (
            <article
              className={cn(
                // REMOVED: border-r border-line since the parent gap handles it now
                "flex flex-col bg-white",
                isLead && "sm:max-lg:col-span-full"
              )}
              key={story.title}
            >
              <StudyCard story={story} />
              <div className="flex min-h-46.25 flex-col p-5.5 desktop-fit:min-h-43.75">
                {/* Increased from text-2.5 to text-3 */}
                <span className="text-3.5 font-medium tracking-[.12em] text-ui-label uppercase">
                  {story.eyebrow}
                </span>
                <h3
                  className={cn(
                    "mt-4.25 font-medium tracking-tight",
                    isLead
                      // Increased from text-5.25 to text-5.75 and desktop-fit:text-4.5 to text-5
                      ? "max-w-132.5 text-5.75 leading-[1.35] desktop-fit:text-5"
                      // Increased from text-4.5 to text-5 and desktop-fit:text-4 to text-4.5
                      : "text-5 leading-[1.35] desktop-fit:text-4.5"
                  )}
                >
                  {story.title}
                </h3>
                <a
                  // Increased from text-2.75 to text-3.25
                  className="mt-auto inline-flex items-center gap-2 pt-6.25 text-3.5 font-medium"
                  href={CASE_STUDIES_URL}
                >
                  Read story <Icon icon={ArrowRight01Icon} size={16} />
                </a>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  </section>
)