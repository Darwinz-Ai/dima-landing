"use client"

import { Dispatch, SetStateAction } from "react"

import { UseFormRegister } from "react-hook-form"
import { FormInputs } from "@/components/shared/form/RequestDemoForm"
import { ButtonGroup } from "@/components/ui/button-group"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useLocale, useTranslations } from "next-intl"
import { countryCodes } from "@/data/form"

type PhoneNumberInputProps = {
    register: UseFormRegister<FormInputs>,
    countryCode: string,
    setCountryCode: Dispatch<SetStateAction<string>>,
    placeholder: string
}


function PhoneNumberInput({ register, countryCode, setCountryCode, placeholder }: PhoneNumberInputProps) {
    const t = useTranslations("Home.requestDemo.form.countryLabel")
    const locale = useLocale();
    const isRTL = locale === "ar";
    return (
        <ButtonGroup className="w-full" dir="ltr">
            {/* Select */}
            <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger className={`font-mono`} aria-label="Open country code selector">
                    {countryCode}
                </SelectTrigger>
                <SelectContent className="min-w-[120px]">
                    {countryCodes.map((code) => (
                        <SelectItem key={code.value} value={code.value}>
                            {code.value} <span>{t(code.label)}</span>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

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
