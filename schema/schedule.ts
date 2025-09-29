import { timeToFloat } from "@/lib/utils";
import { z } from "zod";
import {DAYS_OF_WEEK_IN_ORDER} from "@/lib/constants";

export const scheduleFormSchema = z.object({
    timezone: z.string().min(1, "Required"), // The timezone must be a string and cannot be empty
    availabilities: z // The 'availabilities' field is an array
        .array( // The array contains objects with specific properties
            z.object({
                dayOfWeek: z.enum(DAYS_OF_WEEK_IN_ORDER), // 'dayOfWeek' must be one of the days from the DAYS_OF_WEEK_IN_ORDER array
                startTime: z // 'startTime' must be a string that matches the HH:MM format (24-hour time)
                    .string()
                    .regex(
                        /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, // Regex pattern to match the time format
                        "Time must be in the format HH:MM"),
                endTime: z
                    .string()
                    .regex(
                        /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, // Regex pattern to match the time format
                        "Time must be in the format HH:MM" // Custom error message
                    ),
            })
        )

        .superRefine((availabilities, ctx) => { // Custom refinement function to add additional validation
            availabilities.forEach((availability, index) => { // Loop through each availability in the array
                const overlaps = availabilities.some((a, i) => { // Check if there are any time overlaps with other availabilities
                    return (
                        i !== index && // Ensure it's not comparing the same item to itself
                        // In other words, both i and index refer to the same item in the availabilities array. We don't want to compare an item with itself when checking for overlaps, because any time range will always "overlap" with itself — which would cause a false positive.
                        a.dayOfWeek === availability.dayOfWeek && // Check if it's the same day of the week
                        // If a.dayOfWeek === availability.dayOfWeek is true, it means that the two availability entries being compared are for the same day of the week—for example, both are on Monday.
                        // This is important because we're only concerned with overlapping times on the same day. If they're on different days (like Monday and Tuesday), it doesn't matter if their times overlap.
                        //that’s the whole purpose of this check.
                        // The idea is: when a user adds or edits their availability (like “Monday from 9:00 to 11:00”), we want to make sure they're not accidentally creating another overlapping slot on the same day (like “Monday from 10:30 to 12:00”).
                        timeToFloat(a.startTime) < timeToFloat(availability.endTime) && // Check if the start time of one is before the end time of another
                        timeToFloat(a.endTime) > timeToFloat(availability.startTime) // Check if the end time of one is after the start time of another
                    )
                })
                if (overlaps) {
                    ctx.addIssue({
                        code: "custom",
                        message: "Availability overlaps with another",
                        path: [index, "startTime"],
                    })
                }

                if (
                    timeToFloat(availability.startTime) >= timeToFloat(availability.endTime) // Check if start time is greater than or equal to end time
                ) {
                    ctx.addIssue({
                        code: "custom", // Custom validation error code
                        message: "End time must be after start time", // Custom error message
                        path: [index, "endTime"], // ⬅️ This attaches error to endTime field
                    })
                }
            })
        }),


})