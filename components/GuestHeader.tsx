import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { COOKIE_NAME } from "@/constants";
import { cookies } from 'next/headers'
import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";

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


export default async function GuestHeader() {
    const userId = await getUserFromCookie();
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
                    {/* links on the right */}
                    {/* if userId is not null, then the user is logged in, else display login and about links */}
                    { userId ? (
                        <>
                        {/* user header */}
                            <Link href="/stamp" className="hover:text-yellowunderline">
                                STAMP CARDS
                            </Link>
                            <Link href="/profile" className="hover:text-yellowunderline">
                                PROFILE
                            </Link>
                            <Link href="/about" className="hover:text-yellowunderline">
                                ABOUT
                            </Link>
                        </>
                        
                    )
                    :
                        <>
                        {/* guest header */}
                            <Link href="/login" className="hover:text-yellowunderline">
                                LOGIN
                            </Link>
                            <Link href="/about" className="hover:text-yellowunderline">
                                ABOUT
                            </Link>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}