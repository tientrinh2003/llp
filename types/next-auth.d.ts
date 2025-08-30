import "next-auth";
declare module "next-auth" {
  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      username?: string | null;
      role?: string;
    };
  }
  interface User {
    username?: string | null;
    role?: string;
  }
}