import {ReactNode} from "react";
import {currentUser} from "@clerk/nextjs/server";
import PublicNav from "@/components/publicNav";
import PrivateNav from "@/components/privateNav";

export default async function mainLayout({  children }: { children: ReactNode }){

    const user = await currentUser();

    return(

     <main className="relative">
         {user ? <PrivateNav/> : <PublicNav/>}
         <section className="pt-26">
             {children}
         </section>
     </main>
 )
}