import 'next-auth';

declare module 'next-auth' {
  interface User {
    role?: string;
    email?: string;
    id?: string;
    name?: string;
    image?: string;
    token?: string;
  }
  
  interface Session {
    user: {
      id?: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
      role?: string;
    }
    token?: string;
  }

  interface JWT {
    id?: string;
    role?: string;
    picture?: string;
    accessToken?: string;
  }
} 