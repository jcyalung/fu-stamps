import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
    weight: ["400"],
    subsets: ["latin"],
});

export default function GuestHeader() {
    return (
        <div className="fixed w-full h-[68px] bg-black">
            <div className={`flex justify-between items-center h-full px-4 ${montserrat.className}`}>
                <div className="flex items-center text-darkgrey text-3xl gap-10">
                    <Link href="/">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                    </Link>
                    <Link href="/login" className="hover:text-yellowunderline">
                        LOGIN
                    </Link>
                    <Link href="/about" className="hover:text-yellowunderline">
                        ABOUT
                    </Link>
                </div>
                <div>
                    aaaaaaa
                </div>
            </div>
        </div>
    );
}