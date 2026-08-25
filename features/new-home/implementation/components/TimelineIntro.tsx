
import { ArrowLink } from "@/components/shared/ArrowLink"
import { DEMO_URL } from "@/constants"



export const TimelineIntro = ({ titleId }: { titleId: string }) => (
  <div className="flex items-end justify-between gap-12.5 max-md:block">
    <div className="max-w-155">
      <span className="section-kicker text-3.5">Up and running, fast</span>
      <h2 className="section-title max-sm:text-[2.6rem]" id={titleId}>
        It couldn’t be simpler.
      </h2>
      <p className="mt-4 max-w-142.5 text-4 leading-[1.7] text-copy">
        Skip the long implementations. Your data starts flowing on day one, and by day three, your dashboards, alerts, and reports are fully tailored to your team and ready to use.
      </p>
    </div>
    <div className="shrink-0 max-md:mt-5">
      <ArrowLink href={DEMO_URL}>See dima with your market</ArrowLink>
    </div>
  </div>
)
