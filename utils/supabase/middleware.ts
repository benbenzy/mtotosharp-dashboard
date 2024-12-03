import { createServerClient } from '@supabase/ssr'
import { SupabaseClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
type responseType={
  response:NextResponse,
  supabase:SupabaseClient
}

export async function updateSession (request:NextRequest) {
  const url = request.nextUrl.pathname;
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';
  const isMobile = /iPhone|Android/i.test(userAgent);
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value
        },
        set(name, value, options) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name, options) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // refreshing the auth token
  const {data:{user}}=await supabase.auth.getUser()
  if (!user) {
    if (request.nextUrl.pathname !== '/') {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }
 

  // Handle Universal Link for `/records/:id`.
  if (pathname.startsWith('/courses/')) {
    const recordId = pathname.split('/courses/')[1];

    if (isMobile) {
      return NextResponse.redirect(`mtotosharp://courses/${recordId}`);
    }
  }

  //return NextResponse.next();
  
   // Fetch user profile to get the role
   const role = user?.user_metadata?.role
  //  if (role === 'admin' && !request.nextUrl.pathname.startsWith("/")) {
  //   return NextResponse.redirect(new URL("/", request.url))
  // }
 
  //  if (role === 'authenticated' && !request.nextUrl.pathname.startsWith("/dashboard")) {
  //    return NextResponse.redirect(new URL("/dashboard", request.url))
  //  }
  //  if (role === 'author' && !request.nextUrl.pathname.startsWith("/author")) {
  //    return NextResponse.redirect(new URL("/author", request.url))
  //  }
 

  return response
}