"use client";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { ComposableMap, createCoordinates, Geographies, Geography, getGeographyCentroid, Marker } from '@vnedyalk0v/react19-simple-maps';
import { useState } from "react";

import Flag from "react-world-flags"
const geoUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json';

const MAP_COUNTRIES = [
    // North America & Europe
    "United States of America",
    "United Kingdom",

    // GCC
    "Saudi Arabia",
    "United Arab Emirates",
    "Qatar",
    "Kuwait",
    "Oman",
    "Bahrain",

    // MENA (Middle East & North Africa)
    "Egypt",
    "Jordan",
    "Iraq",
    "Syria",
    "Lebanon",
    "Palestine",
    "Yemen",
    "Iran",
    "Turkey",
    "Morocco",
    "W. Sahara",
    "Algeria",
    "Tunisia",
    "Libya",
    "Sudan",
    "Mauritania",
    "Mali",
    "Niger",
    "Chad",
    "Djibouti",
    "Eritrea",
    "Ethiopia",
    "Somalia"
];

type GeographyType = {
    id: string;
    properties: {
        name: string;
    }
}

// TODO: Continue working on map component

const MapSection = () => {
    const [selectedCountry, setSelectedCountry] = useState<GeographyType | null>(null)
    const [hoveredCountry, setHoveredCountry] = useState<GeographyType | null>(null);

    console.log("-----------------------------------------")
    console.log("Selected Country ID:", selectedCountry?.id)
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
                                    const isHighlighted = MAP_COUNTRIES.includes(geo.properties.name)
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
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
                                                    outline: 'none'
                                                }
                                            }}
                                        />
                                    )
                                })
                        }
                    </Geographies>

                    {hoveredCountry && MAP_COUNTRIES.includes(hoveredCountry.properties.name) && (
                        <Marker coordinates={getGeographyCentroid(hoveredCountry)!} className="pointer-events-none">
                            <line
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="-30"
                                stroke="#F59E0B"
                                strokeWidth="1"
                                strokeLinecap="round"
                            />

                            <foreignObject
                                x="-70"
                                y="-55"
                                width="140"
                                height="30"
                                className="pointer-events-none"
                            >
                                <div className="flex justify-center items-center gap-1 text-[10px] font-medium">
                                    {hoveredCountry.id === "840" ? "USA" : hoveredCountry.id === "826" ? "UK" : hoveredCountry.id === "784" ? "UAE" : hoveredCountry.properties.name}

                                    <Flag code={hoveredCountry.id} className="w-4 h-4 rounded-full object-cover" />
                                </div>
                            </foreignObject>
                        </Marker>
                    )}
                </ComposableMap>

                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-[linear-gradient(to_bottom,#B5E5F4_0%,#6FCFEA_32%,#B1DBEA_46%,#4EC6E8_100%)] h-48 max-w-3xl w-full rounded-4xl grid grid-cols-4">

                    {Array.from({ length: 8 }).map((_, i) => (
                        <div className="flex items-center justify-center border-x border-white/20">
                            {i}
                        </div>
                    ))}
                </div>

            </div>
        </SectionWrapper>
    );
};

export default MapSection;