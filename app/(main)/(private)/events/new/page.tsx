import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import EventForm from "@/components/forms/eventForm";

export default function newEventsPage() {
    return (
        <div className="max-w-md mx-auto border-8 border-blue-200 shadow-xl shadow-accent-foreground">
            <Card>
                <CardHeader>
                    <CardTitle>
                        New Events
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <EventForm/>
                </CardContent>
            </Card>
        </div>
    );
}
