const DATE_FORMATTER = new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
})

export const formatDate = (date: string) =>
    DATE_FORMATTER.format(new Date(date))

export function getInitials(str: string) {
    const parts = str.trim().split(/\s+/)

    return (
        parts.length > 1 ? parts[0][0] + parts[1][0] : str.slice(0, 2)
    ).toUpperCase()
}