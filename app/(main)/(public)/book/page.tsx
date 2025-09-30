'use client'
import {useUser} from "@clerk/nextjs";
import {redirect} from "next/navigation";

export default function PublicPage () {
    const {user , isLoaded} =  useUser();
    if (!isLoaded) {
        return <div className="text-center">Loading...</div>;
    }
    if  (!user) {
        redirect('/login')

    }
    return redirect(`/book/${user.id}`)
}
