import 'next-auth';

declare module 'next-auth' {
  interface User {
    role?: string;
<<<<<<< HEAD
    email?: string;
    id?: string;
    name?: string;
    image?: string;
    token?: string;
=======
>>>>>>> e8f13d079188d56eaced21503e0728eb2c3b82be
  }
  
  interface Session {
    user: {
<<<<<<< HEAD
      id?: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
      role?: string;
    }
    token?: string;
=======
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    }
>>>>>>> e8f13d079188d56eaced21503e0728eb2c3b82be
  }
} 