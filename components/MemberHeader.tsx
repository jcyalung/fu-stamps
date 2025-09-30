import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { MEMBERROUTES } from "./routes";
const montserrat = Montserrat({
    weight: ["400"],
    subsets: ["latin"],
});



export default async function MemberHeader() {
    return (
        <div className="fixed w-full h-[68px] bg-black">
            <div className={`flex justify-between items-center h-full px-4 ${montserrat.className}`}>
                <div className="flex items-center text-darkgrey text-3xl gap-10">
                    {/* logo on the left */}
                    <Link href="/">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                    </Link>
                </div>
                <div className="flex items-center text-darkgrey text-3xl gap-10">
                    {Object.entries(MEMBERROUTES).map(([key, value]) => (
                        <Link key={value} href={key}> {value}</Link>
                    ))}
                </div>
            </div>
        </div>
    );
}