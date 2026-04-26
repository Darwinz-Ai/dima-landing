"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

import SectionWrapper from "@/components/shared/SectionWrapper";
import { ComposableMap, createCoordinates, createLatitude, createLongitude, createTranslateExtent, Geographies, Geography, getGeographyCentroid, Latitude, Longitude, Marker, ZoomableGroup } from '@vnedyalk0v/react19-simple-maps';
import NumericCircleFlag from "../components/NumericCircleFlag";

import { cn } from "@/lib/utils";

import countries from 'i18n-iso-countries';
import { SERVING_COUNTRIES } from "@/data/about-us";

const geoUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json';
const brands = [3, 5, 7, 9, 12, 14, 15, 16];

type GeographyType = {
    id: string;
    properties: {
        name: string;
    }
}

const MapSection = () => {
    const locale = useLocale();
    const isRTL = locale === "ar";
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const [hoveredCountry, setHoveredCountry] = useState<GeographyType | null>(null);
    const desktopCenter = createCoordinates(-40, 25);
    const mobileCenter = createCoordinates(20, 20);

    const getCountryName = (geo: GeographyType) => {
        if (geo.id === "760") return locale === "ar" ? "سوريا" : "Syria";
        return countries.getName(geo.id, locale, { select: "alias" }) || geo.properties.name;
    };

    return (
        <SectionWrapper className="relative sm:mb-14 md:mb-28">
            <div className="container relative bg-muted rounded-[35px] overflow-hidden aspect-square md:aspect-16/7 w-full">
                <ComposableMap
                    projection="geoEqualEarth"
                    projectionConfig={{
                        scale: 240,
                        center: desktopCenter
                    }}
                    width={800}
                    height={350}
                    className="w-full h-full"
                >
                    <ZoomableGroup
                        zoom={isMobile ? 2.5 : 1}
                        minZoom={1}
                        maxZoom={6}
                        center={isMobile ? mobileCenter : desktopCenter}
                        translateExtent={createTranslateExtent(
                            [createLongitude(0), createLatitude(0)],
                            [createLongitude(800), createLatitude(350)]
                        )}
                        filterZoomEvent={(event: any) => {
                            console.log("event:", event)
                            if (event.type === "wheel") {
                                return event.ctrlKey;
                            }
                            return true;
                        }}
                        className="overflow-hidden"
                    >
                        <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                                geographies
                                    .map((geo) => {
                                        const isHighlighted = SERVING_COUNTRIES.includes(geo.id);
                                        return (
                                            <Geography
                                                key={geo.properties.name}
                                                geography={geo}
                                                onClick={() => {
                                                    setHoveredCountry(geo);
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
                        {hoveredCountry && SERVING_COUNTRIES.includes(hoveredCountry.id) && (
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
                    </ZoomableGroup>
                </ComposableMap>
            </div>

            {/* Logos Renderer */}
            <div className={cn(
                "sm:absolute sm:bottom-10 sm:left-1/2 sm:-translate-x-1/2 sm:translate-y-1/2",
                "mt-4 grid grid-cols-2 sm:grid-cols-4 w-full lg:h-48  sm:max-w-lg md:max-w-xl lg:max-w-3xl",
                "bg-[linear-gradient(to_bottom,#B5E5F4_0%,#6FCFEA_32%,#B1DBEA_46%,#4EC6E8_100%)] rounded-4xl"
            )}>
                {brands.map((brand) => (
                    <div key={brand} className="flex items-center justify-center border-x border-white/20">
                        <div className="w-24 h-16 flex items-center justify-center grayscale">
                            <img
                                src={`/logo-slider/${brand}.webp`}
                                alt={`Logo ${brand + 1}`}
                                className="max-h-full max-w-full object-contain"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
};

export default MapSection;