import { NextAuthOptions, getServerSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

class CustomError extends Error {
  errors: Record<any, any>;
  constructor({ message, errors }: { message: string; errors: any }) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
    this.errors = errors;
  }
}

const errorCallback = async (
  error: any,
  _req: any,
  _res: any,
  _configuration: any
) => {
  // Perform custom error handling logic here
  // For example, log the error or display it on the login page
  throw new Error(error.message);
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt", //(1)
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, user }) {
      console.log({ account, token, user });
      if (account) {
        token.accessToken = account.access_token;
      }
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      console.log({ session, token, user });
      session.user = {
        ...session.user,
        id: token.userId,
        access_token: token.access_token,
      } as any; //(3)
      return session;
    },
  },
  pages: {
    signIn: "/login", //(4) custom signin page path
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_MAIN_API_V1_URL}/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
            cache: "no-cache",
          }
        );

        const data = await res.json();

        console.log({ data, resOk: res.ok });

        if (!res.ok) {
          throw new Error(JSON.stringify(data));
        }

        return {
          userId: data.user.email,
          name: data.user.name,
          email: data.user.email,
          access_token: data.user.access_token,
        } as any; //(5)
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
