export const BrowserTab = ({ title }: { title: string }) => (
  <div
    className="flex h-6 items-end bg-ui-chrome px-1.75 pt-1 max-sm:h-5.75 max-sm:px-1.5"
    aria-hidden
  >
    <div className="relative flex h-5 w-[25%] min-w-0 items-center gap-1.5 rounded-t-1.75 border border-b-0 border-ui-line-soft bg-white px-1.75 text-2.25 font-[450] text-ui-copy max-sm:h-4.75 max-sm:px-1.5 max-sm:text-2">
      <i className="size-2.25 shrink-0 bg-[url('/dima-favicon.ico')] bg-contain bg-center bg-no-repeat max-sm:size-2" />
      <span className="truncate">{title}</span>
      <i className="ml-auto grid size-3.25 shrink-0 place-items-center text-2.75 leading-none font-[450] text-ui-label not-italic max-sm:size-2.75 max-sm:text-2.5">
        ×
      </i>
    </div>
  </div>
)
