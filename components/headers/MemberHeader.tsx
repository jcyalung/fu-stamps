import Image from "next/image";
import Link from "next/link";
import { MEMBERROUTES } from "@/components/routes";
import { HOVER_STYLE } from "@/constants";



export default function MemberHeader() {
    return (
        <div className="fixed w-full h-[68px] bg-black">
            <div className={`flex justify-between items-center h-full px-4`}>
                <div className="flex items-center text-darkgrey text-3xl gap-10">
                    {/* logo on the left */}
                    <Link href="/">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={60}
                            height={60}
                            className="rounded-full transform transition-transform duration-1000 hover:rotate-360"
                        />
                    </Link>
                </div>
                <div className="flex items-center text-darkgrey text-3xl gap-10">
                    {Object.entries(MEMBERROUTES).map(([key, value]) => (
                        <Link key={value} href={key} className={`${HOVER_STYLE} hover:text-white`}> {value}</Link>
                    ))}
                </div>
            </div>
        </div>
    );
}