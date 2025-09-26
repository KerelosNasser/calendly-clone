import {Button} from "@/components/ui/button";
import Link from "next/link";
import {CalendarPlus} from "lucide-react";

export default function events() {
    return (
        <div>
            <section className="flex flex-col items-center gap-16 animate-fade-in">
                <div className="flex gap-4 items-baseline py-6">
                    <h1 className="text-5xl font-black mb-4">
                        events
                    </h1>
                    <Button
                        className="bg-blue-500 hover:bg-blue-400 text-white py-6 hover:scale-110 duration-500 border-b-4 border-blue-700 hover:border-blue-500 rounded-2xl shadow-accent-foreground text-2xl font-black"
                        asChild>
                        <Link href="/events/new">
                              <CalendarPlus className="mr-4 size-7"/>
                            Create event
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
