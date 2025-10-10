import Image from "next/image";
import Link from "next/link";
import { GUESTROUTES, ACADEMICSROUTES, MEMBERROUTES, RouteProps } from "@/components/routes";
import { HOVER_STYLE } from "@/constants";
interface HeaderProps {
  verification: number | null;
}

export default function Header({verification} : HeaderProps) {
    let routes : RouteProps;
    if(verification == 2) { routes = ACADEMICSROUTES; }
    else if(verification == 1) { routes = MEMBERROUTES; }
    else { routes = GUESTROUTES; }
    return (
        <div className="fixed w-[100vw] h-[68px] bg-black z-100">
            <div className={`flex justify-between items-center h-full px-4`}>
                <div className="flex items-center w-[clamp(1.5rem,20vw,3.75rem)] h-[clamp(1.5rem,20vw,3.75rem)] text-darkgrey text-3xl gap-10">
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
                <div className="flex items-center text-darkgrey text-[clamp(0.5rem,3vw,1.875rem)] gap-10">
                    {Object.entries(routes).map(([key, value]) => (
                        <Link key={value} href={key} className={`${HOVER_STYLE} hover:text-white`}> {value}</Link>
                    ))}
                </div>
            </div>
        </div>
    );
}