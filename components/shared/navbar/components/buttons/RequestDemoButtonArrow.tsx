"use client";

import posthog from 'posthog-js';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'

import { ArrowRight } from 'lucide-react';

interface RequestDemoButtonArrowProps {
    location: string;
}

const RequestDemoButtonArrow = ({ location }: RequestDemoButtonArrowProps) => {
    const t = useTranslations("Navbar");

    const handleClick = () => {
        posthog.capture("clicked_request_demo", {
            location,
            style: "navbar_arrow_variant"
        })
    }

    return (
        <Link href="/request-demo" className="text-[15px]" aria-label="Go To Request A Demo">
            <Button className="hidden lg:flex justify-between py-2 pl-4 pr-2.5">
                {t("requestDemo")}
                <div className="w-7 h-7 rounded-full bg-white flex justify-center items-center">
                    <ArrowRight color="black" />
                </div>
            </Button>
        </Link>
    )
}

export default RequestDemoButtonArrow