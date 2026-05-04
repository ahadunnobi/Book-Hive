import { betterAuth } from "better-auth";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
// import { getDb, getMongoClient } from "@/lib/mongo";

/** Set in `.env.local` — see `env.example`. Defaults allow local `next build` without a file. */
const secret =
  process.env.BETTER_AUTH_SECRET ??
  "dev-only-set-better-auth-secret-32chars-minimum-ok";
const baseURL = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";

// const client = getMongoClient();
// const db = getDb();

const googleId = process.env.GOOGLE_CLIENT_ID;
const googleSecret = process.env.GOOGLE_CLIENT_SECRET;

export const auth = betterAuth({
  // database: mongodbAdapter(db, { client }),
  secret,
  baseURL,
  emailAndPassword: {
    enabled: true,
  },
  ...(googleId && googleSecret
    ? {
        socialProviders: {
          google: {
            clientId: googleId,
            clientSecret: googleSecret,
          },
        },
      }
    : {}),
  plugins: [nextCookies()],
});
