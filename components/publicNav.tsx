"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {ModeToggle} from "@/components/modeToggle";
import {Button} from "@/components/ui/button";

export default function PublicNav() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');

    if (isAuthPage) {
        return null;
    }

    return (
        <nav className="bg-background border-b border-border w-full h-16 flex items-center shadow-sm">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <div className="flex flex-row gap-2 justify-start items-center hover:scale-120 duration-500">
                    <Link href="/login">
                        <img src="/logo.svg" alt="Calendly Clone Logo" className="w-8 h-8" />
                    </Link>
                    <h1 className="text-xl text-blue-800 font-bold">Calendra</h1>
                </div>
                <div className="hidden md:flex items-center gap-4">
                    <SignedOut>
                        <SignInButton>
                            <Button className="bg-blue-800 text-white px-4 py-2 rounded-3xl hover:text-blue-500 duration-500 transition-colors font-medium">
                                Sign In
                            </Button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton
                            userProfileMode="modal"
                            appearance={{
                                elements: {
                                    avatarBox: "w-10 h-10 rounded-full border-2 border-primary/20"
                                }
                            }}
                        />
                    </SignedIn>
                    <ModeToggle/>
                </div>

                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-foreground focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border shadow-lg">
                    <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                        <ul className="flex flex-col gap-4">
                            <li>
                                <Link
                                    href="/"
                                    className="block py-2 text-foreground/80 hover:text-foreground transition-colors font-medium"
                                    onClick={handleLinkClick}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/calendar"
                                    className="block py-2 text-foreground/80 hover:text-foreground transition-colors font-medium"
                                    onClick={handleLinkClick}
                                >
                                    Calendar
                                </Link>
                            </li>
                        </ul>

                        <div className="pt-4 border-t border-border">
                            <SignedOut>
                                <SignInButton className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors font-medium" />
                            </SignedOut>
                            <SignedIn>
                                <UserButton
                                    userProfileMode="modal"
                                    appearance={{
                                        elements: {
                                            avatarBox: "w-10 h-10 rounded-full border-2 border-primary/20"
                                        }
                                    }}
                                />
                            </SignedIn>
                        </div>
                        <ModeToggle/>
                    </div>
                </div>
            )}
        </nav>
    )
}