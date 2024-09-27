import type { AuthOptions } from 'next-auth'
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

type Credentials = {
  email: string;
  password: string;
  user: string;
  jwt: string;
  id: string;
}

type SessionProps = {
  session: any; user: any; token: any;
}

type WrappedAuthOptions = AuthOptions & {
  pages: { signIn: string };
  providers: any[];
  session: { jwt: boolean; strategy: string };
  callbacks: {
    session: (arg: SessionProps) => Promise<any>
    jwt: (any) => any;
  };
  secret: string;
}

export const authOptions: WrappedAuthOptions = {
  pages: {
    signIn: '/api/auth/signIn', // Error code passed in query string as ?error=
  },
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      // credentials: {
      //   email: { label: "Email", type: "text", placeholder: "Email" },
      //   password: { label: "Password", type: "password" }
      // },
      credentials: {},
      async authorize(credentials = {}, req) {
        const { email, password } = credentials as Credentials
        const response = await fetch(
          `${process.env.API_URL}/api/auth/local`, {
            method: 'POST',
            body: JSON.stringify({
              identifier: email,
              password: password
            }),
            headers: { "Content-Type": "application/json" }  
          }
        );
        
        const res = await response.json();
          
        // If no error and we have user data, return it
        if (res?.user && res?.jwt) {
          return {
            id: res?.user?.id,
            jwt: res?.jwt,
            email: res?.user?.email,
            createdAt: res?.user?.createdAt,
          }
        }
        // Return null if user data could not be retrieved
        return null
      }
    })
    // ...add more providers here
  ],
  session: {
    jwt: true,
		strategy: "jwt",
	},
  callbacks: {
    async session({ session, user, token }) {
      session.user = token.user
      session.jwt = token.jwt;
      session.id = token.id;
      session.email = token.email;
      
      return session;
    },
    async jwt({ token, user, account }) {
      const isSignIn = !!user
      
      if (account?.type === 'credentials') {
        token.jwt = user?.jwt;
        token.id = user?.id
        token.user = user;
      } else if (isSignIn) {
        const response = await fetch(
          `${process.env.API_URL}/api/auth/${account.provider}/callback?access_token=${account?.access_token}`
        );
        const data = await response.json();
        token.jwt = data.jwt;
        token.id = data.user.id;
        token.user = data.user;
      }

      return token
    }
  },
  secret: process.env.NEXTAUTH_SECRET || ''
}
