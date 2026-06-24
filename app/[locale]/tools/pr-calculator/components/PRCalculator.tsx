"use client";

import { useState, useMemo } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandSeparator } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLocale, useTranslations } from "next-intl";
import { IconChevronDown, IconPlus, IconTrendingUp } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

type PublicationType = "Traditional Media" | "Social Media" | "وسائل التواصل الاجتماعي" | "الإعلام التقليدي";

interface Publication {
  id: number;
  name: string;
  type: PublicationType;
  impressions: number;
  reach: number;
  ave: number;
}

const PublicationFormSchema = z.object({
  name: z.string().min(2, "errors.invalidName"),
  type: z.enum(["Traditional Media", "Social Media", "الإعلام التقليدي", "وسائل التواصل الاجتماعي"], "errors.invalidType"),
  impressions: z.string().min(1, "errors.minImpressions").max(10, "errors.maxImpressions").transform((v) => Number(v)),
})


// Mock data
const MOCK_PUBLICATIONS: Publication[] = [
  { id: 1, name: "Forbes", type: "Traditional Media", impressions: 8500000, reach: 29750000, ave: 193375 },
  { id: 2, name: "TechCrunch", type: "Traditional Media", impressions: 7200000, reach: 25200000, ave: 163800 },
  { id: 3, name: "The New York Times", type: "Traditional Media", impressions: 12000000, reach: 42000000, ave: 273000 },
  { id: 4, name: "Wall Street Journal", type: "Traditional Media", impressions: 9500000, reach: 33250000, ave: 216125 },
  { id: 5, name: "LinkedIn", type: "Social Media", impressions: 15000000, reach: 6750000, ave: 81000 },
  { id: 6, name: "Twitter/X", type: "Social Media", impressions: 20000000, reach: 9000000, ave: 108000 },
  { id: 7, name: "Instagram", type: "Social Media", impressions: 25000000, reach: 11250000, ave: 135000 },
  { id: 8, name: "Facebook", type: "Social Media", impressions: 18000000, reach: 8100000, ave: 97200 },
];

const calculateMetrics = (impressions: number, type: PublicationType) => {
  const reach = type === "Traditional Media" ? impressions * 3.5 : impressions * 0.45;
  const ave = type === "Traditional Media" ? (reach / 1000) * 6.5 : (reach / 1000) * 12;
  return { reach, ave };
};

export const PRCalculator = () => {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm({ resolver: zodResolver(PublicationFormSchema) });
  const t = useTranslations("Tools.pr-calculator.calculator");
  const selectItems = t.raw("customPublication.type.items") as string[];


  // Filter publications by type
  const [filterType, setFilterType] = useState<PublicationType | "All">("All");

  const filteredPublications = useMemo(() => {
    return MOCK_PUBLICATIONS.filter((pub) => {
      const matchesType = filterType === "All" || pub.type === filterType;
      return matchesType;
    });
  }, [filterType]);

  const onSubmit = (data: z.infer<typeof PublicationFormSchema>) => {
    const impressions = data.impressions;
    const { reach, ave } = calculateMetrics(impressions, data.type);

    const customPub: Publication = {
      id: Date.now(),
      name: data.name,
      type: data.type,
      impressions,
      reach,
      ave,
    };

    setSelectedPublication(customPub);
    reset();
    setShowAddForm(false);
  };


  const formatNumber = (num: number) =>
    new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(num);

  const formatCurrency = (num: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(num);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Publication Picker */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>{t("cardTitle")}</CardTitle>
          <CardDescription>
            {t("cardDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex justify-between items-center px-3 py-2 rounded-md bg-muted">
                {selectedPublication ? selectedPublication.name : t("selectPublication.selectPlaceholder")}
                <IconChevronDown className={`${isRTL ? "mr-2" : "ml-2"} h-4 w-4 shrink-0 opacity-50 text-muted-foreground`} />

              </div>
            </PopoverTrigger>
            <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
              <Command className="rounded-md border shadow-sm">
                {/* Search */}
                <div>
                  <CommandInput
                    placeholder={t("selectPublication.searchPlaceholder")}
                    className="h-9 rounded-md"
                  />
                </div>

                {/* Filters */}
                <CommandGroup heading="Filter Type" className="px-2 py-1.5">
                  <div className="flex gap-1.5">

                    {/* All */}
                    <CommandItem
                      value="All"
                      onSelect={() => setFilterType("All")}
                      className={cn(
                        "px-3 py-1 rounded-md text-sm font-medium cursor-pointer transition",
                        filterType === "All"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/70"
                      )}
                    >
                      All
                    </CommandItem>

                    {/* Traditional Media */}
                    <CommandItem
                      value="Traditional Media"
                      onSelect={() => setFilterType("Traditional Media")}
                      className={cn(
                        "px-3 py-1 rounded-md text-sm cursor-pointer transition",
                        filterType === "Traditional Media"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/70"
                      )}
                    >
                      Traditional Media
                    </CommandItem>

                    {/* Social */}
                    <CommandItem
                      value="Social Media"
                      onSelect={() => setFilterType("Social Media")}
                      className={cn(
                        "px-3 py-1 rounded-md text-sm cursor-pointer transition",
                        filterType === "Social Media"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/70"
                      )}
                    >
                      Social
                    </CommandItem>
                  </div>
                </CommandGroup>
                <CommandSeparator />

                {/* Scrollable Publication List */}
                <div className="max-h-60 overflow-y-auto">
                  <CommandGroup heading="Publications">
                    {filteredPublications.length === 0 && (
                      <CommandEmpty>No publications found.</CommandEmpty>
                    )}

                    {filteredPublications.map((pub) => (
                      <CommandItem
                        key={pub.id}
                        value={pub.name}
                        onSelect={() => setSelectedPublication(pub)}
                        className="py-2 px-3 text-sm cursor-pointer rounded-md m-1"
                      >
                        <div className="flex flex-col leading-tight">
                          <span className="font-medium">{pub.name}</span>
                          <span className="text-xs text-muted-foreground">{pub.type}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </div>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Add Custom Publication */}
          <Button
            variant="default"
            onClick={() => setShowAddForm(!showAddForm)}
            className="w-full font-normal rounded-md px-2"
          >
            <IconPlus className="mr-2 h-4 w-4" />
            {showAddForm ? t("cancel") : t("addCustom")}
          </Button>

          {showAddForm && (
            <Card className="border bg-card">
              <CardContent >
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

                  {/* Publication Name */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-foreground">
                      {t("customPublication.publicationName.label")}
                    </label>
                    <Input
                      placeholder={t("customPublication.publicationName.placeholder")}
                      {...register("name")}
                    />
                    {errors.name && (<p className="text-red-500 text-xs">{t(errors.name.message!)}</p>)}
                  </div>

                  {/* Type */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-foreground">
                      {t("customPublication.type.label")}
                    </label>
                    <Controller
                      control={control}
                      name="type"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value} dir={isRTL ? "rtl" : "ltr"}>
                          <SelectTrigger className="bg-muted">
                            <SelectValue placeholder={t("customPublication.type.placeholder")} />
                          </SelectTrigger>
                          <SelectContent>
                            {
                              selectItems.map((item) => (
                                <SelectItem key={item} value={item}>{item}</SelectItem>
                              ))
                            }
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.type && (
                      <p className="text-red-500 text-xs">{t(errors.type.message!)}</p>
                    )}
                  </div>

                  {/* Impressions */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-foreground">
                      {t("customPublication.impressions.label")}
                    </label>
                    <Input
                      type="number"
                      placeholder={t("customPublication.impressions.placeholder")}
                      {...register("impressions")}
                    />
                    {errors.impressions && (
                      <p className="text-red-500 text-xs">{t(errors.impressions.message!)}</p>
                    )}
                  </div>

                  {/* Button */}
                  <Button
                    className="w-full font-normal rounded-md px-2"
                  >
                    {t("customPublication.calculate")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Selected Publication Metrics */}
      {selectedPublication && (
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>{selectedPublication.name}</CardTitle>
                <CardDescription>{selectedPublication.type}</CardDescription>
              </div>
              <IconTrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t("result.impressions")}</p>
                <p className="text-3xl font-bold">{formatNumber(selectedPublication.impressions)}</p>
              </div>
              <Separator orientation="vertical" className="hidden md:block" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t("result.reach")}</p>
                <p className="text-3xl font-bold text-primary">{formatNumber(selectedPublication.reach)}</p>
              </div>
              <Separator orientation="vertical" className="hidden md:block" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t("result.ave")}</p>
                <p className="text-3xl font-bold text-primary">{formatCurrency(selectedPublication.ave)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
