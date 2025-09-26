import {SignIn} from "@clerk/nextjs";

export default function LoginPage() {
    return (
        <>
            <div className="flex flex-col items-center justify-center animate-fade-in">
            <div className="flex flex-col p-10">
                <img src="/logo.svg" height={100} width={100} alt="Calendly logo"/>
            </div>
        <div className="min-h-screen flex">
            <SignIn/>
        </div>
            </div>
        </>
    )
}
