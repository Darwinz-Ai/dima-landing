
import { ArrowLink } from "@/components/shared/ArrowLink"
import { DEMO_URL } from "@/constants"

/**
 * The timeline used to be headlined "From kickoff to clarity", which is a nice
 * phrase that answers nothing. The number is the argument: for an enterprise
 * buyer, implementation risk is the objection, and this section exists to
 * remove it — so it sits next to a CTA.
 */
export const TimelineIntro = ({ titleId }: { titleId: string }) => (
  <div className="flex items-end justify-between gap-12.5 max-md:block">
    <div className="max-w-155">
      <span className="section-kicker">No procurement marathon</span>
      <h2 className="section-title max-sm:text-[2.6rem]" id={titleId}>
        Live in 48-72 hours.
      </h2>
      <p className="mt-4 max-w-142.5 text-3.5 leading-[1.7] text-copy">
        Your data is flowing within 24 hours and your dashboards, alerts and
        reports are configured around your team by day three.
      </p>
    </div>
    <div className="shrink-0 max-md:mt-5">
      <ArrowLink href={DEMO_URL}>See dima with your market</ArrowLink>
    </div>
  </div>
)
