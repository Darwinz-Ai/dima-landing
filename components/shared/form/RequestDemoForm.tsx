"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useLocale, useTranslations } from "use-intl";
import { useForm, SubmitHandler } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import PhoneNumberInput from "./PhoneNumberInput";
import { requestDemo } from "@/app/actions/demo.actions";

// Form Type
export type FormInputs = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    companyName: string;
}

// Zod Schema
const FormSchema = z.object({
    firstName: z.string().min(2, "errors.firstNameTooShort"),
    lastName: z.string().min(2, "errors.lastNameTooShort"),
    email: z.email("errors.invalidEmail"),
    phoneNumber: z.string().min(1, "errors.invalidPhone"),
    companyName: z.string().min(2, "errors.companyNameTooShort"),
})

function RequestDemoForm({ className }: { className?: string }) {
    const t = useTranslations("Home.requestDemo");
    const locale = useLocale();
    const isRTL = locale === "ar";

    const [countryCode, setCountryCode] = useState("+966")

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>({ resolver: zodResolver(FormSchema) });

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        const fullPhoneNumber = `${countryCode}${data.phoneNumber}`;

        const passedData = {
            ...data,
            phoneNumber: fullPhoneNumber
        }
        try {
            const response = await requestDemo(passedData);

            if (!response.success) {
                toast.error(t("form.somethingWentWrong"))
                return null;
            }

            toast.success(t("form.success"));
            reset();
        } catch (error) {
            toast.error(t("form.errorOccurred"))
            return null;
        }
    }
    return (
        <form className={cn("space-y-6 rounded-[22px] lg:rounded-2xl p-8 bg-white h-full flex flex-col justify-between", className)} onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="flex flex-col w-full gap-3">
                    <Label
                        htmlFor="formFirstNameInput"
                        className={isRTL ? "text-right " : ""}
                    >
                        {t("form.firstName.title")}
                    </Label>
                    <Input
                        type="text"
                        id="formFirstNameInput"
                        placeholder={t("form.firstName.placeholder")}
                        className={`text-sm ${isRTL ? "text-right" : ""}`}
                        {...register("firstName")}
                    />
                    {errors.firstName && <p className="text-destructive text-sm">{t(`form.${errors.firstName.message}`)}</p>}
                </div>

                {/* Last Name */}
                <div className="flex flex-col w-full gap-3">
                    <Label
                        htmlFor="formLastNameInput"
                        className={isRTL ? "text-right " : ""}
                    >
                        {t("form.lastName.title")}
                    </Label>
                    <Input
                        type="text"
                        id="formLastNameInput"
                        placeholder={t("form.lastName.placeholder")}
                        className={`text-sm ${isRTL ? "text-right" : ""}`}
                        {...register("lastName")}
                    />
                    {errors.lastName && <p className="text-destructive text-sm">{t(`form.${errors.lastName.message}`)}</p>}
                </div>
            </div>

            {/* Email */}
            <div className="grid w-full items-center gap-3">
                <Label
                    htmlFor="formEmailInput"
                    className={isRTL ? "text-right " : ""}
                >
                    {t("form.email.title")}
                </Label>
                <Input
                    type="email"
                    id="formEmailInput"
                    placeholder={t("form.email.placeholder")}
                    className={`text-sm ${isRTL ? "text-right" : ""}`}
                    {...register("email")}
                />
                {errors.email && <p className="text-destructive text-sm">{t(`form.${errors.email.message}`)}</p>}

            </div>

            {/* Phone Number */}
            <div className="grid w-full items-center gap-3">
                <Label
                    htmlFor="formPhoneNumInput"
                    className={isRTL ? "text-right " : ""}
                >
                    {t("form.phoneNumber.title")}
                </Label>
                <PhoneNumberInput register={register} countryCode={countryCode} setCountryCode={setCountryCode} placeholder={t("form.phoneNumber.title")} />
                {errors.phoneNumber && <p className="text-destructive text-sm">{t(`form.${errors.phoneNumber.message}`)}</p>}
            </div>

            {/* Company Name */}
            <div className="grid w-full items-center gap-3">
                <Label
                    htmlFor="formCompanyInput"
                    className={`text-sm  ${isRTL ? "text-right" : ""}`}
                >
                    {t("form.companyName.title")}
                </Label>
                <Input
                    type="text"
                    id="formCompanyInput"
                    placeholder={t("form.companyName.placeholder")}
                    className={`text-sm ${isRTL ? "text-right" : ""}`}
                    {...register("companyName")}
                />
                {errors.companyName && <p className="text-destructive text-sm">{t(`form.${errors.companyName.message}`)}</p>}
            </div>

            <div className="flex justify-center items-center">
                <Button className="bg-linear-to-r from-black to-[#6D6D6D] hover:scale-102 w-full max-w-[200px] p-2 font-normal" >
                    {t("form.submit")}
                </Button>
            </div>
        </form>
    );
}

export default RequestDemoForm;