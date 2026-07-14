"use client"

import { Dispatch, SetStateAction, useMemo, useState } from "react"
import { UseFormRegister } from "react-hook-form"
import { useLocale, useTranslations } from "next-intl"

import { FormInputs } from "@/components/shared/form/RequestDemoForm"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { IconCheck, IconChevronDown } from "@tabler/icons-react"

import { cn } from "@/lib/utils"

import { getCountries } from "@/data/countries";

type PhoneNumberInputProps = {
    register: UseFormRegister<FormInputs>;
    countryCode: string;
    setCountryCode: Dispatch<SetStateAction<string>>;
    placeholder: string;
    onFocus?: () => void;
}

type CountryOption = {
    iso: string;
    callingCode: string;
    name: string;
    emoji: string;
    image: string;
}

export default function PhoneNumberInput({
    register,
    countryCode,
    setCountryCode,
    placeholder
}: PhoneNumberInputProps) {
    const tPhoneNum = useTranslations("Home.requestDemo.form.phoneNumber")

    const locale = useLocale()
    const isRTL = locale === "ar"

    const [open, setOpen] = useState(false)

    const countries = useMemo<CountryOption[]>(() => {
        let displayNames: Intl.DisplayNames | undefined
        if (typeof window !== "undefined" && "Intl" in window && "DisplayNames" in Intl) {
            displayNames = new Intl.DisplayNames([locale], { type: "region" })
        }

        const allCountries: CountryOption[] = getCountries().map((c) => ({
            iso: c.code,
            callingCode: c.dialCodes[0],
            name: displayNames?.of(c.code) ?? c.name,
            emoji: c.emoji,
            image: c.image
        }))
        return allCountries;
    }, [locale])

    const selectedCountry = countries.find((c) => c.callingCode === countryCode) ?? countries[0]

    return (
        <ButtonGroup className="w-full" dir="ltr">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button
                        type="button"
                        className={cn(
                            "inline-flex items-center justify-between rounded-md border px-3 py-2 text-sm font-mono h-10 w-[120px] shrink-0",
                        )}
                        aria-label="Open country code selector"
                    >
                        <span className="flex items-center gap-2 truncate">
                            {selectedCountry && (
                                <img
                                    src={selectedCountry.image}
                                    alt={selectedCountry.iso}
                                    className="h-4 w-5 object-cover rounded-xs"
                                />
                            )}
                            <span>{selectedCountry?.callingCode ?? countryCode}</span>
                        </span>
                        <IconChevronDown className="ml-1 h-4 w-4 opacity-50" />
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0" align={isRTL ? "end" : "start"}>
                    <Command>
                        <CommandInput placeholder={tPhoneNum("searchCountry")} />
                        <CommandList>
                            <CommandEmpty>{tPhoneNum("noCountryFound")}</CommandEmpty>
                            <CommandGroup>
                                {countries.map((country) => (
                                    <CommandItem
                                        key={`${country.iso}-${country.callingCode}`}
                                        value={`${country.callingCode} ${country.name}`}
                                        onSelect={() => {
                                            setCountryCode(country.callingCode)
                                            setOpen(false)
                                        }}
                                    >
                                        <IconCheck
                                            className={cn(
                                                " h-4 w-4 shrink-0",
                                                country.callingCode === countryCode ? "opacity-100" : "opacity-0",
                                            )}
                                        />
                                        <img
                                            src={country.image}
                                            alt={country.iso}
                                            className="h-4 w-5 object-cover rounded-xs shrink-0"
                                        />
                                        <span
                                            className={cn(
                                                "font-mono w-14 shrink-0",
                                                isRTL ? "text-right" : "text-left"
                                            )}
                                            dir="ltr"
                                        >
                                            ({country.callingCode})
                                        </span>
                                        <span className="truncate">{country.name}</span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            <Input
                type="tel"
                id="formPhoneNumInput"
                className="flex-1 text-sm h-10 rounded-l-none"
                {...register("phoneNumber")}
                placeholder={placeholder}
                dir={isRTL ? "rtl" : "ltr"}
            />
        </ButtonGroup>
    )
}