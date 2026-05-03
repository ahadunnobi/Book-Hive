import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { getDb, getMongoClient } from "@/lib/mongo";

const secret = process.env.BETTER_AUTH_SECRET;
const baseURL = process.env.BETTER_AUTH_URL;

if (!secret) {
  throw new Error("BETTER_AUTH_SECRET is not set");
}
if (!baseURL) {
  throw new Error("BETTER_AUTH_URL is not set");
}

const client = getMongoClient();
const db = getDb();

const googleId = process.env.GOOGLE_CLIENT_ID;
const googleSecret = process.env.GOOGLE_CLIENT_SECRET;

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
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
