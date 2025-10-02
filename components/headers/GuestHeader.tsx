import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { GUESTROUTES } from "@/components/routes";
const montserrat = Montserrat({
    weight: ["400"],
    subsets: ["latin"],
});


export default function GuestHeader() {
    return (
        <div className="fixed w-full h-[68px] bg-black z-100">
            <div className={`flex justify-between items-center h-full px-4 ${montserrat.className}`}>
                <div className="flex items-center text-darkgrey text-3xl gap-10">
                    {/* logo on the left */}
                    <Link href="/">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={60}
                            height={60}
                            className="rounded-full"
                        />
                    </Link>
                </div>
                <div className="flex items-center text-darkgrey text-3xl gap-10">
                    {Object.entries(GUESTROUTES).map(([key, value]) => (
                        <Link key={value} href={key}> {value}</Link>
                    ))}
                </div>
            </div>
        </div>
    );
}