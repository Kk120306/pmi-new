"use server"

import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getAuthorByEmail } from "@/lib/queries"
import bcrypt from "bcrypt"


async function getUser(email: string): Promise<any | undefined> {
    try {
        const user = await getAuthorByEmail(email)
        return user;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {
                    type: "email",
                    label: "Email",
                    placeholder: "you@example.com",
                },
                password: {
                    type: "password",
                    label: "Password",
                    placeholder: "••••••••",
                },
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password")
                }

                const email = credentials.email as string
                const password = credentials.password as string

                const user = await getUser(email);
                if (!user) throw new Error("No user found")

                const isValid = await bcrypt.compare(password, user.password)
                if (!isValid) throw new Error("Invalid credentials")

                return {
                    id: user.id.toString(),
                    email: user.email ?? null,
                    name: user.name ?? null,

                }
            },
        }),
    ],
})


