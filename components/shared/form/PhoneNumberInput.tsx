"use client"

import { Dispatch, SetStateAction, useMemo, useState } from "react"
import { UseFormRegister } from "react-hook-form"
import { FormInputs } from "@/components/shared/form/RequestDemoForm"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"
import { useLocale, useTranslations } from "next-intl"
import { countryCodes } from "@/data/form"
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
import { getCountries, getCountryCallingCode, CountryCode } from "libphonenumber-js/min"
import { IconCheck, IconChevronDown } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

type PhoneNumberInputProps = {
    register: UseFormRegister<FormInputs>,
    countryCode: string,
    setCountryCode: Dispatch<SetStateAction<string>>,
    placeholder: string
}

type CountryOption = {
    iso: CountryCode
    callingCode: string
    name: string
    labelKey?: string
}

const getFlagEmoji = (iso: CountryCode): string => {
    if (!iso) return ""
    return iso
        .toUpperCase()
        .split("")
        .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
        .join("")
}

function PhoneNumberInput({ register, countryCode, setCountryCode, placeholder }: PhoneNumberInputProps) {
    const tCountry = useTranslations("Home.requestDemo.form.countryLabel");
    const tPhoneNum = useTranslations("Home.requestDemo.form.phoneNumber");

    const locale = useLocale();
    const isRTL = locale === "ar";

    const [open, setOpen] = useState(false)

    const countries = useMemo<CountryOption[]>(() => {
        // Translate country names when switching locales
        let displayNames: Intl.DisplayNames | undefined
        if (typeof window !== "undefined" && "Intl" in window && "DisplayNames" in Intl) {
            displayNames = new Intl.DisplayNames([locale], { type: "region" })
        }

        const allCountries = getCountries().map((iso) => {
            const callingCode = `+${getCountryCallingCode(iso)}`
            const name = displayNames?.of(iso) ?? iso

            return {
                iso,
                callingCode,
                name,
            } as CountryOption
        })

        // Removing duplicates
        const byCallingCode = new Map<string, CountryOption>()
        for (const c of allCountries) {
            const existing = byCallingCode.get(c.callingCode)
            if (!existing) {
                byCallingCode.set(c.callingCode, c)
                continue
            }

            // Correct Morocco country code to MA rather than EH (Western Sahara)
            if (c.callingCode === "+212" && existing.iso === "EH" && c.iso === "MA") {
                byCallingCode.set(c.callingCode, c)
            }
        }

        // Have GCC and MENA countries first
        const topCodes = countryCodes.map((c) => c.value)
        const topCodeSet = new Set(topCodes)

        const topCountries: CountryOption[] = []
        for (const code of topCodes) {
            const base = byCallingCode.get(code)
            if (!base) continue
            const cfg = countryCodes.find((c) => c.value === code)
            topCountries.push({
                iso: base.iso,
                callingCode: code,
                name: base.name,
                labelKey: cfg?.label,
            })
        }

        const restCountries = Array.from(byCallingCode.values())
            .filter((c) => !topCodeSet.has(c.callingCode))
            .sort((a, b) => a.name.localeCompare(b.name, locale))

        return [...topCountries, ...restCountries]
    }, [locale])

    const selectedCountry = countries.find((c) => c.callingCode === countryCode) ?? countries[0]

    const getCountryLabel = (country: CountryOption) => {
        if (country.labelKey) {
            return tCountry(country.labelKey)
        }
        return country.name
    }

    return (
        <ButtonGroup className="w-full" dir="ltr">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button
                        type="button"
                        className={cn(
                            "inline-flex items-center justify-between rounded-md border px-3 py-2 text-sm font-mono h-10",
                        )}
                        aria-label="Open country code selector"
                    >
                        <span className="flex items-center gap-2 truncate">
                            {selectedCountry && (
                                <span className="text-base">
                                    {getFlagEmoji(selectedCountry.iso)}
                                </span>
                            )}
                            <span>{selectedCountry?.callingCode ?? countryCode}</span>
                        </span>
                        <IconChevronDown className="ml-2 h-4 w-4 opacity-50" />
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-[280px] p-0" align="start">
                    <Command>
                        <CommandInput placeholder={tPhoneNum("searchCountry")} />
                        <CommandList>
                            <CommandEmpty>{tPhoneNum("noCountryFound")}</CommandEmpty>
                            <CommandGroup>
                                {countries.map((country) => (
                                    <CommandItem
                                        key={`${country.iso}-${country.callingCode}`}
                                        value={`${country.callingCode} ${getCountryLabel(country)}`}
                                        onSelect={() => {
                                            setCountryCode(country.callingCode)
                                            setOpen(false)
                                        }}
                                    >
                                        <IconCheck
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                country.callingCode === countryCode ? "opacity-100" : "opacity-0",
                                            )}
                                        />
                                        <span className="font-mono mr-2">{country.callingCode}</span>
                                        <span className="truncate">{getCountryLabel(country)}</span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            {/* Phone input */}
            <Input
                type="tel"
                id="formPhoneNumInput"
                className={`flex-1 text-sm h-10`}
                {...register("phoneNumber")}
                placeholder={placeholder}
                dir={isRTL ? "rtl" : "ltr"}
            />
        </ButtonGroup>
    )
}

export default PhoneNumberInput
