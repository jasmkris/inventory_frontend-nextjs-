import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Add your authentication logic here
          // Return null if user data could not be retrieved
          // Return user object if authentication successful
          const data = {
            email: credentials?.email,
            password: credentials?.password
          }
          const response = await api.post('/auth/login', data);

          if (response.status === 200) {
            return {
              id: response.data?.user?.id,
              email: credentials?.email,
              name: response.data?.user?.firstName + ' ' + response.data?.user?.lastName,
              role: response.data?.user?.role,
              image: response.data?.user?.image,
              token: response.data?.token
            }
          }
          return null;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session?.user) {
        // Return previous token with updated user data
        console.log('session user', session);
        return {
          ...token,
          name: session.user.name,
          image: session.user.image,
        };
      }
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.accessToken = user.token; // Save token to JWT
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.role = token.role as string;
        session.token = token.accessToken as string; // Add token to session
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error', // Add custom error page
  },
  session: {
    strategy: 'jwt',
  },
  debug: process.env.NODE_ENV === 'development', // Enable debug logs in development
}; 