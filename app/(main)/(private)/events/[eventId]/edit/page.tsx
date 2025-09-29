import {auth} from "@clerk/nextjs/server";
import {getEvent} from "@/server/actions/events";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import EventForm from "@/components/forms/eventForm";

export default async function EditEventPage({
                                                params,
                                            }: { params: Promise<{ eventId: string }> }
) {
    const {userId, redirectToSignIn} = await auth()
    if (!userId) return redirectToSignIn()
    const {eventId} = await params
    const event = await getEvent(userId, eventId)

    if (!event) {
        return (
            <div>
                Event not found
            </div>
        )
    }
    return (
        <Card className="max-w-md mx-auto border-8 border-blue-200 shadow-xl shadow-accent-foreground">
            <CardHeader>
                <CardTitle>edit event</CardTitle>
            </CardHeader>
            <CardContent>
                <EventForm event={{...event, description: event.description || undefined}}/>
            </CardContent>
        </Card>
    )
}