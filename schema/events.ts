import {z} from "zod";

export const eventFormSchema = z.object({
    name: z.string().min(1,"required"),
    description: z.string().min(1).optional(),
    durationInMin:z.coerce.number().int().positive("duration must be more than 0").max(60*12,`duaration must be less than 12 hourse,(${60*12} min)`),
    isActive: z.boolean(),
})