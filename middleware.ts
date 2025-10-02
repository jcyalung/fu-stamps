import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { ROUTE_ACCESS } from "./components/routes";
import { TABLES } from "./constants";
export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    try {
        const supabase = createMiddlewareClient({req, res});
        const {
            data : { session }, error : supabaseError
        } = await supabase.auth.getSession();
        // login special case
        // if you're already logged in or registered, you cannot access these pages
        if(req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register') {
            if(session) {
                return NextResponse.redirect(new URL('/', req.url));
            }
            else {
                return NextResponse.next();
            }
        }
        if(!session || supabaseError) {
            console.error(supabaseError?.message)
            return NextResponse.redirect(new URL('/login', req.url));
        }
        
        // login and register special case
        
        // check user
        const { data : user, error : userError } = await supabase.from(TABLES.USERS).select('verification').single();
        if(userError) { throw Error(userError.message); }
        const verification  = user?.verification;
    
        const pathname = req.nextUrl.pathname;
        
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
        '/stampcard/:path*',
        '/profile/:path*',
        '/attendance/:path*',
    ],
}