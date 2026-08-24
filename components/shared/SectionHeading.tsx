export const SectionHeading = ({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string
  title: string
  description?: string
  action?: React.ReactNode
}) => (
  <div className="mb-13 flex items-end justify-between gap-12.5 max-md:block desktop-fit:mb-7">
    <div>
      <span className="section-kicker">{eyebrow}</span>
      <h2 className="section-title">{title}</h2>
    </div>

    {description ? (
      <p className="max-w-112.5 text-3.5 leading-[1.7] text-copy max-md:mt-6 desktop-fit:max-w-90 desktop-fit:text-3">
        {description}
      </p>
    ) : null}
    {action ? <div className="max-md:mt-6">{action}</div> : null}
  </div>
)
