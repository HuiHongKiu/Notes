// src/pages/api/login.ts
export const prerender = false; 

import type { APIRoute } from "astro";
import { credentials } from "../../lib/credentials";

const PASSWORD = credentials.password; // or import from credentials file

export const POST: APIRoute = async ({ request, cookies }) => {
  const formData = await request.formData();
  const password = formData.get("password");

  if (password === PASSWORD) {
    // Set a secure cookie for 8 hours
    cookies.set("loggedIn", "true", {
      path: "/",
      httpOnly: false,
      sameSite: "strict",
      maxAge: 60 * 60 * 8,
      secure: import.meta.env.PROD,
    });

    let url = new URL(request.url);

    return Response.redirect(`${url.origin}/notes/content/list`);
  }

  // Wrong password: redirect back with error
  return new Response(null, {
    status: 303,
    headers: { location: "/notes/login?error=invalid" },
  
  });
};
