import { startOfDay } from "date-fns"
import { z } from "zod"

const meetingSchemaBase = z.object({
    startTime: z.date().min(new Date()),

    guestEmail: z.string().email().min(1, "Required"),

    guestName: z.string().min(1, "Required"),

    guestNotes: z.string().optional(),

    timezone: z.string().min(1, "Required"),
})

export const meetingFormSchema = z
    .object({
        date: z.date().min(startOfDay(new Date()), "Must be in the future"),
    })
    .merge(meetingSchemaBase)

// Schema for handling a meeting action, like saving it to the database
export const meetingActionSchema = z
    .object({
        // 'eventId' is required and must be a non-empty string
        eventId: z.string().min(1, "Required"),

        // 'clerkUserId' is required and must be a non-empty string
        clerkUserId: z.string().min(1, "Required"),
    })
    .merge(meetingSchemaBase)