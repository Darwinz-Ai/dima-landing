"use client";
import SectionWrapper from '@/components/shared/SectionWrapper'
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { useMemo, useState } from 'react'
import QuestionsAccordion from '../../(home)/components/QuestionsAccordion';
import { useTranslations } from 'next-intl';
import { QuestionAccordion } from '@/types';

const FAQSection = () => {
    const tFaq = useTranslations("FAQ");
    const tSolutions = useTranslations("Solutions");

    const categorySlugs = useMemo(() => [
        "general",
        "social-listening-analytics",
        "pr-comms",
        "market-insights",
        "own-page-intelligence",
        "consumer-insights",
        "influencer-marketing"
    ], [])

    const listItems = tFaq.raw("categorySearch.listItems") as string[];
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const dynamicFaqs = useMemo(() => {
        const slug = categorySlugs[selectedIndex];

        if (slug === "general") return tFaq.raw("faqs") as QuestionAccordion[];

        return tSolutions.raw(`${slug}.faqs`) as QuestionAccordion[]
    }, [selectedIndex, tSolutions, tFaq, categorySlugs])

    return (
        <SectionWrapper className='lg:px-12'>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-fit w-full">
                {/* Search & Category List */}
                <div className="lg:col-span-1 lg:bg-linear-to-b from-primary to-[#8A38F5] p-1 rounded-3xl">
                    <div className="bg-white rounded-[20px] lg:px-6 py-4 space-y-3 w-full h-full">
                        <h3 className="text-2xl font-semibold text-center lg:text-start">{tFaq("categorySearch.category")}</h3>

                        <Command
                            className={cn(
                                "border-none shadow-none bg-transparent",
                                "**:data-[slot=command-input-wrapper]:h-11",
                                "**:data-[slot=command-input-wrapper]:rounded-full",
                                "**:data-[slot=command-input-wrapper]:border",
                                "**:data-[slot=command-input-wrapper]:border-[#3c3c3c]",
                                "**:data-[slot=command-input]:text-sm",
                                "**:data-[slot=command-input]:font-light",
                            )}
                        >
                            <CommandInput placeholder={tFaq("categorySearch.searchPlaceholder")} />

                            <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ">
                                <CommandList
                                    className={cn(
                                        "mt-3 max-h-none min-w-fit",
                                        "[&>div]:flex lg:[&>div]:flex-col lg:[&>div]:gap-0 ",
                                    )}
                                >
                                    <CommandEmpty>{tFaq("categorySearch.noResults")}</CommandEmpty>
                                    {listItems.map((item, idx) =>
                                    (
                                        <CommandItem
                                            key={item}
                                            className={cn(
                                                "px-2 lg:px-0 py-4 font-medium cursor-pointer hover:bg-transparent transition-all duration-200 text-lg whitespace-nowrap data-[selected=true]:bg-transparent",
                                                "data-[selected=true]:text-black data-[selected=false]:text-muted-foreground/60", // ui for mobile items
                                                "lg:data-[selected=true]:text-primary lg:data-[selected=false]:text-black", // ui for desktop items
                                                "border-b border-gray-300 lg:last:border-b-0 rounded-none",
                                                selectedIndex === idx ? "lg:text-primary! text-black! border-b-black lg:border-gray-300" : "lg:text-black"
                                            )}
                                            onSelect={() => setSelectedIndex(idx)}
                                            value={item}
                                        >
                                            {item}
                                        </CommandItem>
                                    )
                                    )}
                                </CommandList>
                            </div>
                        </Command>
                    </div>
                </div>

                {/* FAQ Content */}
                <div className="lg:col-span-2">
                    <QuestionsAccordion items={dynamicFaqs} />
                </div>
            </div>
        </SectionWrapper>
    )
}

export default FAQSection