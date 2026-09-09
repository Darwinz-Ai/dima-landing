import { Fragment } from "react/jsx-runtime";

export const renderHeadline = (text: string, highlightBlue?: string, highlightOrange?: string, highlightPink?: string) => {
    if (!text) return null;

    let segments = [{ text, type: "normal" }];

    const applyHighlight = (
        currentSegments: { text: string; type: string }[],
        targetText: string | undefined,
        colorType: string
    ) => {
        if (!targetText) return currentSegments;

        return currentSegments.flatMap((segment) => {
            if (segment.type !== "normal") return [segment];

            const parts = segment.text.split(targetText);
            const newSegments: { text: string; type: string }[] = [];

            parts.forEach((part, index) => {
                if (part) newSegments.push({ text: part, type: "normal" });
                if (index < parts.length - 1) {
                    newSegments.push({ text: targetText, type: colorType });
                }
            });

            return newSegments;
        });
    };

    segments = applyHighlight(segments, highlightBlue, "blue");
    segments = applyHighlight(segments, highlightOrange, "orange");
    segments = applyHighlight(segments, highlightPink, "pink");

    return segments.map((segment, index) => {
        if (segment.type === "blue") {
            return (
                <span key={index} className="text-brand">
                    {segment.text}
                </span>
            );
        }
        if (segment.type === "orange") {
            return (
                <span key={index} className="text-accent">
                    {segment.text}
                </span>
            );
        }
        if (segment.type === "pink") {
            return (
                <span key={index} className="text-secondary">
                    {segment.text}
                </span>
            )
        }
        return <Fragment key={index}>{segment.text}</Fragment>;
    });
};