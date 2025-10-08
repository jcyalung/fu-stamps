import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { ROUTE_ACCESS } from "./components/routes";
import { TABLES } from "./constants";

const LOGIN_PATHS = ['/login','/register','/verify'];

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    try {
        const pathname = req.nextUrl.pathname;
        const supabase = createMiddlewareClient({req, res});
        const {
            data : { session }, error : supabaseError
        } = await supabase.auth.getSession();
        // login special case
        // if you're already logged in or registered, you cannot access these pages
        if(!session || supabaseError) {
            // Allow public access to login/register/verify pages
                if (LOGIN_PATHS.includes(pathname)) return res;
                return NextResponse.redirect(new URL("/login", req.url));
        }
        
        // login and register special case
        
        // check user
        const { data : user, error : userError } = await supabase.from(TABLES.USERS).select('verification').single();
        if(userError) { throw Error(userError.message); }
        const verification  = user?.verification;
    
        
        if (verification === 1 && LOGIN_PATHS.includes(pathname)) {
            return NextResponse.redirect(new URL("/", req.url));
        }

        // check rules that exist for specific pathname
        const rule = ROUTE_ACCESS.find((r) => r.pattern.test(pathname));
        if (rule && verification < rule.minLevel) {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
        return NextResponse.next();
    }
    catch(err : any) {
        console.error(err.message);
        return NextResponse.redirect(new URL('/404', req.url));
    }
}

export const config = {
    matcher: [
        '/stamp/:path*',
        '/login/:path*',
        '/register/:path*',
        '/stampcard/:path*',
        '/profile/:path*',
        '/attendance/:path*',
    ],
}