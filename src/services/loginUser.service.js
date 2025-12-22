import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUserService = {
  async loginUser(email, password) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }
    //Bcrytp compare fx that returns a boolean, and compares the password entered with the one in the db. It creates the hashing again
    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return { user, token };
  },
};
