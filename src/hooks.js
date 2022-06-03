import * as cookie from 'cookie'
import { Tedis } from "tedis";

const db = new Tedis({ host: "localhost", port: 6379 })

const routes = {
  private: [
    '/profile',
    '/user'
  ],
  auth: [
    '/login',
    '/register'
  ]
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const cookies = cookie.parse(event.request.headers.get('cookie') || "")
  if (cookies.session_id && routes.auth.includes(event.url.pathname)) {
    return Response.redirect(event.url.origin+"/", 303);
  }

  if(routes.private.includes(event.url.pathname)) {
    if (!cookies.session_id) {
      return Response.redirect(event.url.origin+"/", 303);
    }
  
    const userSession = JSON.parse(await db.get(cookies.session_id))
  
    if (userSession) {
      event.locals.authenticated = true;
      event.locals.email = userSession.email;
    } else {
      event.locals.authenticated = false;
    }
  }

  const response = await resolve(event);
  return response;

}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(event) {
  if (!event.locals.authenticated) {
    return {
      authenticated: event.locals.authenticated,
    }
  }

  return {
    authenticated: event.locals.authenticated,
    email: event.locals.email
  }
}