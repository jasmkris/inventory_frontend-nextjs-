import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                    request.nextUrl.pathname.startsWith('/register');

  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/rooms/:path*',
    '/objects/:path*',
    '/login',
    '/register',
  ],
<<<<<<< HEAD
}; 

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { getToken } from 'next-auth/jwt';

// export async function middleware(request: NextRequest) {
//   const token = await getToken({ req: request });
//   const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
//                     request.nextUrl.pathname.startsWith('/register');

//   // Define public paths that should be accessible without authentication
//   const publicPaths = ['/login', '/register'];
  
//   // Define valid paths in your application
//   const validPaths = [
//     '/dashboard',
//     '/rooms',
//     '/objects',
//     '/history',
//     '/login',
//     '/register',
//     // Add any other valid paths here
//   ];

//   // Check if the current path starts with any valid path
//   const isValidPath = validPaths.some(path => 
//     request.nextUrl.pathname === path || 
//     request.nextUrl.pathname.startsWith(`${path}/`)
//   );

//   if (isAuthPage) {
//     if (token) {
//       return NextResponse.redirect(new URL('/dashboard', request.url));
//     }
//     return NextResponse.next();
//   }

//   if (!token) {
//     const loginUrl = new URL('/login', request.url);
//     loginUrl.searchParams.set('from', request.nextUrl.pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   // Redirect to dashboard if path is not valid
//   if (!isValidPath) {
//     return NextResponse.redirect(new URL('/dashboard', request.url));
//   }

//   return NextResponse.next();
// }

// // Update the config to include all paths
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     '/((?!api|_next/static|_next/image|favicon.ico).*)',
//   ],
// };
=======
}; 
>>>>>>> e8f13d079188d56eaced21503e0728eb2c3b82be
