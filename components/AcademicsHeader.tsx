import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { COOKIE_NAME } from "@/constants";
import { cookies } from 'next/headers'
import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { ACADEMICSROUTES  } from "./routes";
const montserrat = Montserrat({
    weight: ["400"],
    subsets: ["latin"],
});

//get user_id from cooke
export async function getUserFromCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get("SiteSessionJWT")?.value;

  if (!token) return null;
  const secret = process.env.JWT_SECRET || "";
  try {
    const decoded = verify(token, secret);
    const user_id = (decoded as any).user_id;
  } catch (e) {
    return null;
  }
}


export default async function AcademicsHeader() {
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
                    {Object.entries(ACADEMICSROUTES).map(([key, value]) => (
                        <Link key={value} href={key}> {value}</Link>
                    ))}
                </div>
            </div>
        </div>
    );
}