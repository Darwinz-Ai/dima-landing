const APP_SCROLL_AREA_SELECTOR =
  "#app-scroll-area > [data-slot='scroll-area-viewport']"

/** Returns the application's shadcn ScrollArea viewport once it is mounted. */
export function getAppScrollViewport() {
  if (typeof document === "undefined") return null

  return document.querySelector<HTMLElement>(APP_SCROLL_AREA_SELECTOR)
}
