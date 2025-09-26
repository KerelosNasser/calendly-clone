import {ClerkProvider, SignInButton} from "@clerk/nextjs";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {LandingPage} from "@/components/LandingPage";


export default  async function Home() {
    const user = await currentUser();
    if (!user){
        return <LandingPage/>
    }
    return redirect("/events")
}
