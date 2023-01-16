import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    // verify if dragonchat_login cookie exists
    const authenticated = req.cookies.get("dragonchat_login");
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();

    if (!authenticated) {
        url.pathname = '/login';
        url.search = `p${requestedPage}`;
        
        return NextResponse.redirect( url );
    } else {
        url.pathname = '/qr';
        url.search = `p${requestedPage}`;

        if (requestedPage !== '/qr') {
            // check if user has linked whatsapp session
            const accessToken = JSON.parse(authenticated.value).access_token;
            const headers = new Headers({
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            });
            const response = await fetch("http://api-user.dragonchat.io/api/v1/ws", {
                headers: headers
            });
            
            if (response.status == 200) {
                const data = await response.json();
                const whatsappConnected = data.data.connected_whatsapp;
                if (whatsappConnected == 0) {
                    // TODO set a cookie for block later qr view
                    return NextResponse.redirect( url );
                }
                return NextResponse.next();
            } else {
                // think about creating a response for fail
                return NextResponse.redirect( url );
            }
        }
        return NextResponse.next();
    }
    
    
}

export const config = {
    matcher: [
        '/dash',
        '/qr',
        '/premium'
    ]
}