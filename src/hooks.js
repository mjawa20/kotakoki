import { handleSession } from "svelte-kit-cookie-session";
import { sequence } from "@sveltejs/kit/hooks";

const sessionHandler = handleSession({
  secret: "SOME_COMPLEX_SECRET_AT_LEAST_32_CHARS",
});

const routes = {
  private: [
    '/profile',
    '/user'
  ],
  auth: [
    '/login',
    '/register'
  ],
  public: [
    '/',
    '/cart'
  ]
}

/** @type {import('@sveltejs/kit').Handle} */
export const handle = sequence(sessionHandler, async ({ resolve, event }) => {
  if (event.locals.session.data?.authenticated && routes.auth.includes(event.url.pathname)) {
    return Response.redirect(event.url.origin + "/", 303);
  }

  const response = await resolve(event);
  return response;
})

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession({ locals }) {
  return locals.session.data;
};
