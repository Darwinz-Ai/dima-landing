import { getLocale } from "next-intl/server"
import { fetchCaseStudies } from "@/lib/firebase/caseStudiesFunctions"
import { StudyCard } from "./StudyCard"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { CASE_STUDIES_URL } from "@/constants"
import { cn } from "@/lib/utils"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { TextArrowLink } from "@/components/shared/TextArrowLink"
import { Icon } from "@/components/shared/Icon"
import { Link } from "@/i18n/navigation"
import { CaseStudy } from "@/types"

export const CaseStudiesSection = async () => {
  const locale = await getLocale();
  let caseStudies: CaseStudy[] = [];

  try {
    caseStudies = await fetchCaseStudies(locale, { featured: true }, 3);
  } catch (error) {
    console.error("Failed to fetch case studies", error);
  }

  const fallbackVisuals = ["crisis", "coverage", "insights"] as const;

  const mappedStories = caseStudies.map((study, index) => {
    const primaryMetric = study.content.metrics?.[1] || study.content.metrics?.[0] || { value: "", suffix: "", title: "" };

    return {
      id: study.id,
      eyebrow: study.content.type,
      title: study.content.title,
      stat: `${primaryMetric.value}${primaryMetric.suffix}`,
      metric: primaryMetric.title,
      visual: fallbackVisuals[index % fallbackVisuals.length],
      url: `/case-studies/${study.id}`,
    };
  });

  return (
    <section
      className="section-viewport flex min-h-svh items-center bg-muted max-md:min-h-0 desktop-fit:scroll-mt-nav"
      id="customers"
    >
      <div className="page-container">
        <SectionHeading
          eyebrow="The proof, not the pitch"
          title="Built for moments that matter."
          action={
            <TextArrowLink className="gap-2.25 text-4.5" href={CASE_STUDIES_URL}>
              View all case studies
            </TextArrowLink>
          }
        />

        <div className="grid grid-cols-[1.35fr_1fr_1fr] gap-px overflow-hidden rounded-2xl border border-line bg-line max-sm:grid-cols-1 sm:max-lg:grid-cols-2">
          {mappedStories.map((story, index) => {
            const isLead = index === 0

            return (
              <article
                className={cn(
                  "flex flex-col bg-white",
                  isLead && "sm:max-lg:col-span-full"
                )}
                key={story.id}
              >
                <StudyCard story={story} />

                <div className="flex flex-col flex-1 min-h-46.25 p-5.5 desktop-fit:min-h-43.75">
                  <span className="text-3.5 font-medium tracking-[.12em] text-ui-label uppercase">
                    {story.eyebrow}
                  </span>
                  <h3
                    className={cn(
                      "mt-4.25 font-medium tracking-tight",
                      isLead
                        ? "max-w-132.5 text-5.75 leading-[1.35] desktop-fit:text-5"
                        : "text-5 leading-[1.35] desktop-fit:text-4.5"
                    )}
                  >
                    {story.title}
                  </h3>

                  <Link
                    className="mt-auto inline-flex items-center gap-2 pt-6.25 text-3.5 font-medium"
                    href={story.url}
                  >
                    Read story <Icon icon={ArrowRight01Icon} size={16} />
                  </Link>
                </div>

              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}