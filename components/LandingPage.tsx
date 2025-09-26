import {SignIn} from "@clerk/nextjs";
import {neobrutalism} from "@clerk/themes";

export const LandingPage = () => {
    return (
        <main className="animate-fade-in justify-center gap-24 p-10 flex max-md:flex-col items-center">
            <section className="flex flex-col items-center justify-center content-center">
                <img src="/logo.svg" alt="Calendly" height={200} width={200} />
                <h1 className="text-5xl font-bold text-blue-800">
                    Time perfectly planned
                </h1>
                <p className="font-extralight p-4">
                    Join millions of professionals who easily book meetings with the
                    #1 scheduling tool
                </p>
                <img src="/planning.svg" alt="Calendly hero" height={500} width={500} />
            </section>
            <div className="mt-4">
                <SignIn
                    routing={"hash"}
                    appearance={{
                        baseTheme: neobrutalism,
                    }}
                />
            </div>
        </main>
    );
};
