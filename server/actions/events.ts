'use server';
import {z} from "zod";
import {eventFormSchema} from "@/schema/events";
import {auth} from "@clerk/nextjs/server";
import {db} from "@/drizzle/db";
import {EventTable} from "@/drizzle/schema";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {and, eq} from "drizzle-orm";

export async function createEvent(
    unsafeData: z.infer<typeof eventFormSchema>
): Promise<void> {
    try {
        const userId = await auth();
        const {success, data} = eventFormSchema.safeParse(unsafeData)
   const onSubmit = async (values: z.infer<typeof eventFormSchema>) => {
     const action = event == null ? createEvent : updateEvent.bind(null, event.id)
     try {
       const result = await action(values)
       // Handle success case
     } catch (error: any) {
       console.error('Form submission error:', error)
       form.setError("root", { message: error.message || "Failed to save event" })
     }
   }

        if (!success || !userId) {
            throw new Error("Invalid data");
        }
        await db.insert(EventTable).values({...data, clerkUserId: userId})
    } catch (error: any) {
        throw new Error(error.message);
    } finally {
        revalidatePath("/events")
        redirect('/events')
    }
}

export async function updateEvent(
    id: string,
    unsafeData: z.infer<typeof eventFormSchema>
): Promise<void> {
    try {
        const userId = await auth();
        const {success, data} = eventFormSchema.safeParse(unsafeData)

        if (!success || !userId) {
            throw new Error("Invalid data");
        }
        const {rowCount} = await db.update(EventTable)
            .set({...data})
            .where(and(eq(EventTable.id, id), eq(EventTable.clerkUserId, userId)))
    } catch (error: any) {
        throw new Error(error.message);
    } finally {
        revalidatePath("/events")
        redirect('/events')
    }
}

export async function deleteEvent(
    id: string,
): Promise<void> {
    try {
        const userId = await auth();
        const {rowCount} = await db.delete(EventTable)
            .where(and(eq(EventTable.id, id), eq(EventTable.clerkUserId, userId)))
    } catch (error: any) {
        throw new Error(error.message);
    } finally {
        revalidatePath("/events")
        redirect('/events')
    }
}
type EventRow = typeof EventTable.$inferSelect;
export async function getEvents(clerkUserId: string):Promise<EventRow[]>{
    const events = await db.query.EventTable.findMany(
        {
            where: ({clerkUserId: userIdCol},{eq}) =>  eq(userIdCol, clerkUserId),
            orderBy:({name},{asc,sql}) =>asc(sql`lower(${name})`)
        },
    )
}