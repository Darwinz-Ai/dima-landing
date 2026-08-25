import Image from "next/image"
import { PlatformBenefits } from "./PlatformBenefits"
import { SourceMarquee } from "./SourceMarquee"

import { DEMO_URL } from "@/constants"
import dimaPhone from "@/public/dima-phone.png"
import { ArrowLink } from "@/components/shared/ArrowLink"

export const PlatformSection = () => (
  <section
    className="relative overflow-hidden bg-ink text-white desktop-fit:scroll-mt-nav"
    id="platform"
  >
    <div className="page-container grid min-h-[calc(100svh-150px)] grid-cols-2 items-center gap-17.5 pt-10 max-lg:gap-7.5 max-md:min-h-0 max-md:grid-cols-1 desktop-fit:max-h-180 desktop-fit:pt-5">
      <div className="relative flex items-center justify-center self-stretch overflow-hidden max-md:items-end max-md:pt-16">
        {/* Increased from text-2.5 to text-3 */}
        <span className="absolute top-[4%] left-0 z-2 font-mono text-3.5 tracking-[.14em] text-ui-label uppercase">
          3:00 AM. Riyadh.
        </span>
        <div className="shadow-brand-rings absolute top-1/2 left-1/2 size-125 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand/22 max-md:top-[23%] max-md:translate-y-0" />
        <Image
          src={dimaPhone}
          alt="dima mobile analytics dashboard"
          className="relative z-1 h-[min(62svh,36rem)] w-auto max-w-full translate-x-[-3.5%] object-contain drop-shadow-phone max-md:h-auto max-md:w-[min(82vw,28rem)] max-md:translate-x-[2%] max-sm:w-[min(88vw,26rem)]"
          sizes="(max-width: 600px) 88vw, (max-width: 800px) 448px, (max-width: 1100px) 45vw, 464px"
        />
      </div>

      <div className="relative z-3 py-22.5 max-md:py-18.75 desktop-fit:py-8.75">
        <span className="section-kicker text-4 gap-1 text-brand">
          While your team sleeps · <span className="lowercase">dima</span>
        </span>
        <h2 className="mt-5 max-w-165 text-[clamp(2.9rem,4.6vw,4.7rem)] leading-[.96] font-medium tracking-[-.07em] max-sm:text-[3rem] desktop-fit:text-[clamp(2.9rem,4.2vw,4.2rem)]">
          Be the first to know, wherever you are.
        </h2>
        <p className="mt-7 max-w-117.5 text-4.25 leading-[1.75] text-footer-copy/90 desktop-fit:mt-5">
          Even at 3am, dima’s mobile app delivers alerts to your pocket, so you’re always one step ahead of your client.
        </p>

        <PlatformBenefits />

        <div className="mt-4 md:mt-0">
          <ArrowLink href={DEMO_URL} light>
            See dima with your market
          </ArrowLink>
        </div>
      </div>
    </div>

    <SourceMarquee />
  </section>
)