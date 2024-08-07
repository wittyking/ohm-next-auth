import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import bcrypt from 'bcryptjs'

const authOption= {
    providers: [
        CredentialsProvider({
          name: "credentials",
          credentials: { },
          async authorize(credentials, req) {

            const { email, password } = credentials
            
            try {
                
                await connectMongoDB()
                const user = await User.findOne({ email })

                if(!user) {
                    return null;
                }

                const passwordMatch = await bcrypt.compare(password, user.password)

                if (!passwordMatch) {
                    return null
                }

                return user

            } catch (error) {
                console.log("Error: ",error)
            }
            // const user = {id: '1'}
            // return user
          }
        })
      ],
      session: {
        strategy: "jwt",
      },
      secret: process.env.NEXTAUTH_SECRET,
      pages: {
        signIn: '/login'
      }
}

const handler = NextAuth(authOption)
export { handler as GET, handler as POST}