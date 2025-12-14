"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import { easeInOut, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Slide = { title: string; image: string };
type HeroCarousel2Props = {
    slides: Slide[];
    activeSlide: number;
    setActiveSlide: (index: number) => void;
};

export default function HeroCarousel({
    slides,
    activeSlide,
    setActiveSlide,
}: HeroCarousel2Props) {
    const [slidesToScroll, setSlidesToScroll] = useState(1);

    // Detect window width and adjust slidesToScroll
    useEffect(() => {
        const updateSlidesToScroll = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setSlidesToScroll(1); // mobile
            } else {
                setSlidesToScroll(3); // desktop
            }
        };

        updateSlidesToScroll();
        window.addEventListener("resize", updateSlidesToScroll);
        return () => window.removeEventListener("resize", updateSlidesToScroll);
    }, []);

    const settings = {
        centerMode: true,
        centerPadding: "0px",
        infinite: true,
        slidesToShow: slidesToScroll,
        slidesToScroll,
        autoplay: true,
        speed: 600,
        beforeChange: (_: number, next: number) => setActiveSlide(next),
        arrows: false,
    };

    return (
        <div className="relative w-full px-2 sm:px-4 md:px-8 overflow-visible">
            <Slider
                {...settings}
                className="[&_.slick-list]:overflow-visible [&_.slick-track]:overflow-visible [&_.slick-slide]:px-2!"
            >
                {slides.map((slide, index) => {
                    const total = slides.length;
                    let distance = index - activeSlide;
                    if (distance < -Math.floor(total / 2)) distance += total;
                    if (distance > Math.floor(total / 2)) distance -= total;

                    let transform = "";
                    let zIndex = 1;

                    if (distance === 0) {
                        transform = "scale(1)";
                        zIndex = 3;
                    } else if (Math.abs(distance) === 1) {
                        transform = "scale(0.9)";
                        zIndex = 2;
                    } else {
                        transform = "scale(0.8)";
                        zIndex = 1;
                    }

                    return (
                        <motion.div
                            key={index}
                            animate={{ transform, zIndex }}
                            transition={{ duration: 0.3, ease: easeInOut }}
                            className="flex justify-center items-center"
                            style={{ transformOrigin: "center center" }}
                        >
                            <div className="relative w-full h-80 sm:h-[400px] md:h-[500px] flex justify-center items-center">
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                    className="object-contain drop-shadow-xl"
                                    quality={90}
                                />
                            </div>
                        </motion.div>
                    );
                })}
            </Slider>
        </div>
    );
}
