import { handleSession } from "svelte-kit-cookie-session";
import { sequence } from "@sveltejs/kit/hooks";

const sessionHandler = handleSession({
  secret: "SOME_COMPLEX_SECRET_AT_LEAST_32_CHARS",
});

const routes = {
  private: [
    '/account',
    '/user'
  ],
  auth: [
    '/login',
    '/register'
  ],
  public: [
    '/',
    '/cart',
    '/collections/1/product/1f3c70072c5'
  ]
}

/** @type {import('@sveltejs/kit').Handle} */
export const handle = sequence(sessionHandler, async ({ resolve, event }) => {
  if (event.locals.session.data?.authenticated && routes.auth.includes(event.url.pathname)) {
    return Response.redirect(event.url.origin + "/", 303);
  }
<<<<<<< HEAD
  
  event.locals.authenticated = false;

  if (routes.private.includes(event.url.pathname) || !routes.auth.includes(event.url.pathname)) {
    if (!cookies.session_id && !routes.public.includes(event.url.pathname)) {
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
=======
>>>>>>> f1a774272e6939885eae00d19469df7006f8ae40

  const response = await resolve(event);
  return response;
})

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession({ locals }) {
  return locals.session.data;
};
