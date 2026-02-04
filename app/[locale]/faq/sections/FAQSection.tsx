"use client";
import SectionWrapper from '@/components/shared/SectionWrapper'
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { useMemo, useState } from 'react'
import QuestionsAccordion from '../../(home)/components/QuestionsAccordion';
import { useTranslations } from 'next-intl';
import { QuestionAccordion } from '@/types';


const getSlugFromCategory: Record<string, string> = {
    "Social Listening & Analytics": "social-listening-analytics",
    "PR & Comms": "pr-comms",
    "Market Insights": "market-insights",
    "Own Page Intelligence": "own-page-intelligence",
    "Influencer Marketing": "influencer-marketing",
    "Consumer Insights": "consumer-insights"
}

const FAQSection = () => {
    const tFaq = useTranslations("FAQ");
    const tSolutions = useTranslations("Solutions");

    const listItems = tFaq.raw("categorySearch.listItems") as string[];
    const [selectedCategory, setSelectedCategory] = useState<string>(listItems[0]);

    const dynamicFaqs = useMemo(() => {
        const slug = getSlugFromCategory[selectedCategory];
        if (!slug) {
            setSelectedCategory(listItems[0])
            return tFaq.raw("faqs") as QuestionAccordion[];
        };

        return tSolutions.raw(`${slug}.faqs`) as QuestionAccordion[]
    }, [selectedCategory, tSolutions])

    return (
        <SectionWrapper className='px-12'>
            <div className="grid grid-cols-3 gap-4 min-h-fit w-full">
                {/* Search & Category List */}
                <div className="col-span-1 bg-linear-to-b from-primary to-[#8A38F5] p-1 rounded-3xl">
                    <div className="bg-white rounded-[20px] px-6 py-4 space-y-3 w-full h-full">
                        <h3 className="text-2xl font-semibold">{tFaq("categorySearch.category")}</h3>

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

                            <CommandList
                                className={cn(
                                    "mt-3 max-h-none",
                                )}
                            >
                                <CommandEmpty>{tFaq("categorySearch.noResults")}</CommandEmpty>

                                {listItems.map((item) => (
                                    <CommandItem
                                        key={item}
                                        className={cn(
                                            "px-0 py-4 font-medium cursor-pointer hover:bg-transparent data-[selected=true]:bg-transparent data-[selected=true]:text-primary transition-all duration-200 text-lg",
                                            "border-b border-gray-300 last:border-b-0 rounded-none",

                                            selectedCategory === item ? "text-primary ms-2" : "text-black"
                                        )}
                                        onSelect={() => setSelectedCategory(item)}
                                        value={item}
                                    >
                                        {item}
                                    </CommandItem>
                                ))}
                            </CommandList>
                        </Command>
                    </div>
                </div>

                <div className="col-span-2">
                    <QuestionsAccordion items={dynamicFaqs} />
                </div>
            </div>
        </SectionWrapper>
    )
}

export default FAQSection