import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";


export const registerUserService = {
  async registerUser(email, password, fullName) {

    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        throw new Error("User already exists.")
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName
      }
    });
    
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return { user, token };
  }
};