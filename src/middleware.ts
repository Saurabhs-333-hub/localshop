import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/login' || path === '/signup'
    const token = request.cookies.get('token')?.value || ""
    //? Check if the path is public and the user is logged in
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl))
    }

    //? Check if the path is private and the user is not logged in
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

    //? If neither of the above, continue without redirect
    return NextResponse.next()

    //? If you want to redirect to a different host, use the following
    //? return NextResponse.redirect('https://example.com')

    //? If you want to redirect to a different path on the same host, use the following
    //? return NextResponse.redirect(new URL('/login', request.nextUrl))

    //? If you want to return a custom error page, use the following
    //? return new Response('Unauthorized', { status: 401 })

    //? If you want to return the result of another route, use the following
    //? return NextResponse.render('/login')

    //? If you want to return the result of a static file, use the following
    //? return NextResponse.fromStatic('/login.html')

    //? If you want to return "next" to continue processing, use the following
    //? return NextResponse.next()

    //? If you want to return a custom response, use the following
    //? return new Response('Hello world!')

    //? If you want to return the result of another route, use the following
    //? return NextResponse.render('/login')

    //? If you want to return the result of a static file, use the following
    //? return NextResponse.fromStatic('/login.html')

    //? If you want to return "next" to continue processing, use the following
    //? return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup'
    ],
}