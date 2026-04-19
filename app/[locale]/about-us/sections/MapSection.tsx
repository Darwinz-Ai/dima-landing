"use client";

import { useState } from "react";
import { useLocale } from "next-intl";


import SectionWrapper from "@/components/shared/SectionWrapper";
import { ComposableMap, createCoordinates, Geographies, Geography, getGeographyCentroid, Marker } from '@vnedyalk0v/react19-simple-maps';
import NumericCircleFlag from "../components/NumericCircleFlag";
import { cn } from "@/lib/utils";

import countries from 'i18n-iso-countries';

const geoUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json';

const HIGHLIGHTED_IDS = [
    "840", "826", // North America & Europe
    "682", "784", "634", "414", "512", "048", // GCC
    "818", "400", "368", "760", "422", "275", "887", "364", "792", // MENA
    "504", "732", "012", "788", "434", "729", "478", "466", "562",
    "148", "262", "232", "231" // Africa
];

type GeographyType = {
    id: string;
    properties: {
        name: string;
    }
}

const MapSection = () => {
    const locale = useLocale();
    const isRTL = locale === "ar";

    const [selectedCountry, setSelectedCountry] = useState<GeographyType | null>(null)
    const [hoveredCountry, setHoveredCountry] = useState<GeographyType | null>(null);

    const getCountryName = (geo: GeographyType) => {
        if (geo.id === "760") return locale === "ar" ? "سوريا" : "Syria";
        return countries.getName(geo.id, locale, { select: "alias" }) || geo.properties.name;
    };

    console.log("-----------------------------------------")
    console.log("Selected Country ID:", selectedCountry)
    console.log("Selected Country Name:", selectedCountry?.properties.name)
    console.log("coordinates:", getGeographyCentroid(selectedCountry))

    return (
        <SectionWrapper>
            <div className="container relative bg-muted rounded-[35px] mb-32">
                <ComposableMap
                    projection="geoEqualEarth"
                    projectionConfig={{
                        scale: 250,
                        center: createCoordinates(-40, 30),
                    }}
                    width={800}
                    height={350}
                    className="overflow-hidden"
                >
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies
                                .map((geo) => {
                                    const isHighlighted = HIGHLIGHTED_IDS.includes(geo.id);
                                    return (
                                        <Geography
                                            key={geo.properties.name}
                                            geography={geo}
                                            onClick={() => {
                                                setSelectedCountry(geo)
                                            }}
                                            onMouseEnter={() => setHoveredCountry(geo)}
                                            onMouseLeave={() => setHoveredCountry(null)}
                                            style={{
                                                default: {
                                                    fill: isHighlighted ? "#11A8CF" : "#E5E7EB",
                                                    stroke: '#C9C9C9',
                                                    strokeWidth: 0.5,
                                                    outline: 'none'
                                                },
                                                hover: {
                                                    fill: isHighlighted ? "#1097B9" : "#E5E7EB",
                                                    stroke: isHighlighted ? '#0E89A9' : '#C9C9C9',
                                                    strokeWidth: 0.5,
                                                    outline: 'none'
                                                },
                                                pressed: {
                                                    fill: isHighlighted ? "#1097B9" : "#E5E7EB",
                                                    stroke: isHighlighted ? '#0E89A9' : '#C9C9C9',
                                                    strokeWidth: 0.5,
                                                    outline: 'none'
                                                },
                                                focused: {
                                                    fill: isHighlighted ? "#11A8CF" : "#E5E7EB",
                                                    stroke: '#C9C9C9',
                                                    strokeWidth: 0.5,
                                                    outline: 'none'
                                                }
                                            }}
                                        />
                                    )
                                })
                        }
                    </Geographies>

                    {/* Map marker */}
                    {hoveredCountry && HIGHLIGHTED_IDS.includes(hoveredCountry.id) && (
                        <Marker coordinates={getGeographyCentroid(hoveredCountry)!} className="pointer-events-none">
                            <line
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="-40"
                                stroke="#F59E0B"
                                strokeWidth="0.5"
                                strokeLinecap="round"
                            />

                            <foreignObject
                                x="-92"
                                y="-55"
                                width="100"
                                height="30"
                                className="pointer-events-none"
                            >
                                <div className={cn("flex items-center gap-1 text-[10px] font-medium justify-end",
                                    isRTL && "flex-row-reverse"
                                )}>
                                    <span>{getCountryName(hoveredCountry)}</span>
                                    <NumericCircleFlag numericCode={hoveredCountry.id} />
                                </div>
                            </foreignObject>
                        </Marker>
                    )}
                </ComposableMap>

                {/* LogosRenderer */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-[linear-gradient(to_bottom,#B5E5F4_0%,#6FCFEA_32%,#B1DBEA_46%,#4EC6E8_100%)] h-48 max-w-3xl w-full rounded-4xl grid grid-cols-4">

                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="flex items-center justify-center border-x border-white/20">
                            {i + 1}
                        </div>
                    ))}
                </div>

            </div>
        </SectionWrapper>
    );
};

export default MapSection;