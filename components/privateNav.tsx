'use client'

import { cn } from "@/lib/utils";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {PrivateNavLinks} from "@/lib/constants";

export default function PrivateNav() {
    const pathname = usePathname();

    return (
        <nav className="flex justify-between items-center fixed z-50 w-full h-28 bg-gray-200 px-10 gap-4 shadow-2xl mb-28">
            {/* Logo */}
            <Link href="/events" className="flex items-center gap-1 hover:scale-150 duration-500 ">
                <Image
                    src="/assets/logo.svg"
                    width={60}
                    height={60}
                    alt="Let's talk"
                />
            </Link>

            {/* Nav Links */}
            <section className="sticky top-0 flex justify-between text-black ">
                <div className="flex flex-1 max-sm:gap-0 sm:gap-6">
                    {PrivateNavLinks.map((item) => {
                        const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);

                        return (
                            <Link
                                href={item.route}
                                key={item.label}
                                className={
                                    cn('flex gap-4 items-center p-4 rounded-lg justify-start hover:scale-150 duration-300 ',
                                        isActive && 'bg-blue-100 rounded-3xl'
                                    )
                                }
                            >
                                <Image
                                    src={item.imgURL}
                                    alt={item.label}
                                    width={30}
                                    height={30}
                                />
                                <p className={cn(
                                    "text-lg font-semibold max-lg:hidden",
                                )}>
                                    {item.label}
                                </p>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* User button */}
            <div className='hover:scale-150 duration-500 '>
                <SignedIn>
                    {/* Mount the UserButton component */}
                    <UserButton />
                </SignedIn>

            </div>

        </nav>
    )
}