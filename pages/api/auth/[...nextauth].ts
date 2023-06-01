import clientPromise from '@/lib/mongodb';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { getServerSession } from 'next-auth';

import GoogleProvider from 'next-auth/providers/google';

const adminEmails = ['wilfredcloudspace@gmail.com'];
export const authOptions = {
  providers: [
    // OAuth authentication providers...

    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
    // Passwordless / email sign in
  ],
  adapter: MongoDBAdapter(clientPromise),

  callbacks: {
    session: ({ session, token, user }) => {
      if (adminEmails.includes(session?.user?.email as string)) {
        return session;
      } else {
        return false;
      }
    },
  },
};

export const isAdminRequest = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getServerSession(req, res, authOptions);
  if (!adminEmails.includes(session?.user?.email as string)) {
    throw 'Not authorized';
  }
};

export default NextAuth(authOptions);
