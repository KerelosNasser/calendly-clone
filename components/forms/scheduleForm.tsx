'use client'

import { timeToFloat } from "@/lib/utils"
import { scheduleFormSchema } from "@/schema/schedule"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Fragment } from "react"
import { Button } from "../ui/button"
import { Plus, X } from "lucide-react"
import { Input } from "../ui/input"
import { toast } from "sonner"
import {DAYS_OF_WEEK_IN_ORDER} from "@/lib/constants";
import {saveSchedule} from "@/server/actions/schedule";
import {formatTimezoneOffset} from "@/lib/formatters";

type Availability = {
    startTime: string
    endTime: string
    dayOfWeek: (typeof DAYS_OF_WEEK_IN_ORDER)[number]

}

export function ScheduleForm({
                                 schedule,
                             }: {
    schedule?: {
        timezone: string
        availabilities: Availability[]
    }
}) {

    const form = useForm<z.infer<typeof scheduleFormSchema>>({
        resolver: zodResolver(scheduleFormSchema),
        defaultValues: {
            timezone:
                schedule?.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
            availabilities: schedule?.availabilities.toSorted((a, b) => {
                return timeToFloat(a.startTime) - timeToFloat(b.startTime)
            }),
        },
    })
    const {
        append: addAvailability,
        remove: removeAvailability,
        fields: availabilityFields,
    } = useFieldArray({ name: "availabilities", control: form.control })

    const groupedAvailabilityFields = Object.groupBy(
        availabilityFields.map((field, index) => ({ ...field, index })),
        availability => availability.dayOfWeek
    )

    async function onSubmit(values: z.infer<typeof scheduleFormSchema>) {
        try {
            await saveSchedule(values)
            toast("Schedule saved successfully.", {
                duration: 5000,
                className: '!rounded-3xl !py-8 !px-5 !justify-center !text-green-400 !font-black',
            })
        } catch (error: any) {
            form.setError("root", {
                message: `There was an error saving your schedule${error.message}`,
            })
        }
    }

    return (
        <Form {...form}>
            <form
                className="flex gap-6 flex-col"
                onSubmit={form.handleSubmit(onSubmit)}
            >

                {form.formState.errors.root && (
                    <div className="text-destructive text-sm">
                        {form.formState.errors.root.message}
                    </div>
                )}

                <FormField
                    control={form.control}
                    name="timezone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Timezone</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Intl.supportedValuesOf("timeZone").map(timezone => (
                                        <SelectItem key={timezone} value={timezone}>
                                            {timezone}
                                            {` (${formatTimezoneOffset(timezone)})`}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-[auto_auto]  gap-y-6">
                    {DAYS_OF_WEEK_IN_ORDER.map(dayOfWeek => (
                        <Fragment key={dayOfWeek}>
                            <div className="capitalize text-sm font-semibold">
                                {dayOfWeek.substring(0, 3)}
                            </div>

                            <div className="flex flex-col gap-2">
                                <Button
                                    type="button"
                                    className="size-6 p-1 cursor-pointer hover:scale-200"
                                    variant="outline"
                                    onClick={() => {
                                        addAvailability({
                                            dayOfWeek,
                                            startTime: "9:00",
                                            endTime: "17:00",
                                        })
                                    }}
                                >
                                    <Plus  color="red" />
                                </Button>

                                {groupedAvailabilityFields[dayOfWeek]?.map(
                                    (field, labelIndex) => (
                                        <div className="flex flex-col gap-1" key={field.id}>
                                            <div className="flex gap-2 items-center">
                                                <FormField
                                                    control={form.control}
                                                    name={`availabilities.${field.index}.startTime`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input
                                                                    className="w-24"
                                                                    aria-label={`${dayOfWeek} Start Time ${
                                                                        labelIndex + 1
                                                                    }`}
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                                -
                                                <FormField
                                                    control={form.control}
                                                    name={`availabilities.${field.index}.endTime`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input
                                                                    className="w-24"
                                                                    aria-label={`${dayOfWeek} End Time ${
                                                                        labelIndex + 1
                                                                    }`}
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />

                                                <Button
                                                    type="button"
                                                    className="size-6 p-1 cursor-pointer hover:bg-red-900"
                                                    variant="destructive"
                                                    onClick={() => removeAvailability(field.index)}
                                                >
                                                    <X />
                                                </Button>
                                            </div>

                                            <FormMessage>
                                                {
                                                    form.formState.errors.availabilities?.at?.(
                                                        field.index
                                                    )?.root?.message

                                                }
                                            </FormMessage>
                                            <FormMessage>
                                                {
                                                    form.formState.errors.availabilities?.at?.(
                                                        field.index
                                                    )?.startTime?.message
                                                }
                                            </FormMessage>
                                            <FormMessage>
                                                {
                                                    form.formState.errors.availabilities?.at?.(
                                                        field.index
                                                    )?.endTime?.message
                                                }
                                            </FormMessage>
                                        </div>
                                    )
                                )}
                            </div>
                        </Fragment>
                    ))}
                </div>

                <div className="flex gap-2 justify-start">
                    <Button
                        className="cursor-pointer hover:scale-105 bg-blue-400 hover:bg-blue-600"
                        disabled={form.formState.isSubmitting}
                        type="submit">
                        Save
                    </Button>
                </div>
            </form>
        </Form>

    )
}