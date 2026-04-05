import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "douglas@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // This is where you'll eventually check your database.
        // For now, let's hardcode a "Seller" user for testing.
        if (credentials?.email === "admin@haven.com" && credentials?.password === "password123") {
          return { id: "1", name: "Douglas", email: "admin@haven.com", role: "seller" };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login', // This matches the link in your Navbar
  },
});

export { handler as GET, handler as POST };