import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from 'jose';
import { ROUTE_ACCESS } from "./components/routes";
export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

    const token = req.cookies.get('SiteSessionJWT')?.value;
    let verification = 0;

    if(!token) {
        console.log('verification not available');
    }
    else {
        const { payload } = await jwtVerify(token, secret);
        verification = payload.verification as number;
        console.log(verification);
    }

    const rule = ROUTE_ACCESS.find((r) => r.pattern.test(pathname));
    if (rule && verification < rule.minLevel) {
        return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/stamp/:path*',
        '/stampcard/:path*',
        '/profile/:path*',
        '/attendance/:path*',
    ],
}