import * as cookie from 'cookie'
import db from './../db';

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
    return Response.redirect(event.url.origin + "/", 303);
  }
  
  event.locals.authenticated = false;

  if (routes.private.includes(event.url.pathname) || event.url.pathname === '/') {
    if (!cookies.session_id && event.url.pathname !== '/') {
      return Response.redirect(event.url.origin + "/", 303);
    }

    let userSession;
    if (cookies.session_id) {
      userSession = await db.models.user.findOne({ where: { sessionId: cookies.session_id } })
    }

    if (userSession) {
      event.locals.authenticated = true;
      event.locals.name = userSession.name;
      event.locals.email = userSession.email;
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
    email: event.locals.email,
    name: event.locals.name
  }
}