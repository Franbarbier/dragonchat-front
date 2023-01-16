import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const authenticated = false;

    if (!authenticated) {
        const requestedPage = req.nextUrl.pathname;
        const url = req.nextUrl.clone();
        url.pathname = '/login';
        url.search = `p${requestedPage}`
        
        return NextResponse.redirect( url )
    }
    
    // 
    return NextResponse.next();
    
}

export const config = {
    matcher: [
        '/dash',
        '/qr',
        '/premium'
    ]
}