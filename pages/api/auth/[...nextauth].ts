import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prisma"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
    adapter: PrismaAdapter(prisma),
    secret: process.env.SECRET,
    // https://next-auth.js.org/configuration/providers/oauth
    providers: [
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
        }),
    ],
    theme: {
        colorScheme: "dark",
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            console.log("USER: ", user)
            const allowedEmails = [
                "tdogg812013@gmail.com",
                "travis.saylor@gmail.com",
                "saylor.amanda@gmail.com",
            ]

            console.log("User allowed: ", allowedEmails.includes(user?.email))

            return allowedEmails.includes(user?.email)
        },
    },
    session: {
        // Choose how you want to save the user session.
        // The default is `"jwt"`, an encrypted JWT (JWE) in the session cookie.
        // If you use an `adapter` however, we default it to `"database"` instead.
        // You can still force a JWT session by explicitly defining `"jwt"`.
        // When using `"database"`, the session cookie will only contain a `sessionToken` value,
        // which is used to look up the session in the database.
        strategy: "database",

        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        updateAge: 24 * 60 * 60, // 24 hours
    },
})
