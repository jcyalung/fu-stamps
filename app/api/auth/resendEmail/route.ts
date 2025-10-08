import { resendVerificationEmail } from "@/app/registerFunctions";
export async function GET(req: Request) {
    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const token = searchParams.get('token');
    if(!token) {
        return new Response(
            JSON.stringify({ error: 'Token not supplied' }), { status: 401}
        )
    }
    
    await resendVerificationEmail(token);
    
    return new Response(
        JSON.stringify({message: 'message'}), { status: 200 }
    );
    
}